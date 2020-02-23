const express = require('express');
const app = express();
const server = require('http').Server(app);

const morgan = require("morgan");
const mongoose = require("mongoose");
const path = require('path');
const config = require('./config');
var cors = require('cors');
app.use(cors());

const io = require('socket.io')(server);

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const routesApi = require('./routes/index');
const authRoutesApi = require('./routes/authentication');
// var uploadRoutesApi = require('./routes/upload');

var authVerify = require('./controllers/verify-authentication');

mongoose.connect(config.getDbConnectionString(), function (err, db) {
    
    if (err) throw err;
    // mongoose.connection.db.listCollections().toArray(function (err, names) {
    //     console.log(names); // [{ name: 'dbname.myCollection' }]
        
    // });
    console.log('Ket noi thanh cong');
});


app.use(express.static(path.join(__dirname, '../client')));
app.use(express.static(path.join(__dirname, '../uploads')));
app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

app.use('/action', authRoutesApi);
// app.use(authVerify());
app.use('/api', authVerify(), routesApi);
// app.use('/upload', uploadRoutesApi);
// app.use('/api', routesApi);

server.listen(3000, function () {
	console.log('listening on port 3000');
});