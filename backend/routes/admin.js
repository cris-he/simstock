var express = require('express'),
    bodyPaser = require('body-parser'),
    schedule = require('node-schedule'),
    request = require('request'),
    async = require('async');

var router = express.Router();



var routes = function (User) {
    // var routine = schedule.scheduleJob('5 * * * * *', function () {
    //     User.find().exec(function (err, users) {
    //         for (let i = 0; i < users.length; i++) {
    //             if(users[i].own.length != 0) {
    //             }
    //         }
    //     })
    // });
    router.route('/')
        .get(function (req, res) {
            User.find(req.query, function (err, users) {
                if (err)
                    console.log(err);
                res.send(users);
            })
        })
    return router;
}

// var found = false;
// for (let i = 0; i < req.user.own.length && !found; i++) {
//     for (var p in req.user.own[i]) {
//         if (req.user.own[i][p] == _eqt.symbol) {
//             console.log("Update", req.user.own[i][p], _eqt.symbol, req.user.own[i]["worth"], _data[_data.length - 1].average)
//             req.user.own[i]["worth"] = _data[_data.length - 1].average;
//             console.log("Done", req.user.own[i]["worth"])
//             found = true;
//             break;
//         }
//     }
// }



module.exports = routes;