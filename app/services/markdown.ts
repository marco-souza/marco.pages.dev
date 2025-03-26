type ClassMap = Record<string, string>;

const classMap: ClassMap = {
  "heading[depth=1]": "text-4xl font-bold py-4 pt-8",
  "heading[depth=2]": "text-2xl font-bold py-2 pt-6",
  "heading[depth=3]": "text-xl font-bold py-2 pt-4",
  blockquote: "border-l-4 border-gray-300 pl-4 py-2",
  paragraph: "py-1",
  link: "text-pink-400",
  list: "list-disc pl-4 py-1",
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function parseMarkdown(content: string): [Record<string, any>, string] {
  if (!content.startsWith("---")) {
    return [{}, markdownToHTMLWithoutDeps(content)];
  }

  const [metadata, md] = content.split("---").slice(1);
  return [parseYaml(metadata), markdownToHTMLWithoutDeps(md)];
}

function parseYaml(metadata: string) {
  const lines = metadata.split("\n");
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const result: Record<string, any> = {};

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  function parseLine(line: string, obj: Record<string, any>) {
    const [key, value] = line.split(":").map((part) => part.trim());
    if (key && value !== undefined) {
      obj[key] = value;
    } else if (key) {
      obj[key] = {};
    }
  }

  let currentObj = result;
  let currentIndentLevel = 0;

  for (const line of lines) {
    const indentLevel = line.search(/\S|$/);
    if (indentLevel > currentIndentLevel) {
      currentObj = currentObj[Object.keys(currentObj).pop() as string];
    } else if (indentLevel < currentIndentLevel) {
      currentObj = result;
    }
    currentIndentLevel = indentLevel;
    parseLine(line, currentObj);
  }

  return result;
}

function markdownToHTMLWithoutDeps(md: string, opts: ClassMap = {}) {
  const theme = { ...classMap, ...opts };

  function applyClass(nodeType: string, depth?: number) {
    let className = theme[nodeType];
    if (!className && depth !== undefined) {
      className = theme[`${nodeType}[depth=${depth}]`];
    }
    return className ? ` class="${className}"` : "";
  }

  function convertMarkdownToHTML(raw: string): string {
    // handle headers
    let content = raw
      .replace(
        /^# (.*$)/gim,
        (_, p1) => `<h1${applyClass("heading", 1)}>${p1}</h1>`,
      )
      .replace(
        /^## (.*$)/gim,
        (_, p1) => `<h2${applyClass("heading", 2)}>${p1}</h2>`,
      )
      .replace(
        /^### (.*$)/gim,
        (_, p1) => `<h3${applyClass("heading", 3)}>${p1}</h3>`,
      );

    // handle lists
    content = content
      .replace(
        /^[*-] (.*$)/gim,
        (_, p1) => `<li${applyClass("list")}>${p1}</li>`,
      )
      .replace(
        /^ {2}[*-] (.*$)/gim,
        (_, p1) => `<li${applyClass("list")}>${p1}</li>`,
      )
      .replace(
        /^ {4}[*-] (.*$)/gim,
        (_, p1) => `<li${applyClass("list")}>${p1}</li>`,
      );

    // handle bold & italic
    content = content
      .replace(/\*\*(.*?)\*\*/g, (_, p1) => `<strong>${p1}</strong>`)
      .replace(/__(.*?)__/g, (_, p1) => `<strong>${p1}</strong>`)
      .replace(/\*(.*?)\*/g, (_, p1) => `<em>${p1}</em>`)
      .replace(/_(.*?)_/g, (_, p1) => `<em>${p1}</em>`);

    // handle images
    content = content.replace(
      /!\[(.*?)\]\((.*?)\)/g,
      (_, p1, p2) => `<img src="${p2}" alt="${p1}" />`,
    );

    // handle links
    content = content.replace(
      /\[(.*?)\]\((.*?)\)/g,
      (_, p1, p2) => `<a${applyClass("link")} href="${p2}">${p1}</a>`,
    );

    // handle blockquotes
    content = content.replace(
      /^(> (.*$)\n?)+/gim,
      (_, p1) => `<blockquote${applyClass("blockquote")}>${p1}</blockquote>`,
    );

    return content;
  }

  return convertMarkdownToHTML(md);
}
