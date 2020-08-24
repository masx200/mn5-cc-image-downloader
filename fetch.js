import nodefetch from "node-fetch";

import pupkg from "@shanyue/promise-utils";
const { retry, sleep } = pupkg;

import AsyncLimiterClass from "@masx200/async-task-current-limiter";
const limiter = AsyncLimiterClass(20);

async function fetch(url, opt = {}) {
    return await retry(
        () => {
            onrequest(url, opt);
            return nodefetch.default(url, opt);
        },
        {
            times: 7,
            onFailedAttempt: async (e) => {
                console.warn(e);
                console.warn("网络错误，4秒后重试");
                await sleep(4000);
            },
        }
    );
}

const limitfetch = limiter.asyncwrap(fetch);
export { limitfetch as fetch };
function onrequest(url, opt = {}) {
    const { method = "GET" } = opt;
    console.log("request", method, url);
}
