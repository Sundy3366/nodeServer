const { User } = require('../models/user')
const express = require('express')

var router = express.Router();
const SECRET = 'WERETERWQWR2E3R4TER433RWE'
const jwt = require('jsonwebtoken')


router.get('/users', async (req, res) => {
	const users = await User.find()
	res.send(users)
})
/*注册*/
router.post('/register', async (req, res) => {
	const { username, password } = req.body
	console.log(username, password)
	if(!username) {
		res.send({
			code: 0,
			msg: '用户名不能为空'
		})
	}
	if(!password) {
		res.send({
			code: 0,
			msg: '密码不能为空'
		})
	}
	const _user = await User.findOne({
		username: username
	})
	if(_user){
		return res.status(422).send({
			code: 0,
			message: '用户名已经存在'
		})
	}
	const user = await User.create({
		username: username,
		password: password
	})
	res.send(user)
})

/*登陆*/
router.post('/login', async (req, res) => {
	const user = await User.findOne({
		username: req.body.username
	})
	console.log(user)
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
	//生成token
	const token = jwt.sign({
		id: String(user._id)
	}, SECRET)


	res.send({
		code: 1,
		user,
		token: token
	})
})

const auth = async (req, res, next) => {
	const raw = String(req.headers.authorization).split(' ').pop()
	const {id} =  jwt.verify(raw, SECRET)
	req.user = await User.findById(id)
	next()
}

router.get('/profile', auth, async (req, res) => {
	const users = await User.find()
	res.send(users)
})

router.get('/logout',function (req, res) {

})

//导出路由器
module.exports = router
