var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var adminSchema = new Schema({
    username: String,
    password: String,
    updated_at: String,
})

var User = mongoose.model("Admin", adminSchema);

module.exports = User;