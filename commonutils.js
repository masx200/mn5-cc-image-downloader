import { fetch, DOMParser, cssselect } from "./index.js";
function getdirectoryname(document) {
    const directoryname =
        //   document.title +
        // "\xA0" +
        document.querySelectorAll(`.ina > p > b:nth-child(2)`)[0].textContent;
    return directoryname;
}
async function downloadallpagesfromdocument(document) {
    await downloadonepageallimages(document);
    await Promise.all(
        selectpagehtmlurls(document).map(async (url) => {
            const dom = await resolvedocumentfromurl(url);
            return await downloadonepageallimages(dom);
        })
    );
    console.log("all\xA0images\xA0download\xA0done " + document.documentURI);
}
async function callaria2cdown(fileurls, directoryname) {
    const data = fileurls.map((url) => ({
        jsonrpc: "2.0",
        method: "aria2.addUri",
        id: 1,
        params: [
            [url],
            {
                header: [
                    "Referer: https://www.xgmn.org/",
                    "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36",
                ].join("\n"),
                dir: directoryname,
                split: "16",
                "max-connection-per-server": "16",
                "seed-ratio": "1.0",
            },
        ],
    }));
    const response = await fetch("http://localhost:6800/jsonrpc", {
        headers: {
            accept: "application/json,\xA0text/javascript,\xA0*/*;\xA0q=0.01",
            "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
            "content-type": "application/json;\xA0charset=UTF-8",
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
                    /*
<img onload="size(this)" alt="XiuRen第2252期_嫩模王雨纯私房情趣内衣秀火辣美体傲人豪乳极致诱惑写真53P" src="/uploadfile/202007/4/1819160183.jpg" />
*/
                    //e.src
                    return new URL(e.getAttribute("src"), document.documentURI)
                        .href;
                })
                .filter((a) => !!a)
                .filter((a) => a.startsWith("http"))
        )
    );
    return fileurls;
}
async function downloadonepageallimages(document) {
    const directoryname = getdirectoryname(document);
    const fileurls = selectimagesfromdocument(document);
    return callaria2cdown(fileurls, directoryname);
}
function selectpagehtmlurls(document) {
    return Array.from(
        new Set(
            Array.from(document.querySelectorAll(".page > a")).map((e) => {
                /*
<a href="/Xiuren/Xiuren14469.html" class="current">1</a>
*/
                //a.href

                return new URL(e.getAttribute("href"), document.documentURI)
                    .href;
            })
        )
    );
}
async function resolvedocumentfromurl(url) {
    const text = await gethtmltext(url);
    const document = parsedocument(text, url);
    return document;
}

async function gethtmltext(url) {
    const response = await fetch(url);
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

function parsedocument(text, url) {
    const parser = new DOMParser();
    const document = parser.parseFromString(text, "text/html");
    document.documentURI = url;
    document.querySelectorAll = function (query) {
        return cssselect(query, document.documentElement);
    };
    return document;
}
export { downloadallpagesfromdocument, getdirectoryname };
export { resolvedocumentfromurl, selectimagesfromdocument };
