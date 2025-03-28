import fs from "node:fs";
import path from "node:path";

const bangJsPath = path.resolve(process.cwd(), "bang.js");
const bangsTsPath = path.resolve(process.cwd(), "src", "bangs.ts");

const bangsJson = JSON.parse(fs.readFileSync(bangJsPath, "utf8"));
const entries = bangsJson
	.map((bang) => `["${bang.t}",${JSON.stringify(bang.u)}]`)
	.join(",");

const content = `export const BANGS = new Map<string, string>([${entries}]);\n`;
fs.writeFileSync(bangsTsPath, content, "utf8");
console.log(`Successfully generated bangs file at ${bangsTsPath}`);
