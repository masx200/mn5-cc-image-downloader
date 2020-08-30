import { urltodom } from "./index.js";
import { resolvedocumentfromurl } from "./resolvedocumentfromurl.js";
import { selectpagehtmlurls } from "./selectpagehtmlurls.js";
import { downloadonepageallimages } from "./downloadonepageallimages.js";

export async function downloadallpagesfromdocument(document) {
    const allpageurls = selectpagehtmlurls(document);
    await downloadonepageallimages(document);
    await Promise.all(
        allpageurls.map(async (url) => {
            const dom = await resolvedocumentfromurl(url);
            return await downloadonepageallimages(dom);
        })
    );
    console.log(
        "all album\xA0images\xA0download\xA0done " + document.documentURI
    );

    urltodom.delete(document.documentURI);
    allpageurls.forEach((url) => urltodom.delete(url));
}
