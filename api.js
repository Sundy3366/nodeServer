const url = require('url')

var api =  'http://www.baidu.com?name=zhangsan&age=20'


const _url = url.parse(api, true)

console.log(_url)
var  getValue = url.parse(api, true).query

console.log(`姓名: ${getValue.name}; 年龄：${getValue.age}`)