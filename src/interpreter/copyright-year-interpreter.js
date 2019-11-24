const dateRangeRegex = /(\d{4})([ *-–—]*)(\d{4})/;
const dateRangeReplacement = "{yearStart}$2{yearEnd}";

const singleYearRegex = /(\d{4})/;
const singleYearReplacement = "{year}";

function parse(content) {
  let variables = {};

  // Date ranges (e.g. 2012-2018)
  const rangeMatch = dateRangeRegex.exec(content);
  if (rangeMatch !== null) {
    content = content.replace(dateRangeRegex, dateRangeReplacement);
    variables.yearStart = rangeMatch[1];
    variables.yearEnd = rangeMatch[3];
  }
  
  // Single year
  const singleYearMatch = singleYearRegex.exec(content);
  if (singleYearMatch !== null) {
    content = content.replace(singleYearRegex, singleYearReplacement);
    variables.year = singleYearMatch[0];
  }

  return {
    content,
    variables
  };
}

module.exports = parse;