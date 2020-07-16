import nodefetch from "node-fetch";
import xmldom from "xmldom";
import {
    selectimagesfromdocument,
    downloadallpagesfromdocument,
    resolvedocumentfromurl,
} from "./gistfile1.js";
import https from "https";
import http from "http";
import process from "process";
http.globalAgent.keepAlive = true;
https.globalAgent.keepAlive = true;
const fetch = nodefetch.default;
const { DOMParser } = xmldom;
export { DOMParser };
export { fetch };
process.on("unhandledRejection", (e) => {
    throw e;
});
const urls = ["https://www.xgmn.org/Xiuren/Xiuren14469.html"];
async function start(urls) {
    for (let url of urls) {
        const document = await resolvedocumentfromurl(url);
    }
}
start(urls);
