const crc = require("crc");
const glob = require("glob");
const path = require("path");
const fs = require("fs");

function build(projectDir) {
  const files = glob.sync(path.join(projectDir, "copyrighter", "headers", "*.txt"));
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

function clean(headers, projectDir) {
  for (headerKey in headers) {
    const header = headers[headerKey];

    if (header.files.length !== 0) {
      continue;
    }

    const file = header.name;
    const filePath = path.join(projectDir, "copyrighter", "headers", file + ".txt");

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
}

module.exports = {
  build,
  clean
};