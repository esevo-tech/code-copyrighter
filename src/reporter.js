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
  const view = {
    headers: map2array(data.headers)
  }
  return mustache.render(template, view);
}

module.exports = generateReport;