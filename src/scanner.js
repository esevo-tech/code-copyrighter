const glob = require("glob");
const fs = require("fs");
const crc = require("crc");

const getFileHeader = require("./reader");
const reporter = require("./reporter");

function scan(path, format) {
  outputData = {
    headers: {},
    noHeader: []
  };

  function processSingleFile(path) {
    const fileContent = fs.readFileSync(path).toString("utf8");
    const header = getFileHeader(fileContent, format);
    
    if (header != null) {
      const headerHash = crc.crc24(header);
      let headerEntry = outputData.headers[headerHash];

      if (headerEntry === undefined) {
        headerEntry = {
          content: header,
          files: []
        };
        outputData.headers[headerHash] = headerEntry;
      }

      entry = headerEntry.files;
    } else {
      entry = outputData.noHeader;
    }

    entry.push(path);
  }

  glob(path, (err, files) => {
    for (file of files) {
      processSingleFile(file);
    }

    const output = JSON.stringify(outputData, null, 4);
    fs.writeFileSync("output.json", output);

    const outputHtml = reporter(outputData);
    fs.writeFileSync("output.html", outputHtml);
  });
}

module.exports = scan;