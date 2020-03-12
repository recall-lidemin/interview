## 代理

- 发往 servername/api/的请求会被转发到proxy_pass地址

```js
server{
    listen  8080; //监听端口
    server_name  域名或地址; //请求域名
    
    location /api/ {
        //代理转发地址
        proxy_pass 地址;
    }
}
```

## 基本命令

- ./nginx   启动
- ./nginx  -s  stop 停止
- ./nginx  -s  reload 重启
- ./nginx -h 帮助

## Forever 基本命令

- `forever start app.js后`台运行
- `forever list`查看forever进程
- `forever app.js`前台启动