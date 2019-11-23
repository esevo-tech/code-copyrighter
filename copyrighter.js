const fs = require("fs");
const input = fs.readFileSync("input.java").toString("utf8");
const getFileHeader = require("./reader");
const format = require("./formats/c-like.js");

console.log(getFileHeader(input, format));