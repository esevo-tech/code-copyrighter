const formatsGlob = "./config/formats/**.json";

const fs = require("fs");
const glob = require("glob");
const path = require("path");

function buildFormats() {
  const files = glob.sync(formatsGlob);
  const formats = {};
  for (const formatFile of files) {
    const format = JSON.parse(fs.readFileSync(formatFile).toString("utf8"));
    const formatName = path.parse(formatFile).name;
    format.headerRegex = parseRegex(format.headerRegex);
    format.headerContentRegex = parseRegex(format.headerContentRegex);

    if (format.writer !== undefined) {
      parseTransform(format.writer.headerContentTransform);
    }

    formats[formatName] = format;
  }

  return formats;
}

function parseTransform(transform) {
  transform.search = parseRegex(transform.search);
}

function parseRegex(regexString) {
  const match = /^\/(.*)\/([\w]*)/.exec(regexString);
  return new RegExp(match[1], match[2]);
}

module.exports = buildFormats;