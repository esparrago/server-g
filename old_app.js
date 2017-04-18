// Set up
var express = require('express');
var app = express();
var cloudinary = require('cloudinary')
	, fs = require('fs')

// Routing home
app.get('/', function (req, res) {
  res.send('<h1>Hello World!</h1>');
});


 //allow cross origin requests
app.use(function(req, res, next) {
	res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
	res.header("Access-Control-Allow-Origin", "http://localhost:3000");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Credentials", true);
	next();
});



// Routing upload
app.post('/upload', function(request, result){
	cloudinary.v2.uploader.upload(request, 
	    { resource_type: "video", 
	    public_id: "users/test/dog_closeup",}
	    function(result) {console.log(result);}
	);
});

function create_direct(req, res) {
  // In direct mode, the image is uploaded to Cloudinary by the browser,
  // and upload metadata is available in JavaScript (see add_direct.ejs).
  var result = {};
  var photo = new Photo(req.body);
  result.photo = photo;
  
  var image = new cloudinary.PreloadedFile(req.body.image_id);
  // check that image resolved from image_id is valid
  if (image.is_valid()) {
    photo.image = image.toJSON();
    console.dir(photo.image)
  }
  photo.save().then(function (photo) {
        console.log('** photo saved')
      })
      .catch(function (err) {
        result.error = err;
        console.log('** error while uploading file');
        console.dir(err)
      }).finally(function () {
    res.render('photos/create_direct', {photo: photo, upload: photo.image});
  });
}


// Cloudinary Config
cloudinary.config({ 
  cloud_name: 'grideoapp', 
  api_key: '311441685958596', 
  api_secret: 'l28qacTLOHZd-0Bi4vMPy5DL214' 
});

app.locals.api_key = cloudinary.config().api_key;
app.locals.cloud_name = cloudinary.config().cloud_name;


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
app.listen(3500, function () {
  console.log('Example app listening on port 3500!');
});