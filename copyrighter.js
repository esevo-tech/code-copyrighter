const fs = require("fs");
const input = fs.readFileSync("input.java").toString("utf8");

const headerRegex = /^\/\*(.*?)\*\//s;
const headerContentRegex = /^\s*\*{0,1}[ \t]*(.*)$/gm;

const headerContent = headerRegex.exec(input)[1];
let headerContentMatch;

let headerContentLines = [];
while ((headerContentMatch = headerContentRegex.exec(headerContent)) != null) {
  headerContentLines.push(headerContentMatch[1]);
}

const headerContentText = headerContentLines.join("\n");
console.log(headerContentText);