var postCtrl = require('../controller/post');
var multipart = require('connect-multiparty')();

module.exports = function(express,app){
	
	var router = express.Router();

	router.get('/',function(req,res){
		res.json("API Home Page");
	})
	router.post('/upload', multipart, postCtrl.upload);
    router.get('/posts',postCtrl.get);
	app.use('/',router);
}