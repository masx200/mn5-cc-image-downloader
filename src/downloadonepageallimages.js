import { callaria2cdown } from "./callaria2cdown.js";
import { getdirectoryname } from "./getdirectoryname.js";
import { selectimagesfromdocument } from "./selectimagesfromdocument.js";

export async function downloadonepageallimages(document) {
    const directoryname = getdirectoryname(document);
    const images = selectimagesfromdocument(document);
    const url = document.documentURI;
    console.log(url, directoryname, images);
    await callaria2cdown(images, directoryname);
    console.log(
        "one page\xA0images\xA0download\xA0done " + document.documentURI,
    );
}
