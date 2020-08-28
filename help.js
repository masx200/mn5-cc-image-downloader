export const helptxt = `
两个图片网站的相册图片下载器
必选参数: 多个相册的URL
可选参数 "rpcurl" : 指定调用aria2 rpc 的URL

示例：


npx @masx200/mn5-cc-image-downloader https://www.mn5.cc/YouMi/14745.html https://www.xiurenji.com/XiuRen/6197.html

npx @masx200/mn5-cc-image-downloader --rpcurl=http://127.0.0.1:7000/jsonrpc   'https://www.mn5.cc/Mtcos/Mtcos14529.html' "https://www.mn5.cc/YouMi/14550.html"


输入的参数错误`;
