const fs = require("fs");
const input = fs.readFileSync("input.java").toString("utf8");
const getFileHeader = require("./reader");

console.log(getFileHeader(input));