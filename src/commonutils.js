import jsdom from "jsdom";
import { checkurl } from "./checkurl.js";
import { helptxt } from "./help.js";
import { parseargs } from "./parseargs.js";
import { resolvedocumentfromurl } from "./resolvedocumentfromurl.js";
import { selectimagesfromdocument } from "./selectimagesfromdocument.js";
import { downloadallpagesfromdocument } from "./start.js";
import process from "process";
const argobj = parseargs(process.argv.slice(2));
console.log(argobj);
export const rpcurl = argobj["rpcurl"] ?? "http://localhost:6800/jsonrpc";
try {
    checkurl(rpcurl);
} catch (e) {
    console.error(helptxt);
    throw e;
}
const { JSDOM } = jsdom;
export { JSDOM };
export { downloadallpagesfromdocument };
export { resolvedocumentfromurl, selectimagesfromdocument };
