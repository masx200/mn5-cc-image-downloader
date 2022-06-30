export function getdirectoryname(document) {
    const directoryname =
        //   document.title +
        // "\xA0" +
        //有的页面找不到这个TypeError: Cannot read property 'textContent' of undefined
        /* document.querySelectorAll(`.ina > p > b:nth-child(2)`)[0]
            ?.textContent ?? */ document.title;
    return directoryname;
}
