#/usr/bin/env node
import {start}from "./index.js"
const urls = Array.from(new Set(process.argv.slice(2)));
if (urls.length) {
    console.log(urls);
    start(urls).then(()=>{process.exit(0)});
} else {
    throw new Error("empty download url,arguments should not be empty");
}
import process from "process"
process.on("unhandledRejection", (e) => {
    throw e;
});
