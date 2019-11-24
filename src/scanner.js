const glob = require("glob");
const fs = require("fs");
const crc = require("crc");
const path = require("path");

const getFileHeader = require("./reader");
const reporter = require("./reporter");
const knownHeaders = require("./known-headers");

function scan(globPath, format, projectDir) {
  outputData = {
    headers: knownHeaders(projectDir),
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
          name: headerHash,
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

  glob(globPath, (err, files) => {
    for (file of files) {
      processSingleFile(file);
    }

    writeHeadersToFilesystem(outputData.headers, path.join(projectDir, "headers"));

    const output = JSON.stringify(outputData, null, 4);
    fs.writeFileSync(path.join(projectDir, "output.json"), output);

    const outputHtml = reporter(outputData);
    fs.writeFileSync(path.join(projectDir, "output.html"), outputHtml);
  });
}

function writeHeadersToFilesystem(headers, outputDir) {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  } else {
    const stats = fs.lstatSync(outputDir);
    if (!stats.isDirectory()) {
      console.warn("Unable to create headers directory.");  
    }
  }

  for (const headerKey in headers) {
    const header = headers[headerKey];
    fs.writeFileSync(path.join(outputDir, header.name + ".txt"), header.content);
  }
}

module.exports = scan;