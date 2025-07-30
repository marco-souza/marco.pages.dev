import { expect, test } from "vitest";
import { classMap, parseBlockquote, parseHeading, parseList } from "./markdown";

test("parseHeading > h1", () => {
  const result = parseHeading("# Heading");
  const expected = `<h1 class="${classMap["heading[depth=1]"]}">Heading</h1>`;

  expect(result).toBe(expected);
});

test("parseHeading > h2", () => {
  const result = parseHeading("## Heading");
  const expected = `<h2 class="${classMap["heading[depth=2]"]}">Heading</h2>`;

  expect(result).toBe(expected);
});

test("parseHeading > h3", () => {
  const result = parseHeading("### Heading");
  const expected = `<h3 class="${classMap["heading[depth=3]"]}">Heading</h3>`;

  expect(result).toBe(expected);
});

test("parseBlockquote > single line", () => {
  const result = parseBlockquote("> This is a blockquote");
  const expected = `<blockquote class="${classMap.blockquote}">This is a blockquote</blockquote>`;

  expect(result).toBe(expected);
});

test("parseBlockquote > multiline", () => {
  const result = parseBlockquote(
    "> This is a blockquote\n> with multiple lines",
  );
  const expected = `<blockquote class="${classMap.blockquote}">This is a blockquote with multiple lines</blockquote>`;

  expect(result).toBe(expected);
});

test("parseList > unordered list", () => {
  const result = parseList("- Item 1\n- Item 2\n- Item 3");
  const expected = `<ul class="${classMap.list}"><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>`;

  expect(result).toBe(expected);
});

test("parseList > unordered list > nested", () => {
  const result = parseList("- Item 1\n  - Item 1.1\n- Item 3");
  const expected = `<ul class="list-disc pl-4 py-1"><li>Item 1</li><ul class="list-disc pl-4 py-1"><li>Item 1.1</li></ul><li>Item 3</li></ul>`;

  expect(result).toBe(expected);
});
