export function selectimagesfromdocument(document) {
    const fileurls = Array.from(
        new Set(
            Array.from(document.querySelectorAll("img"))
                .map((e) => {
                    return new URL(e.getAttribute("src"), document.documentURI)
                        .href;
                })
                .filter((a) => !!a)
                .filter((a) => a.startsWith("http"))
                .filter((a) => a.endsWith(".jpg")),
        ),
    );
    return fileurls;
}
