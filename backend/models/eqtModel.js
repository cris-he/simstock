var mongoose = require('mongoose');

var eqtModel = mongoose.Schema({
    symbol: { type: String },
    worth: { type: Number },
    invested: { type: Number },
    was: { type: Number },
    earned: { type: Number },
    amount: { type: Number},
});

module.exports = mongoose.model('User', userModel);

