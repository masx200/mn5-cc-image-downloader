import nodefetch from "node-fetch";

import pupkg from "@shanyue/promise-utils";
const { retry, sleep } = pupkg;
async function fetch(url, opt = {}) {
    return await retry(
        () => {
            onrequest(url, opt);
            return nodefetch.default(url, opt);
        },
        {
            times: 5,
            onFailedAttempt: async (e) => {
                console.warn(e);
                console.warn("网络错误，3秒后重试");
                await sleep(3000);
            },
        }
    );
}
export { fetch };
function onrequest(url, opt = {}) {
    const { method = "GET" } = opt;
    console.log("request", method, url);
}
