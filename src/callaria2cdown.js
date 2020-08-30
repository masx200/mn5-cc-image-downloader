import { makerpcdata } from "./makerpcdata.js";
import { requestjsonrpc } from "./requestjsonrpc.js";
export async function callaria2cdown(fileurls, directoryname) {
    const data = makerpcdata(fileurls, directoryname);
    await requestjsonrpc(data);
}
