var express = require('express'),
    bodyPaser = require('body-parser'),
    request = require('request'),
    async = require('async');

var router = express.Router();

var routes = function (User) {

    // router.use('/', function (req, res, next) {
    //     if (!req.user) {
    //         console.log('Not Signed In.')
    //         // res.redirect('/');
    //     }
    //     next();
    // });


    router.route('/')
        .post(function (req, res) {
            var new_user = new User(req.body);
            new_user.save();
            res.status(201).send(new_user);
        })
        .get(function (req, res) {
            var query = req.query;
            // query.sort({ assets: 'asc' });
            User.find(query).sort({ assets: -1 }).exec(function (err, users) {
                if (err)
                    // console.log(err);
                    res.status(500).send(err);
                else {
                    let __data = [];
                    for (let i = 0; i < users.length; i++) {
                        let item = {
                            _id: users[i]["_id"],
                            rank: i + 1,
                            name: users[i]["first"] + " " + users[i]["last"],
                            assets: users[i]["assets"]
                        }
                        __data.push(item);
                    }
                    res.json(__data);
                }
            })
        })


    // ID specific
    router.use('/:id', function (req, res, next) {
        User.findById(req.params.id, function (err, user) {
            if (err)
                // console.log(err);
                res.status(500).send(err);
            else if (user) {
                req.user = user;
                next();
            }
            else {
                res.status(404).send({ message: 'Id Not Found' });
            }
        });
    })
    router.route('/:id')
        .get(function (req, res) {
            req.user.eqt = 0;
            req.user.earned = 0;
            req.user.assets = 0;
            req.user.labels = [];
            req.user.eqt_data = [];
            req.user.ern_data = [];

            var first_time = true;
            async.everySeries(req.user.own, function (_eqt, callback) {
                var url = "https://api.iextrading.com/1.0/stock/" + _eqt.symbol + "/chart/1d";
                request.get(url, function (err, res, body) {
                    _data = JSON.parse(body)
                    if (first_time) {
                        // req.user.eqt_data = _data;
                        for (var i = 0; i < _data.length; i++) {
                            //console.log('inve', _data[i].average, _eqt.invested)
                            req.user.labels.push(_data[i].minute);
                            var goback = i;
                            if (_data[i].average == 0) {
                                // console.log("Bad API Record");
                                while (_data[goback].average == 0)
                                    goback = goback - 1;
                                // console.log("goback to ", i, goback);
                            }
                            req.user.eqt_data.push(_data[goback].average);
                            req.user.ern_data.push(_data[goback].average - _eqt.was);
                        }
                        first_time = false;
                    } else {
                        for (var i = 0; i < _data.length; i++) {
                            if (req.user.eqt_data[i]) {
                                var goback = i;
                                if (_data[i].average == 0) {
                                    // console.log("Bad API Record");
                                    while (_data[goback].average == 0)
                                        goback = goback - 1;
                                }
                                if (goback < 0) {
                                    goback = 0;
                                }
                                req.user.eqt_data[i] = req.user.eqt_data[i] + _data[goback].average;
                                req.user.ern_data[i] = req.user.ern_data[i] + _data[goback].average - _eqt.was;
                            }
                        }
                    }


                    if ((_data.length - 1) > -1) {
                        _eqt.worth = Math.round((_eqt.amount * _data[_data.length - 1].average) * 100) / 100;
                    }
                    _eqt.earned = Math.round((_eqt.worth - _eqt.invested) * 100) / 100;
                    req.user.earned = Math.round((req.user.earned + _eqt.earned) * 100) / 100;
                    req.user.eqt = Math.round((req.user.eqt + _eqt.worth) * 100) / 100;
                    // req.user.save();          
                    callback(null, !err);
                });
            }, function (err, result) {
                req.user.assets = req.user.cash + req.user.eqt;
                req.user.markModified('assets');
                req.user.markModified('eqt');
                req.user.markModified('own');
                req.user.save(function (err) {
                    if (err)
                        res.status(500).send(err);
                    else {
                        res.json(req.user);
                    }
                });
                // res.json(req.user);
            });

        })
        .put(function (req, res) {
            req.user.save(function (err) {
                if (err)
                    res.status(500).send(err);
                else {
                    res.json(req.user);
                }
            });

        })
        .patch(function (req, res) {
            if (req.body._id)
                delete req.body._id;
            // console.log("?", req.body)
            for (var p in req.body) {
                req.user[p] = req.body[p]
            }

            req.user.save(function (err) {
                if (err)
                    res.status(500).send(err);
                else {
                    res.json(req.user);
                }
            });

        })
        .delete(function (req, res) {
            req.user.remove(function (err) {
                if (err)
                    res.status(500).send(err);
                else {
                    res.status(204).send();
                }
            });
        })

    router.route('/:id/eqt')
        .get(function (req, res) {
            res.json(req.user.own)
        })
        .post(function (req, res) {
            req.user.cash = Math.round((req.user.cash - req.body.invested) * 100) / 100;
            req.user.eqt = req.user.eqt + req.body.worth;

            var found = false;
            var index = 0;
            for (let i = 0; i < req.user.own.length && !found; i++) {
                if (req.user.own[i]["symbol"] == req.body.symbol) {
                    index = i;
                    found = true;
                }
            }

            if (found) {
                req.user.own[index]["amount"] = req.user.own[index]["amount"] + req.body.amount;
                req.user.own[index]["worth"] = req.user.own[index]["worth"] + req.body.worth;
                req.user.own[index]["invested"] = req.user.own[index]["invested"] + req.body.invested;
            } else {
                req.user.own.push(req.body);
            }

            req.user.markModified('own');
            req.user.save(function (err) {
                if (err)
                    res.status(500).send(err);
                else {
                    var __data = {
                        cash: req.user.cash,
                        own: req.user.own
                    }
                    res.json(__data);
                }
            });
        })
        .patch(function (req, res) {
            req.user.cash = Math.round((req.user.cash + req.body.worth) * 100) / 100;
            req.user.own = req.user.own.filter(e => e.symbol != req.body.symbol);
            req.user.markModified('cash');
            req.user.markModified('own');
            req.user.save(function (err) {
                if (err)
                    res.status(500).send(err);
                else {
                    var __data = {
                        cash: req.user.cash,
                        own: req.user.own
                    }
                    res.json(__data);
                }
            });
        })






    return router;
};

module.exports = routes;


