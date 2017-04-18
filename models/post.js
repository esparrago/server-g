var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
	image_url:{ type:String,default:''},
	created_at: {type:Date,default:Date.now}
});

module.exports = mongoose.model('Post', postSchema);