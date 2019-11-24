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
    format.headerRegex = new RegExp(format.headerRegex).compile();
    format.headerContentRegex = new RegExp(format.headerContentRegex).compile();

    formats[formatName] = format;
  }

  return formats;
}

console.log(buildFormats());

module.exports = buildFormats();