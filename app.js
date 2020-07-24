const http = require('http');

http.createServer((req, res) =>{
    console.log(req.url); //获取url

    //设置响应头 
    res.writeHead(200, {'Content-type': "text/html;charset=utf-8"})
    res.write('你好，this is nodejs')

    res.end();
}).listen(3002)