# https相关

## 安装自己的HTTPS证书, 并让浏览器显示绿色的锁

参考 [https://github.com/lwsjs/local-web-server/wiki/How-to-get-the-%22green-padlock%22-using-the-built-in-certificate](https://github.com/lwsjs/local-web-server/wiki/How-to-get-the-%22green-padlock%22-using-the-built-in-certificate)

1. 安装证书: macOS系统中在KeyChain中导入证书
2. 信任证书: 在KeyChain中找到证书并选择 always trust
3. 在浏览器中打开页面即为绿色

## 本地启动HTTPS服务器

可以使用这个库在本地启动https服务器 [local-web-server](https://github.com/lwsjs/local-web-server)

