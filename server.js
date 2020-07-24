const express = require('express')
const user = require('./routes/user')
const patient = require('./routes/patient')
// const cors = require("cors"); //引入cors模块（解决跨域问题）
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/express-auth',{
	// useNewUrlParser: true
	useCreateIndex: true
})
const app = express()
// var bodyParser = require('body-parser');
app.use(express.json())
//解决post传输的数据格式问题
// app.use(bodyParser.urlencoded({
// 	extended: false
// }))
const createError = require('http-errors')
// app.use(cors());
// 下面的类似于http请求的头文件(另一篇文章有写到http请求，也是注册登录)
app.all("*", function (req, res, next) {
	//设置允许跨域的域名，*代表允许任意域名跨域
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "content-type"); //允许的header类型
	res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS"); //跨域允许的请求方式
	next(); //是否继续向下执行
});

app.use('/user', user)
app.use('/patient', patient)
// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development'? err : {};

	// render the error page
	res.sendStatus(err.status || 500);
	// res.render('error');
});


app.listen(3001, () => {
	console.log('http://localhost:3001')
})
