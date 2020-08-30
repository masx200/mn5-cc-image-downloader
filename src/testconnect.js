import net from "net";
import { promisify } from "util";
import { requestjsonrpc } from "./requestjsonrpc.js";
import { rpcurl } from "./rpcurl.js";

export async function testconnect() {
    const url = new URL(rpcurl);
    console.log(url);
    // @ts-ignore
    await promisify(net.connect)(Number(url.port), url.hostname);
    await requestjsonrpc([]);
}
