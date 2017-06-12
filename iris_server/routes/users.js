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
	db.users.find({"uid":currentUser},{"connections":1}).toArray(function(err,user){
		if(!err){
			var dontFind = user[0].connections;
			dontFind.push(currentUser)
			console.log(currentUser, dontFind)
			db.users.find({"uid":{"$nin":dontFind}},{"fullName":1,"headline":1,"pictureUrl":1,"score":1,"rating":1,"uid":1, "designation":1, "currentWorkplace":1,"lastLoginLocation":1}).limit(10).toArray(function(err,users){
				if(!err)
					res.send(users)
			})
		}
	})
	
});


router.get('/user', function(req, res) {
	var currentUser = req.param("uid")
	db.users.find({"uid":currentUser}).toArray(function(err,users){
		if(!err){
			if(users.length!=0)
				res.send({status:1,userObject:users[0]})
			else
				res.send({status:0})
		}	
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
	db.users.update({"uid":req.body.id},{"$push":{
		"requests":req.body.uid,
		"notifications":{
					"uid":req.body.uid,
					"fullName":req.body.fullName,
					"headline":req.body.headline,
					"reason" : req.body.reason,
					"type":1
					}
				}
			}, 
	function(err,result){
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
	db.users.update({"uid":req.body.uid},{"$set":{"chatId":req.body.chatid}},function(err,success){
		if(!err)
			res.send({status:1})
		else console.log(err)
	})
})
router.put("/updateLocation",function(req,res){
	let update = req.body
	db.users.update({"uid":update.uid},{"$set":{"lastLoginLocation":update.location}},function(err,success){
		if(!err)
			res.send({status:1})
	})
})
router.get("/chatId",function(req,res){
	db.users.find({"uid":req.param("uid")},{"chatId":1}).toArray(function(err,user){
		if(!err)
			res.send(user[0])
	})
})
router.get("/notifications",function(req,res){
	db.users.find({"uid":req.param("uid")},{"notifications":1}).toArray(function(err,user){
		if(!err)
			res.send(user[0])
	})
})
router.get("/connections",function(req,res){
	var list = new Array();
	db.users.find({"uid":req.param("uid")},{"connections":1}).toArray(function(err,user){
		if(!err)
			{
			var connectionList = user[0].connections
			console.log(connectionList)
				db.users.find({"uid":{"$in":connectionList}},{"uid":1,"fullName":1,"pictureUrl":1}).toArray(function(err,conn){
					if(!err)
						{
							res.send(conn)
						}
				})
				
			}
	})
})
router.post("/acceptConnect",function(req,res){
	var uid = req.body.uid
	var acceptId = req.body.acceptId
	db.users.update({"uid":uid},
		{
			"$push":{"connections":acceptId},
			"$pull":{"requests":acceptId,"notifications":{"uid":acceptId}}
		},function(err,response){
				if(!err)
					db.users.find({"uid":uid}).toArray(function(err,acceptor){
						console.log(err)
						if(!err)
							db.users.update({"uid":acceptId},
							{
								"$push":{"connections":uid, "notifications":{"type":0, "notificationId":(+new Date).toString(36),"message": acceptor[0].fullName+" is now a connection."}},
								"$pull":{"requested":uid}
							},function(err, response){
								console.log(err)
								if(!err)
									res.send({"status":1})
							})
						})
			})
})
router.post("/rejectConnect",function(req,res){
	var uid = req.body.uid
	var rejectId = req.body.rejectId
	db.users.update({"uid":uid},
		{"$pull":{"requests":rejectId,"notifications":{"uid":rejectId}}},
		function(err,response){
				if(!err)
					db.users.update({"uid":acceptId},
					{
						"$pull":{"requested":uid}
					},function(err, response){
						console.log(err)
						if(!err)
							res.send({"status":1})
					})	
			})
})
router.post("/events", function(req,res){

	var uid = req.body.uid, eventObject = req.body.event
	db.users.update({"uid":uid},{"$push":{"events":eventObject}},function(err, result){
		if(!err){
			db.users.find({"uid":uid},{"uid":1,"fullName":1,"pictureUrl":1}).toArray(function(err,user){
				if(!err){
					var withObject = user[0]
					console.log(withObject)
					var withUser = eventObject.with.uid
					eventObject.with = withObject
					db.users.update({"uid":withUser},{"$push":{"notifications":{"type":2,"notificationId":(+new Date).toString(36), "eventObject":eventObject}}}, function(err,result){
						if(!err)
							res.send({"status":1})
					})
				}
			})
		}
	})

})
router.get("/events", function(req,res){

	var uid = req.param("uid")
	db.users.find({"uid":uid},{"events":1}).toArray(function(err, user){
		if(!err){
			res.send(user[0].events)
		}
	})

})
module.exports = router;
