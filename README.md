# mn5-cc-image-downloader

#### 介绍

以下两个图片网站的相册图片下载器

https://www.xiurenji.com/

https://www.mn5.cc/

https://www.mntp.vip/

带有限流功能和网络重试功能

# 配合 aria2 rpc

需要配合 arai2c 使用，

aria2 RPC 调用网址默认为，

http://localhost:6800/jsonrpc

也可以传入参数`rpcurl`来修改调用的 URL。

# 安装

```
yarn global add "@masx200/mn5-cc-image-downloader"
```

# 使用方法

命令行模式支持多个相册的 URL 参数传入

必选参数: 多个相册的 URL

可选参数 `rpcurl` : 指定调用 aria2 rpc 的 URL

例如

```
npx @masx200/mn5-cc-image-downloader https://www.mn5.cc/YouMi/14745.html https://www.xiurenji.com/XiuRen/6197.html

```

```shell

npx @masx200/mn5-cc-image-downloader --rpcurl=http://127.0.0.1:7000/jsonrpc   'https://www.mn5.cc/Mtcos/Mtcos14529.html' "https://www.mn5.cc/YouMi/14550.html"

```

# 推荐 aria2c RPC 配置

https://github.com/masx200/aria2c-backend-rpc-config
