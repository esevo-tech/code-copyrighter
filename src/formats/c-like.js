const headerMatchAllComments = /^\/\*\s*(.*?)\s*\*\//sg;
const headerMatchIgnoreJavadoc = /^\/\*{1}\s+(.*?)\s*\*\//sg;

module.exports = {
  reader: {
    headerRegex: headerMatchIgnoreJavadoc,
    headerContentRegex: /^[ \t]*\*{0,1}[ \t]*(.*)$/gm
  }
};