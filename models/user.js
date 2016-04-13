/**
 * Created by glendex on 4/13/16.
 */
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
    local: {
        username: String,
        password: String
    },

    signUpdate: {type: Date,
        default: Date.now()}
});

userSchema.methods.generateHash = function(password){
    //Create salted has of password by hashing plaintext password
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

userSchema.methods.validPassword = function(password){
    //Hash entered passwrod, compare with store hash
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);