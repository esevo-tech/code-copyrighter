#!/usr/bin/env node
const path = require("path");
const fs = require("fs");
const process = require("process");

const scanner = require("./scanner");
const formats = require("./formats")();

function start(argv) {
  if (argv.length < 3) {
    console.error(`Usage: ${argv[0]} ${argv[1]} project-dir`);
    return;
  }

  const projectDir = argv[2];
  scan(projectDir);
}

function scan(projectDir) {
  const projectConfigPath = path.join(projectDir, "copyrighter.json");
  const projectConfig = JSON.parse(fs.readFileSync(projectConfigPath).toString("utf8"));
  const basePath = path.resolve(projectConfig.baseDir, projectDir);

  for (glob in projectConfig.paths) {
    const formatName = projectConfig.paths[glob];
    console.log(`Scanning ${glob} with ${formatName}...`);

    const format = formats[formatName];

    if (format != null) {
      scanner(basePath, glob, formats[formatName], projectDir);
    } else {
      console.error(`Failed to find format with name ${formatName}.`);
      return;
    }
  }

  console.log("Scan complete.");
}

start(process.argv);