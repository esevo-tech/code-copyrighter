const glob = require("glob");
const fs = require("fs");

const getFileHeader = require("./reader");
const format = require("./formats/c-like.js");

function scan(path) {
  headers = [];

  function processSingleFile(path) {
    const fileContent = fs.readFileSync(path).toString("utf8");
    const header = getFileHeader(fileContent, format);
    headers.push(header);
  }

  glob(path, (err, files) => {
    for (file of files) {
      processSingleFile(file);
      console.log(headers);
    }
  });
}

module.exports = scan;