#!/usr/bin/env node
import { start } from "./index.js";
const urls = Array.from(new Set(process.argv.slice(2))).filter(a=>a.startsWith("h"));
if (urls.length) {
    console.log(urls);
    start(urls).then(() => {
        console.log("全部处理完成");
    });
} else {
    throw new Error("empty download url,arguments should not be empty");
}
import process from "process";
process.on("unhandledRejection", (e) => {
    throw e;
});
