const crc = require("crc");
const glob = require("glob");
const path = require("path");
const fs = require("fs");

function build(projectDir) {
  const files = glob.sync(path.join(projectDir, "headers", "*.txt"));
  const headers = {};

  for (file of files) {
    const name = path.parse(file).name;
    const content = fs.readFileSync(file).toString("utf8");
    const contentHash = crc.crc24(content);
    
    headers[contentHash] = {
      content,
      name,
      files: []
    };
  }

  return headers;
}

module.exports = build;