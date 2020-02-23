let express = require('express');
let router = express.Router();

// let ctrlUser = require('../controllers/user');
// let ctrlMessage = require('../controllers/message');
// let ctrlConversation = require('../controllers/conversation');

// //user
// router.get('/users', (req,res) => {
// 	console.log("get");
// 	ctrlUser.getUserList(req,res);
// })
// router.get('/user/:userid', (req, res) => {
// 	ctrlUser.getUserById(req,res);
// })
// router.get('/userlist/:username', function(req, res) {
// 	ctrlUser.getUserByUsername(req,res);
// })
// router.post('/user', (req, res) => {
// 	ctrlUser.createUser(req, res);
// }) 
// router.put('/user/:userid', (req, res) => {
// 	ctrlUser.editUser(req, res);
// })
// //chat
// router.get('/conversation/:conversationid/messages', function (req,res) {
// 	ctrlMessage.getMessage(req,res);
// })
// router.post('/conversation/:conversationid/message', function(req,res) {
// 	ctrlMessage.sendMessage(req,res);
// });

// //Conversation
// router.post('/conversation', function(req,res) {
// 	ctrlConversation.createConversation(req,res);
// });
// router.put('/conversation/:conversationid', function(req,res) {
// 	ctrlConversation.updateConversation(req,res);
// });
// router.get('/conversation/:conversationid', function(req, res){
// 	ctrlConversation.getConversation(req, res);
// });
// router.get('/conversationList/:username', function(req,res){
// 	ctrlConversation.getConversationList(req,res);
// })
// router.put('/conversation/:conversationid/add', function(req,res) {
// 	ctrlConversation.addUserToConversation(req,res);
// })

module.exports = router;