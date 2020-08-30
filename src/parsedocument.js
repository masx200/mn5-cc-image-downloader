import { JSDOM } from "./commonutils.js";

export function parsedocument(text, url) {
    const {
        window: { document },
    } = new JSDOM(text, { url: url });
    return document;
}
