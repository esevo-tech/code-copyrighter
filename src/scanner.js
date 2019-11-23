const glob = require("glob");
const fs = require("fs");
const crc = require("crc");

const getFileHeader = require("./reader");
const format = require("./formats/c-like.js");

function scan(path) {
  headers = {};

  function processSingleFile(path) {
    const fileContent = fs.readFileSync(path).toString("utf8");
    const header = getFileHeader(fileContent, format);
    
    if (header != null) {
      const headerHash = crc.crc24(header);
      let headerEntry = headers[headerHash];

      if (headerEntry === undefined) {
        headerEntry = {
          content: header,
          files: []
        };
        headers[headerHash] = headerEntry;
      }

      headerEntry.files.push(path);
    }
  }

  glob(path, (err, files) => {
    for (file of files) {
      processSingleFile(file);
    }

    const output = JSON.stringify(headers, null, 4);
    fs.writeFileSync("output.json", output);
  });
}

module.exports = scan;