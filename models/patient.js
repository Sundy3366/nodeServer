var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schema = new Schema({
	createTime: { type: Date, default: Date.now },
	updateTime: { type: Date, default: Date.now },
	appKey: Schema.Types.ObjectId,
	pageNum: String,
	pageSize: String,
	// sort: String
});

module.exports = mongoose.model('Patients', schema);
