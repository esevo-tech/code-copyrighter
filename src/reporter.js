const templateFile = "./template.mustache";

const fs = require("fs");
const path = require("path");
const mustache = require("mustache");
const template = fs.readFileSync(templateFile).toString("utf8");
mustache.parse(template);

function map2array(map) {
  const result = [];

  for (const key in map) {
    const value = map[key];
    result.push({
      key,
      value
    });
  }

  return result;
}

function generateReport(data) {
  const headers = map2array(data.headers);
  const view = {
    headers,
    headersCount: headers.length,
    noHeader: data.noHeader,
    noHeaderCount: data.noHeader.length
  };

  let filesCount = 0;
  for (const headerWrapper of view.headers) {
    const header = headerWrapper.value;
    processFiles(header.files);

    header.filesCount = header.files.length;
    filesCount += header.filesCount;
  }
  processFiles(view.noHeader);
  view.filesCount = filesCount;
  
  return mustache.render(template, view);
}

function processFiles(files) {
  for (const file of files) {
    const filePath = path.parse(file.path);
    file.dir = filePath.dir + path.sep;
    file.name = filePath.name + filePath.ext;

    if (file.variables !== undefined) {
      file.variables = map2array(file.variables);
    }
  }
}

module.exports = generateReport;