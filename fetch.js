import nodefetch from "node-fetch";

function fetch(url, opt = {}) {
    onrequest(url, opt);
    return nodefetch.default(url, opt);
}
export { fetch };
function onrequest(url, opt = {}) {
    const { method = "GET" } = opt;
    console.log("request", method, url);
}
