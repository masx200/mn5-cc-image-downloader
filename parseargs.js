function parseargs(args) {
    const 参数obj = {};
    args.filter((s) => s.startsWith("--"))
        .map((s) => /--(?<key>.+)=(?<value>.+)/g.exec(s))
        .forEach((execArray) => {
            const groups = execArray?.groups;
            const key = groups?.key;
            const value = groups?.value;
            if (key && value) {
                参数obj[key] = value;
            }
        });
    return 参数obj;
}
export { parseargs };
