import { getdirectoryname } from "./getdirectoryname.js";
import { helptxt } from "./help.js";
import { parseargs } from "./parseargs.js";
const argobj = parseargs(process.argv.slice(2));
console.log(argobj);
const rpcurl = argobj["rpcurl"] ?? "http://localhost:6800/jsonrpc";
import { checkurl } from "./index.js";
try {
    checkurl(rpcurl);
} catch (e) {
    console.error(helptxt);
    throw e;
}
import { urltodom } from "./index.js";
import { fetch } from "./fetch.js";
async function downloadallpagesfromdocument(document) {
    await downloadonepageallimages(document);
    await Promise.all(
        selectpagehtmlurls(document).map(async (url) => {
            const dom = await resolvedocumentfromurl(url);
            return await downloadonepageallimages(dom);
        })
    );
    console.log(
        "all album\xA0images\xA0download\xA0done " + document.documentURI
    );
}
async function callaria2cdown(fileurls, directoryname) {
    const data = fileurls.map((url) => {
        const origin = new URL(url).origin + "/";
        return {
            jsonrpc: "2.0",
            method: "aria2.addUri",
            id: 1,
            params: [
                [url],
                {
                    header: [
                        "Referer: " + origin,
                        "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36",
                    ].join("\n"),
                    dir: directoryname,
                    split: "16",
                    "max-connection-per-server": "16",
                    "seed-ratio": "1.0",
                },
            ],
        };
    });
    const response = await fetch(rpcurl, {
        headers: {
            connection: "keep-alive",
            accept: "application/json,text/javascript",
            "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
            "content-type": "application/json",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "cross-site",
        },
        referrerPolicy: "no-referrer-when-downgrade",
        body: JSON.stringify(data),
        method: "POST",
    });
    if (!response.ok) {
        throw new Error(response.status + response.statusText);
    }
    const contenttype = response.headers.get("content-type");
    if ("application/json-rpc" !== contenttype) {
        throw new Error("content-type:" + contenttype);
    }
}
function selectimagesfromdocument(document) {
    const fileurls = Array.from(
        new Set(
            Array.from(document.querySelectorAll("img"))
                .map((e) => {
                    return new URL(e.getAttribute("src"), document.documentURI)
                        .href;
                })
                .filter((a) => !!a)
                .filter((a) => a.startsWith("http")).filter(a=>a.endsWith(".jpg"))
        )
    );
    return fileurls;
}
async function downloadonepageallimages(document) {
    const directoryname = getdirectoryname(document);
    const images = selectimagesfromdocument(document);
    const url = document.documentURI;
    console.log(url, directoryname, images);
    await callaria2cdown(images, directoryname);
    console.log(
        "one page\xA0images\xA0download\xA0done " + document.documentURI
    );
}
function selectpagehtmlurls(document) {
    return Array.from(
        new Set(
            Array.from(document.querySelectorAll(".page > a")).map((e) => {
                return new URL(e.getAttribute("href"), document.documentURI)
                    .href;
            })
        )
    );
}
async function resolvedocumentfromurl(url) {
    if (urltodom.get(url)) {
        return urltodom.get(url);
    }
    const text = await gethtmltext(url);
    const document = parsedocument(text, url);
    urltodom.set(url, document);
    return document;
}
async function gethtmltext(url) {
    const response = await fetch(url, {
        headers: { connection: "keep-alive" },
    });
    if (!response.ok) {
        throw new Error(response.status + response.statusText);
    }
    const contenttype = response.headers.get("content-type");
    if (!contenttype.startsWith("text/html")) {
        throw new Error("content-type:" + contenttype);
    }
    const buffer = await response.arrayBuffer();
    const text = new TextDecoder("gb2312").decode(buffer);
    return text;
}
import jsdom from "jsdom";
const { JSDOM } = jsdom;
function parsedocument(text, url) {
    const {
        window: { document },
    } = new JSDOM(text, { url: url });
    return document;
}
export { downloadallpagesfromdocument };
export { resolvedocumentfromurl, selectimagesfromdocument };
