var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

router.get('*',function(req,res,next){
	let url = path.join(__dirname,'../public/api/images',req.url);
	console.log(url)
	fs.readFile(url,function(err,file){
		if(err){
			console.log(err);
			return;
		}else{
			res.send(file);
		}
	});
});

module.exports = router;