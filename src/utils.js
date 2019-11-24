function parseRegex(regexString) {
  const match = /^\/(.*)\/([\w]*)/.exec(regexString);
  return new RegExp(match[1], match[2]);
}

module.exports = {
  parseRegex
};