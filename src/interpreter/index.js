const interpreters = [
  require("./copyright-year-interpreter")
];

function parse(content) {
  let variables = {};

  for (const interpreter of interpreters) {
    let outputData = interpreter(content);
    content = outputData.content;
    variables = { ...variables, ...outputData.variables };
  }

  return {
    content,
    variables
  };
}

console.log(parse("Copyright 1999"));