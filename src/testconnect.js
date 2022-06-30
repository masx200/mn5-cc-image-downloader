import net from "net";
// import { promisify } from "util";
import { requestjsonrpc } from "./requestjsonrpc.js";
import { rpcurl } from "./rpcurl.js";

export async function testconnect() {
    const url = new URL(rpcurl);
    // console.log(url);
    await new Promise((resolve, reject) => {
        const socket = net.connect(url.port, url.hostname);
        socket.on("error", reject);
        socket.on("connect", resolve);
    });

    // @ts-ignore
    // const s = await promisify(net.connect)(Number(url.port), url.hostname);

    // console.log(s);
    await requestjsonrpc([]);
}
