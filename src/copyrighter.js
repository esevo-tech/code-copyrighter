const path = require("path");
const fs = require("fs");

const scanner = require("./scanner");

const projectDir = "./test-project";
const projectConfigPath = path.join(projectDir, "project.json");
const projectConfig = JSON.parse(fs.readFileSync(projectConfigPath).toString("utf8"));
const formats = require("./formats")();

for (glob in projectConfig) {
  const formatName = projectConfig[glob];
  console.log(`Scanning ${glob} with ${formatName}...`);
  scanner(glob, formats[formatName], projectDir);
}

console.log("Scan complete.");