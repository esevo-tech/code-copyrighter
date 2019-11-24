const dateRangeRegex = /(\d{4})[ *-–—]*(\d{4})/;

function parse(content) {
  // Date ranges (e.g. 2012-2018)
  const rangeMatch = dateRangeRegex.exec(content);
  if (rangeMatch !== null) {
    return {
      yearStart: rangeMatch[1],
      yearEnd: rangeMatch[2]
    }
  }
}

const text = `
Copyright 2018-2019 XYZ. All rights reserved.
This Software has been designed by YYZ.
`;
console.log(parse(text));