const fs = require("fs");
const buildHeader = require("./build-header");

function applyHeader(file, headerContent, format) {
  let fileContent = fs.readFileSync(file).toString("utf8");
  const newHeader = buildHeader(headerContent, format);

  fileContent = removeExistingHeader(fileContent, format);
  fileContent = newHeader + fileContent;

  fs.writeFileSync(file, fileContent);
}

function removeExistingHeader(fileContent, format) {
  let contentWithoutHeader = fileContent.replace(format.headerRegex, "");

  // Remove an extra blank line if the content was removed.
  if (contentWithoutHeader != fileContent) {
    contentWithoutHeader = contentWithoutHeader.replace(/^ *\n/g, "");
  }

  return contentWithoutHeader;
}

const format = require("../formats")()["c-like-ignore-javadoc"];
applyHeader("./writer/test.java", `Hello\nworld\nworld`, format);
