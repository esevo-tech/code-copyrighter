const formatsGlob = "./config/formats/**.json";

const fs = require("fs");
const glob = require("glob");
const path = require("path");

const utils = require("./utils");

function buildFormats() {
  const files = glob.sync(formatsGlob);
  const formats = {};
  for (const formatFile of files) {
    const format = JSON.parse(fs.readFileSync(formatFile).toString("utf8"));
    const formatName = path.parse(formatFile).name;
    format.headerRegex = utils.parseRegex(format.headerRegex);
    format.headerContentRegex = utils.parseRegex(format.headerContentRegex);

    if (format.writer !== undefined) {
      parseTransform(format.writer.headerContentTransform);
      parseTransform(format.writer.headerTransform);
    }

    formats[formatName] = format;
  }

  return formats;
}

function parseTransform(transform) {
  transform.search = utils.parseRegex(transform.search);
}

module.exports = buildFormats;