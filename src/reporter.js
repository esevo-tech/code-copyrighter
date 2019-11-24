const templateFile = "./template.mustache";

const fs = require("fs");
const mustache = require("mustache");
const template = fs.readFileSync(templateFile).toString("utf8");
mustache.parse(template);

function map2array(map) {
  const result = [];

  for (const key in map) {
    const value = map[key];
    value._key = key;
    result.push(value);
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
  for (const header of view.headers) {
    header.filesCount = header.files.length;
    filesCount += header.filesCount;
  }
  view.filesCount = filesCount;
  
  return mustache.render(template, view);
}

module.exports = generateReport;