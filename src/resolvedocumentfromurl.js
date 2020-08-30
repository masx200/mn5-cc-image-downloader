import { urltodom } from "./index.js";
import { parsedocument } from "./parsedocument.js";
import { gethtmltext } from "./gethtmltext.js";

export async function resolvedocumentfromurl(url) {
    if (urltodom.get(url)) {
        return urltodom.get(url);
    }
    const text = await gethtmltext(url);
    const document = parsedocument(text, url);
    urltodom.set(url, document);
    return document;
}
