const formatsGlob = "./config/formats/**.json";

const fs = require("fs");
const glob = require("glob");

glob(formatsGlob, (err, files) => {
  for (const formatFile of files) {
    const format = JSON.parse(fs.readFileSync(formatFile).toString("utf8"));

    console.log(format);
  }
});