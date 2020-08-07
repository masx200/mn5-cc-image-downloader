# mn5-cc-image-downloader

#### 介绍

以下两个网站的图片爬虫

https://www.xiurenji.com/

https://www.mn5.cc/

需要配合 arai2c 使用，

aria2 RPC 调用网址为

http://localhost:6800/jsonrpc

安装


```
yarn global add "@masx200/mn5-cc-image-downloader"
```
使用方法

命令行模式支持多个参数传入
```
npx mn5-cc-image-downloader https://www.mn5.cc/YouMi/14745.html 

```
```shell

yarn start 'https://www.mn5.cc/Mtcos/Mtcos14529.html' "https://www.mn5.cc/YouMi/14550.html"

```

aria2c RPC 配置

https://github.com/masx200/aria2c-backend-rpc-config
