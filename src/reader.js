function getFileHeaderContent(input, format) {
  const headerRegex = format.reader.headerRegex;
  headerRegex.lastIndex = 0;
  
  const match = headerRegex.exec(input);

  if (match == null)
    return null;
  return match[1];
}

function getFileHeader(input, format) {
  const headerContent = getFileHeaderContent(input, format);
  
  if (headerContent === null)
    return null;
  
  const headerContentRegex = format.reader.headerContentRegex;
  headerContentRegex.lastIndex = 0;

  let headerContentLines = [];
  while ((headerContentMatch = headerContentRegex.exec(headerContent)) != null) {
    headerContentLines.push(headerContentMatch[1]);
  }

  return headerContentLines.join("\n");
}

module.exports = getFileHeader;