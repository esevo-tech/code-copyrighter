const path = require("path");
const fs = require("fs");

const scanner = require("./scanner");

const projectDir = "./test-project";
const projectConfigPath = path.join(projectDir, "project.json");
const projectConfig = JSON.parse(fs.readFileSync(projectConfigPath).toString("utf8"));
const formats = require("./formats")();
const basePath = projectConfig.baseDir;

for (glob in projectConfig.paths) {
  const formatName = projectConfig.paths[glob];
  console.log(`Scanning ${glob} with ${formatName}...`);
  scanner(basePath, glob, formats[formatName], projectDir);
}

console.log("Scan complete.");