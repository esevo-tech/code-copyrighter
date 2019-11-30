const yearRegex = /[\d]+[\d ,\-–—]*[\d]+/gm;
const yearReplacement = "{year}";

function parse(content) {
  let variables = {};
  
  const yearMatch = yearRegex.exec(content);
  if (yearMatch !== null) {
    content = content.replace(yearRegex, yearReplacement);
    variables.year = yearMatch[0];
  }

  return {
    content,
    variables
  };
}

module.exports = parse;