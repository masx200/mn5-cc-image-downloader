import { argobj } from "./argobj.js";

export { argobj };
console.log(argobj);
export const rpcurl = argobj["rpcurl"] ?? "http://localhost:6800/jsonrpc";
