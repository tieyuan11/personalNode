var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/articleList.do', function(req, res, next) {
 	let db = req.db;
 	let article = db.get('articleList');

 	article.find({},function(err,data){
 		res.send(data)
 	});
});
router.post('/addArticle.do',function(req , res , next){
	let db = req.db;
	let article = db.get('articleList');

	let dateObj = new Date();
	let year = dateObj.getFullYear();
	let month = dateObj.getMonth() + 1;
	let strDate = dateObj.getDate();
	let saveDate = '';
	let articleId = 'A' + dateObj.getTime();

	if(month>=0 && month<=9){
		month = '0' + month;
	}
	if(strDate>=0 && strDate<=9){
		strDate = '0' + strDate;
	}
	saveDate = year + month + strDate + '';

	article.insert({
		articleId : articleId,
		title : req.body.title,
		introduce : req.body.introduce,
		content : req.body.content,
		time : saveDate,
		plNum : 0,
		llNum : 0
	});
	res.send({code:'S'});
});

router.post('/findArticle.do',function(req , res , next){
	let db = req.db;
	let article = db.get('articleList');
	let articleId = req.body.articleId;
	let llNum = 0;

	article.find({articleId:articleId},function(err,data){
		llNum = data[0].llNum;
		llNum++;

		res.send(data[0]);
	}).then(function(){
		article.update({articleId:articleId},{$set:{llNum:llNum}});
	});

});
module.exports = router;
