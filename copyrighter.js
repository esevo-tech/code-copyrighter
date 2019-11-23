const fs = require("fs");
const input = fs.readFileSync("input.java").toString("utf8");

const headerRegex = /^\/\*(.*?)\*\//s;
const headerContentRegex = /^\s*\*{0,1}[ \t]*(.*)$/gm;

const headerContent = headerRegex.exec(input)[1];
let headerContentMatch;

while ((headerContentMatch = headerContentRegex.exec(headerContent)) != null) {
  console.log(headerContentMatch[1]);
}