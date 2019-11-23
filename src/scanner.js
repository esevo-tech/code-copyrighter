const glob = require("glob");
const fs = require("fs");

const getFileHeader = require("./reader");
const format = require("./formats/c-like.js");

function processSingleFile(path) {
  const fileContent = fs.readFileSync(path).toString("utf8");
  console.log(path);
  const header = getFileHeader(fileContent, format);
  console.log(header);
}

function scan(path) {
  console.log("Scan: " + path);
  glob(path, (err, files) => {
    for (file of files) {
      processSingleFile(file);
    }
  });
}

module.exports = scan;