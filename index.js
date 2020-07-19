import assert from "assert";
import nodefetch from "node-fetch";
import xmldom from "xmldom";
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
const fetch = nodefetch.default;
const { DOMParser } = xmldom;
export { DOMParser };
export { fetch };
import cssselect from "css-select";
export { cssselect };
process.on("unhandledRejection", (e) => {
    throw e;
});
const urls = Array.from(new Set(process.argv.slice(2)));
async function start(urls) {
    for (let url of urls) {
        checkurl(url);

        const document = await resolvedocumentfromurl(url);
        const images = selectimagesfromdocument(document);
        //console.log(images)
        const directoryname = getdirectoryname(document);

        console.log(url, directoryname, images);
    }
}
if (urls.length) {
    console.log(urls);
    start(urls);
} else {
    throw new Error("empty download url,arguments should not be empty");
}
function checkurl(url) {
    url = new URL(url).href;
    assert(
        url.startsWith("http:") || url.startsWith("https:"),
        "url protocol should be http or https"
    );
    return url;
}
