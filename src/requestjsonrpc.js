import { fetch } from "./fetch.js";
import { rpcurl } from "./rpcurl.js";

export async function requestjsonrpc(data) {
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
await response.json()
}
