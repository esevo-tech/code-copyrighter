const fs = require("fs");

const reader = require("../reader");
const buildHeader = require("./build-header");

function applyHeader(file, headerContent, format) {
  let fileContent = fs.readFileSync(file).toString("utf8");
  const actualHeader = reader(fileContent, format);
  const newHeader = buildHeader(headerContent, format);

  if (actualHeader == null) {
    fileContent = newHeader + fileContent;
  }

  console.log(fileContent);
}

const format = require("../formats")()["c-like-ignore-javadoc"];
applyHeader("./writer/test.java", `Hello\nworld\nworld`, format);
