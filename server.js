const { User } = require('./models')
const express = require('express')

const app = express()
const SECRET = 'WERETERWQWR2E3R4TER433RWE'
const jwt = require('jsonwebtoken')
// const createError = require('http-errors')

app.use(express.json())

app.get('/api/users', async (req, res) => {
	const users = await User.find()
	res.send(users)
})

app.post('/api/register', async (req, res) => {
	const user = await User.create({
		username: req.body.username,
		password: req.body.password
	})
	res.send(user)
})

app.post('/api/login', async (req, res) => {
	const user = await User.findOne({
		username: req.body.username
	})
	// assert(user, 422, "用户不存在");
	if(!user){
		return res.status(422).send({
			code: 0,
			message: '用户名不存在'
		})
	}

	const isPasswordValid =  require('bcrypt').compareSync(
		req.body.password,
		user.password
		)
	if(!isPasswordValid){
		return res.status(422).send({
			code: 0,
			message: '密码无效'
		})
	}
	// assert(isPasswordValid, 422, '密码错误');
	//生成token
	const token = jwt.sign({
		id: String(user._id)
	}, SECRET)


	res.send({
		code: 1,
		user,
		token: token,
		msg: '登陆成功'
	})
})
app.use(async (err, req, res, next) => {
	res.status(err.statusCode || 500).send({ message: err.message });
});
const auth = async (req, res, next) => {
	const raw = String(req.headers.authorization).split(' ').pop()
	const {id} =  jwt.verify(raw, SECRET)
	req.user = await User.findById(id)
	next()
}

app.get('/api/profile', auth, async (req, res) => {

	res.send(req.user)
})

// app.get('/api/orders', auth, async (req, res) => {
// 	const orders = await orders.find().where({
// 		user: req.user
// 	})

// 	res.send(orders)
// })

app.listen(3001, () => {
	console.log('http://localhost:3001')
})
