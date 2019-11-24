const dateRangeRegex = /(\d{4})([ *-–—]*)(\d{4})/;
const dateRangeReplacement = "{yearStart}$2{yearEnd}";

function parse(content) {
  let variables = {};

  // Date ranges (e.g. 2012-2018)
  const rangeMatch = dateRangeRegex.exec(content);
  if (rangeMatch !== null) {
    content = content.replace(dateRangeRegex, dateRangeReplacement);
    variables = {
      yearStart: rangeMatch[1],
      yearEnd: rangeMatch[3]
    }
  }

  return {
    content,
    variables
  };
}

const text = `
Copyright 2018-2019 XYZ. All rights reserved.
This Software has been designed by YYZ.
`;
console.log(parse(text));