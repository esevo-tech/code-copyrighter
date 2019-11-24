const fs = require("fs");

const reader = require("../reader");
const buildHeader = require("./build-header");

function applyHeader(file, headerContent, format) {
  let fileContent = fs.readFileSync(file).toString("utf8");
  const actualHeader = reader(fileContent, format);
  const newHeader = buildHeader(headerContent, format);

  if (actualHeader !== null) {
    fileContent = removeExistingHeader(fileContent, format); 
  }

  fileContent = newHeader + fileContent;

  fs.writeFileSync(file, fileContent);
}

function removeExistingHeader(fileContent, format) {
  return fileContent
    .replace(format.headerRegex, "")
    .replace(/^ *\n/g, "");
}

const format = require("../formats")()["c-like-ignore-javadoc"];
applyHeader("./writer/test.java", `Hello\nworld\nworld`, format);
