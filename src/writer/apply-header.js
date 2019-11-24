const fs = require("fs");

const reader = require("../reader");
const buildHeader = require("./build-header");

function applyHeader(file, headerContent, format) {
  let fileContent = fs.readFileSync(file).toString("utf8");
  const actualHeader = reader(fileContent, format);
  const newHeader = buildHeader(headerContent, format);

  if (actualHeader == null) {
    fileContent = newHeader + fileContent;
  } else {
    fileContent = removeExistingHeader(fileContent, format);
    console.log(fileContent);
  }

  fs.writeFileSync(file, fileContent);
}

function removeExistingHeader(fileContent, format) {
  return fileContent
    .replace(format.headerRegex, "")
    .replace(/^[\s\n]*/, "");
}

const format = require("../formats")()["c-like-ignore-javadoc"];
applyHeader("./writer/test.java", `Hello\nworld\nworld`, format);