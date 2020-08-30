import { parseargs } from "./parseargs.js";
import process from "process";

export const argobj = parseargs(process.argv.slice(2));
