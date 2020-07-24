const Patients = require('../models/patient')
const express = require('express')

var router = express.Router();

/*病人列表*/
router.get('/patients', function (req, res) {
	let pageNum = parseInt(req.query.pageNum)
	let pageSize = parseInt(req.query.pageSize)
	let { name } = req.query
	let skip = (pageNum - 1) * pageSize
	let total
	console.log(req.query)
	// let sort = req.query.sort
	Patients.count({}, (err, count) => {
		if (err) next(err);
		total = count
	})
	var query = Patients.find({})
		.skip(skip)
		.limit(pageSize)
	/*通过使用RegExp，来构建正则表达式对象*/
	if (name) {
		var qs=new RegExp(name);
		query.where('name', qs);
	}

	query.exec((err, data) => {
		console.log(data)
		let count = data.length
		let pageCount = Math.ceil(count / pageSize);
		console.log(pageCount)
		console.log('werewertrerthg')
		if (err) {
			res.send({
				code: 0,
				message: '数据不存在'
			})
		} else {
			res.send({
				code: 1,
				message: '请求成功',
				data: {
					total: total,
					pageNum: pageNum,
					list: data
				}
			})
		}
	})
})

//导出路由器
module.exports = router
