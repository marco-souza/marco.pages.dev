type ClassMap = Record<string, string>;

export const classMap: ClassMap = {
  "heading[depth=1]": "text-4xl font-bold py-4 pt-8",
  "heading[depth=2]": "text-2xl font-bold py-2 pt-8",
  "heading[depth=3]": "text-xl font-bold py-2 pt-6",
  blockquote: "border-l-4 border-gray-300 pl-4 py-2 italic",
  paragraph: "py-2",
  link: "text-pink-400",
  list: "list-disc pl-4 py-1",
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
type ParsedMarkdown = { parsed: Record<string, any>; html: string };

export function parseMarkdown(content: string): ParsedMarkdown {
  if (!content.startsWith("---")) {
    return { parsed: {}, html: markdownToHTML(content) };
  }

  const [metadata, md] = content.split("---").slice(1);
  return { parsed: parseYaml(metadata), html: markdownToHTML(md) };
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
export function markdownToHTML(md: string) {
  let content = "";

  const blocks = md.split("\n\n");
  for (const block of blocks) {
    let line = block;

    // handle line blocks
    switch (block.at(0)) {
      case "#":
        line = parseHeading(block);
        break;
      case ">":
        line = parseBlockquote(block);
        break;
      case "*":
      case "-":
        line = parseList(block);
        break;
      default: {
        const isHtmlWithSpacesRegex = /<.*?>\s*$/;
        if (isHtmlWithSpacesRegex.test(block)) {
          line = block;
          break;
        }

        line = `<p${applyClass("paragraph")}>${block}</p>`;
      }
    }

    // parse images
    line = line.replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" />');

    // parser links
    line = line.replace(
      /\[(.*?)\]\((.*?)\)/g,
      `<a${applyClass("link")} target="_blank" href="$2" class="link">$1</a>`,
    );

    // parse bold, italic, and strikethrough
    line = line
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/__(.*?)__/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/_(.*?)_/g, "<em>$1</em>")
      .replace(/~~(.*?)~~/g, "<del>$1</del>");

    content += line;
  }

  return content;
}

const applyClass = (name: string, depth?: number) => {
  const classes = classMap[name];
  if (classes) {
    return ` class="${classes}"`;
  }

  const heading = classMap[`heading[depth=${depth}]`];
  if (heading) {
    return ` class="${heading}"`;
  }

  return "";
};

export const parseHeading = (line: string) => {
  const [hashes = ""] = line.split(" ");
  const depth = hashes.length;

  return `<h${depth}${applyClass("heading", depth)}>${line.replace(/#/g, "").trim()}</h${depth}>`;
};

export const parseBlockquote = (line: string) => {
  const lines = line.split("\n");

  const content = lines
    .map((l) => l.replace("> ", "").replace("\n", "").trim())
    .join(" ");

  return `<blockquote${applyClass("blockquote")}>${content}</blockquote>`;
};

export const parseList = (line: string) => {
  const lines = line.split("\n");
  const stack: string[] = [];
  let currentIndentLevel = 0;

  for (const l of lines) {
    const indentLevel = l.search(/\S|$/);
    const content = l.replace(/- /, "").trim();

    if (indentLevel > currentIndentLevel) {
      stack.push(`<ul${applyClass("list")}>`);
    } else if (indentLevel < currentIndentLevel) {
      stack.push("</ul>");
    }

    stack.push(`<li>${content}</li>`);
    currentIndentLevel = indentLevel;
  }

  while (currentIndentLevel > 0) {
    stack.push("</ul>");
    currentIndentLevel--;
  }

  return `<ul${applyClass("list")}>${stack.join("")}</ul>`;
};
