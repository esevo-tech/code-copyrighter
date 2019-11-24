const glob = require("glob");
const fs = require("fs");
const crc = require("crc");
const path = require("path");

const getFileHeader = require("./reader");
const reporter = require("./reporter");
const interpreter = require("./interpreter");
const knownHeaders = require("./known-headers");

const cleanUnusedHeaders = true;

function scan(basePath, globPath, format, projectDir) {
  outputData = {
    headers: knownHeaders.build(projectDir),
    noHeader: []
  };

  function processSingleFile(basePath, filePath) {
    const fullPath = path.join(basePath, filePath);
    const fileContent = fs.readFileSync(fullPath).toString("utf8");
    const header = getFileHeader(fileContent, format);
    const interpretedHeader = interpreter(header);
    
    if (header != null) {
      const headerHash = crc.crc24(interpretedHeader.content);
      let headerEntry = outputData.headers[headerHash];

      if (headerEntry === undefined) {
        headerEntry = {
          name: headerHash,
          content: interpretedHeader.content,
          files: []
        };
        outputData.headers[headerHash] = headerEntry;
      }

      entry = headerEntry.files;
    } else {
      entry = outputData.noHeader;
    }

    entry.push({
      path: filePath,
      variables: interpretedHeader.variables
    });
  }

  globPath = path.join(basePath, globPath);
  glob(globPath, (err, files) => {
    for (file of files) {
      const fullPath = path.resolve(file);
      const relPath = path.relative(basePath, fullPath);
      processSingleFile(basePath, relPath);
    }

    writeHeadersToFilesystem(outputData.headers, path.join(projectDir, "headers"));

    if (cleanUnusedHeaders) {
      knownHeaders.clean(outputData.headers, projectDir);
    }

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