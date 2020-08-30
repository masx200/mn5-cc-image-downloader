export function makerpcdata(fileurls, directoryname) {
    const data = fileurls.map((url) => {
        const origin = new URL(url).origin + "/";
        return {
            jsonrpc: "2.0",
            method: "aria2.addUri",
            id: 1,
            params: [
                [url],
                {
                    header: [
                        "Referer: " + origin,
                        "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36",
                    ].join("\n"),
                    dir: directoryname,
                    split: "16",
                    "max-connection-per-server": "16",
                    "seed-ratio": "1.0",
                },
            ],
        };
    });
    return data;
}
