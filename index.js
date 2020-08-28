import assert from "assert";
import {
    getdirectoryname,
    selectimagesfromdocument,
    downloadallpagesfromdocument,
    resolvedocumentfromurl,
} from "./commonutils.js";
import https from "https";
import http from "http";
import process from "process";
http.globalAgent.keepAlive = true;
https.globalAgent.keepAlive = true;
const urltodom = new Map();
export { urltodom };
async function start(urls) {
    urls = Array.from(new Set(urls));
    for (let url of urls) {
        url = url.trim();
        checkurl(url);
        const document = await resolvedocumentfromurl(url);
        await downloadallpagesfromdocument(document);
        urltodom.clear();
        console.log("全部处理完成");
    }
}
function checkurl(url) {
    url = new URL(url).href;
    assert(
        url.startsWith("http:") || url.startsWith("https:"),
        "url protocol should be http or https"
    );
    return url;
}
export { start };
