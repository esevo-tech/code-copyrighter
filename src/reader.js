function getFileHeaderContent(input, format) {
  const headerRegex = format.reader.headerRegex;
  return headerRegex.exec(input)[1];
}

function getFileHeader(input, format) {
  const headerContentRegex = format.reader.headerContentRegex;
  const headerContent = getFileHeaderContent(input, format);

  let headerContentLines = [];
  while ((headerContentMatch = headerContentRegex.exec(headerContent)) != null) {
    headerContentLines.push(headerContentMatch[1]);
  }

  return headerContentLines.join("\n");
}

module.exports = getFileHeader;