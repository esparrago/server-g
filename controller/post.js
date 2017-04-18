Post = require('../models/post');
var config = require('../config/settings'),
    cloudinary = require('cloudinary');
var multipart = require('connect-multiparty')();
var gify = require('gify');

cloudinary.config({
    cloud_name: config.cloud_name,
    api_key: config.api_key,
    api_secret: config.api_secret
});


module.exports = {

    upload: function (req, res, next) {
        console.log(req.files.file.path);
        console.log(req.body);
        var opts = {
          width: 250,
          rate:  6
        };

        gify(req.files.file.path, 'out.gif', opts, function(err){
          if (err) throw err;
          console.log("!!!!!!!GIF success GIF!!!!!");
          var randomId = Math.floor(Math.random()*900000) + 100000;
          cloudinary.v2.uploader.upload('out.gif', { 
            public_id: "users/test-user/" + randomId,
            upload_preset: "grid"

            }, function (err, resp) {
              if (err) return console.log(err);
              console.log(err);
              console.log("subio!!!");
              console.log(err);
              console.log(resp.url);
              var newPost = new Post({
                  image_url: resp.url,
              }).save(function (err, response) {
                  if (err) return next(err);
                  res.json({
                      error: false,
                      result: response
                  });
              })
          });
        });
    },
    get: function (req, res, next) {
        Post.find({}, function (err, result) {
            if(err) return next(err);
            //console.log(result.reverse());
            var reverseRes = result.reverse();
            //console.log(reverseRes);
            res.json({posts:result});
        });
    }

}