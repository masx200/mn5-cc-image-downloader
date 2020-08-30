import jsdom from "jsdom";
import { checkurl } from "./checkurl.js";
import { helptxt } from "./help.js";
import { resolvedocumentfromurl } from "./resolvedocumentfromurl.js";
import { selectimagesfromdocument } from "./selectimagesfromdocument.js";
import { downloadallpagesfromdocument } from "./start.js";
import { rpcurl } from "./rpcurl.js";
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
