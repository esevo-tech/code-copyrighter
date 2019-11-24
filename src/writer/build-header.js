const utils = require("../utils");

function buildHeader(content, format) {
  const headerContentTransform = format.writer.headerContentTransform;
  applyTransform(content, headerContentTransform);
}

function applyTransform(text, transform) {
  const output = text.replace(transform.search, transform.replace);
  console.log(output);
}

const format = require("../formats")()["c-like-ignore-javadoc"];
buildHeader("Hello world", format);