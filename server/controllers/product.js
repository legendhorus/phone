const Product = require("../models/productModel");
const Message = require("../models/messageModel");
const Conversation = require("../models/conversationModel");


module.exports.getConversationList = function(req, res){
	User.findOne({username: req.params.username}).then(user => {
		Conversation.find({'_id': {$in: user.conversations}}).then(conversations => {
			res.json(conversations);
		})
	}).catch(err => {
		res.json(err);
	})
}

module.exports.getConversation = function(req, res) {
	Conversation.findById(req.params.conversationid)
	.then(conversation=>{
    	res.json(conversation);
    }).catch(err=>{

    })
}

module.exports.createConversation = function (req,res) {
	console.log("create");
	Conversation.create({
		title: req.body.title,
		avatar: req.body.avatar
	}).then(conversation => {
		User.update({
			'_id': { $in: req.body.members}},
			{$push: {conversations: conversation._id}},	
			{multi: true},
			(err, users) => {
				console.log(err);
				console.log(users);
			}
		)
		res.json(conversation);
	}).catch(err => {
		console.log(err);
	});
}
module.exports.updateConversation = function(req,res) {
	Conversation.findById(req.params.conversationid)
	.then(conversation=>{
		if(conversation) {
			if(req.body.avatar) {
				conversation.update({
					title: req.body.title,
					avatar: req.body.avatar
				})
				.then(conversation => {
					res.json(conversation);
				})
			} else {
				conversation.update({
					title: req.body.title
				})
				.then(conversation => {
					res.send(conversation);
				})
			}
			
		}
	})
}

module.exports.addUserToConversation = function(req,res) {
	Conversation.findById(req.params.conversationid)
		.then(function(conversation) {
			let userId = req.body.id;
			User.updateOne(
				{'_id': { $in: userId}},
				{$push: {conversations: conversation._id}},	
				{multi: true},
				(err, users) => {
					if(err){
						console.log("err");
					}
				}
			);
			res.json(conversation);
		})
		.catch(err =>{
			console.log(err);
		});
}