import { fetch } from "./fetch.js";

export async function gethtmltext(url) {
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
