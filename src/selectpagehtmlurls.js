export function selectpagehtmlurls(document) {
    return Array.from(
        new Set(
            Array.from([
                ...document.querySelectorAll(".pagination > ul > a"),
                ...document.querySelectorAll(".page > a"),
            ]).map((e) => {
                return new URL(e.getAttribute("href"), document.documentURI)
                    .href;
            }),
        ),
    );
}
