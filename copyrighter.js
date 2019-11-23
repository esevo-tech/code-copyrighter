const fs = require("fs");

const regex = /^\/\*(.*?)\*\//s;
const input = fs.readFileSync("input.java").toString("utf8");

console.log(regex.exec(input)[1]);