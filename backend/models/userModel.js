var mongoose = require('mongoose');

var userModel = mongoose.Schema({
    username: { type: String },
    password: { type: String },
    first: { type: String },
    last: { type: String },
    cash: { type: Number, default: 100000 },
    eqt: { type: Number, default: 0 },
    own: { type: Array, default: [] },
    assets: { type: Number, default: 100000 },
    earned: { type: Number, default: 0 },
    lastyear: { type: Array, default: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    labels: { type: Array, default: [] },
    ern_data: { type: Array, default: [] },
    eqt_data: { type: Array, default: [] },
});

module.exports = mongoose.model('User', userModel);

