const headerRegex = /^\/\*\s*(.*?)\s*\*\//sg;
const headerContentRegex = /^[ \t]*\*{0,1}[ \t]*(.*)$/gm;

function getFileHeader(input) {
  const headerContent = headerRegex.exec(input)[1];
  let headerContentMatch;

  let headerContentLines = [];
  while ((headerContentMatch = headerContentRegex.exec(headerContent)) != null) {
    headerContentLines.push(headerContentMatch[1]);
  }

  return headerContentLines.join("\n");
}

module.exports = getFileHeader;