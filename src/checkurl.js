//import assert from "assert";

export function checkurl(url) {
    url = new URL(url).href;
    /* assert(
        url.startsWith("http:") || url.startsWith("https:"),
        "url protocol should be http or https"
    );*/
    return url;
}
