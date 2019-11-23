module.exports = {
  reader: {
    headerRegex: /^\/\*\s*(.*?)\s*\*\//sg,
    headerContentRegex: /^[ \t]*\*{0,1}[ \t]*(.*)$/gm
  }
};