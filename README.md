# xiurenji-com-ngmn-org-image-downloader

#### 介绍

以下两个网站的图片爬虫

https://www.xiurenji.com/

https://www.xgmn.org/

需要配合 arai2c 使用，

aria2 RPC 调用网址为

http://localhost:6800/jsonrpc


使用方法

命令行模式支持多个参数传入

```shell

yarn start 'https://www.xgmn.org/Mtcos/Mtcos14529.html' https://www.xgmn.org/YouMi/14550.html

```

aria2c RPC 配置

https://github.com/masx200/aria2c-backend-rpc-config
