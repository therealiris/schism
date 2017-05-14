var express = require('express');
var router = express.Router();
var db = require("../db/mongo.js")
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 9001 });
wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('Arjun can see the ', message);
  });
 
  ws.send('something');
});
/* GET users listing. */

router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});

router.post('/data', function(req, res, next) {
	var userData = req.body
	console.log(userData.fullName)
	db.users.find({"uid":userData.id}).toArray(function(err, user){
		if(!err)
			{

				if(user.length==0)
					{
						var newuser = userData
						db.users.insert(newuser,function(err,result){
							if(!err)
								{
									console.log(result)
									res.send(newuser)
								}
							})
					}
					else 
						res.send(user[0])

			}
		else
			console.log(err)
	})
});

router.get('/discover', function(req, res, next) {
	var page = req.param("page")
	var currentUser = req.param("uid")
	var entries = 10*page
	var usrId = [currentUser]
	console.log(entries,usrId)
	db.users.find({"uid":{"$nin":usrId}},{"fullName":1,"headline":1,"pictureUrl":1,"score":1,"rating":1,"uid":1}).limit(10).toArray(function(err,users){
		if(!err)
			res.send(users)
	})
});
router.get('/user', function(req, res) {
	var currentUser = req.param("uid")
	db.users.find({"uid":currentUser}).toArray(function(err,users){
		if(!err)
			res.send(users[0])
	})
});
router.get('/user/contact', function(req, res) {
	var contactUser = req.param("uid")
	db.users.find({"uid":contactUser},{"fullName":1,"pictureUrl":1,"chatId":1}).toArray(function(err,users){
		if(!err)
			res.send(users[0])
	})
});
router.put("/request",function(req,res){
	console.log(req.body)
	db.users.update({"uid":req.body.id},{"$push":{"requests":req.body.uid}}, function(err,result){

		if(!err){
			console.log(result.result)
			db.users.update({"uid":req.body.uid},{"$push":{"requested":req.body.id}},function(err, response){
				if(!err)
					res.send({status:1})
			})
			
		}
		else
			console.log(err)
	})
	
})
router.put("/chatId",function(req,res){
	db.users.update({"uid":req.param("uid")},{"$set":{"chatId":req.param("chatid")}},function(err,success){
		if(!err)
			res.send({status:1})
	})
})
router.get("/chatId",function(req,res){
	db.users.find({"uid":req.param("uid")},{"chat":1}).toArray(function(err,user){
		if(!err)
			res.send(user[0])
	})
})
module.exports = router;
