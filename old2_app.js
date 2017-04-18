var express = require('express');
var app = express();
var cloudinary = require('cloudinary')
	, fs = require('fs');
var multipart = require('connect-multiparty')();

// Routing home
app.get('/', function (req, res) {
  res.send('<h1>Hello World!</h1>');
});

// Cloudinary Config
cloudinary.config({ 
  cloud_name: 'grideoapp', 
  api_key: '311441685958596', 
  api_secret: 'l28qacTLOHZd-0Bi4vMPy5DL214' 
});



// Routing upload
app.post('/upload', function(err, req, res, next){
	cloudinary.uploader.upload(req.files.file.path, function (resp) {

	    var newPost = new Post({
	        title: req.body.title,
	        image_url: resp.url,
	        description: req.body.description
	    }).save(function (err, response) {
	        if (err) return next(err);
	        res.json({
	            error: false,
	            result: response
	        });
	    })
	});
	console.log(err);
});




	/*cloudinary.v2.uploader.upload("dog.mp4", 
	    { resource_type: "video", 
	    public_id: "my_folder/my_sub_folder/dog_closeup",
	    eager: [
	      { width: 300, height: 300,
	          crop: "pad", audio_codec: "none" }, 
	      { width: 160, height: 100,
	          crop: "crop", gravity: "south",
	          audio_codec: "none" } ],                                   
	    eager_async: true,
	    eager_notification_url: "http://mysite/notify_endpoint"},
	    function(result) {console.log(result);}
	);*/


//Init Server port 3500
app.listen(3500, function (err, req, res, next) {
  console.log('Example app listening on port 3500!');
});