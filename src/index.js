// @ts-ignore
import http from "http";
// @ts-ignore
import https from "https";
import { checkurl } from "./checkurl.js";
import { start } from "./start.js";
http.globalAgent.keepAlive = true;
https.globalAgent.keepAlive = true;
export const urltodom = new Map();
// export { urltodom };
export { start, checkurl };
