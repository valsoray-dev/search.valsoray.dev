import fs from "node:fs";
import https from "node:https";
import path from "node:path";

const BANGS_URL = "https://duckduckgo.com/bang.js";

const filePath = path.resolve(process.cwd(), "bang.js");
const file = fs.createWriteStream(filePath);

https.get(BANGS_URL, (response) => {
  response.pipe(file);

  file.on("finish", () => {
    console.log(`File downloaded successfully to ${filePath}`);
  });
});
