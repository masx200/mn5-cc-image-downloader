import { resolvedocumentfromurl } from "./resolvedocumentfromurl.js";
import { downloadallpagesfromdocument } from "./downloadallpagesfromdocument.js";
import { checkurl } from "./checkurl.js";
import { urltodom } from "./index.js";
import { requestjsonrpc } from "./requestjsonrpc.js";

export async function start(urls) {
    urls = Array.from(new Set(urls)).map((url) => url.trim());
    urls.forEach((url) => checkurl(url));
    //先测试连接rpc成功与否
    await requestjsonrpc([]);
    for (let url of urls) {
        // url = url.trim();
        // checkurl(url);
        const document = await resolvedocumentfromurl(url);
        await downloadallpagesfromdocument(document);
    }
    urltodom.clear();
    console.log("全部处理完成");
}
export { downloadallpagesfromdocument };
