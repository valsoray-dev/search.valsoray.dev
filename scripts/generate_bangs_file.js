import fs from "node:fs";
import path from "node:path";

const bangJsPath = path.resolve(process.cwd(), "bang.js");
const bangsJson = JSON.parse(fs.readFileSync(bangJsPath, "utf8"));

const bangsTsPath = path.resolve(process.cwd(), "src", "bangs.ts");
const content = [
	"export const BANGS = new Map<string, string>([",
	bangsJson
		.map((bang) => `["${bang.t}", ${JSON.stringify(bang.u)}]`)
		.join(","),
	"]);\n",
].join("");

fs.writeFileSync(bangsTsPath, content, "utf8");
console.log(`Successfully generated bangs file at ${bangsTsPath}`);
