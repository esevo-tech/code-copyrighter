const utils = require("../utils");

function buildHeader(content, format) {
  const headerContentTransform = format.writer.headerContentTransform;
  const headerContent = applyTransform(content, headerContentTransform);

  const headerTransform = format.writer.headerTransform;
  const header = applyTransform(headerContent, headerTransform);

  console.log(header);
}

function applyTransform(text, transform) {
  const output = text.replace(transform.search, transform.replace);
  return output;
}

const format = require("../formats")()["c-like-ignore-javadoc"];
buildHeader("Hello world", format);