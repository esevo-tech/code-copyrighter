const scanner = require("./scanner");

const projectConfig = require("./project.json");
const formats = require("./formats")();

for (glob in projectConfig) {
  const formatName = projectConfig[glob];
  console.log(`Scanning ${glob} with ${formatName}...`);
  scanner(glob, formats[formatName]);
}

console.log("Scan complete.");