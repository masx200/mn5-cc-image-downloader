 import nodefetch from 'node-fetch';
import xmldom from 'xmldom';
import {
	selectimagesfromdom,
    downloadallpagesfromdom,
    resolvedomfromurl
} from './gistfile1.js';
import https from 'https';
import http from 'http';
import process from 'process';
http.globalAgent.keepAlive = true;
https.globalAgent.keepAlive = true;
const fetch = nodefetch.default;
const {DOMParser} = xmldom;
export {
    DOMParser
};
export {
    fetch
};
process.on('unhandledRejection', e => {
    throw e;
});
const urls = ['https://www.xgmn.org/Xiuren/Xiuren14469.html'];
async function start(urls) {
    for (let url of urls) {
        const dom = await resolvedomfromurl(url);
        console.log(dom);
        const imgurls = selectimagesfromdom(dom);
        console.log(imgurls);
    }
}
start(urls);