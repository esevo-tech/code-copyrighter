const formatsGlob = "./config/formats/**.json";

const fs = require("fs");
const glob = require("glob");

function buildFormats() {
  const files = glob.sync(formatsGlob);
  const formats = [];
  for (const formatFile of files) {
    const format = JSON.parse(fs.readFileSync(formatFile).toString("utf8"));
    format.headerRegex = new RegExp(format.headerRegex).compile();
    format.headerContentRegex = new RegExp(format.headerContentRegex).compile();

    formats.push(format);
  }

  return formats;
}

console.log(buildFormats());

module.exports = buildFormats();