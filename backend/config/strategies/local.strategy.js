// var passport = require('passport'),
//     LocalStrategy = require('passport-local').Strategy;

// module.exports = function (User) {
//     passport.use(new LocalStrategy({
//         usernameField: 'username',
//         passwordField: 'password'
//     },
//         function (username, password, done) {
//             var query = {
//                 username: username
//             };
//             User.findOne(query, function (err, results) {
//                 if (results.password === password) {
//                     console.log("GOOD PAS", results)
//                     var user = results;
//                     done(null, user);
//                 } else {
//                     console.log("BAD PAS", results)                    
//                     done(null, false, { message: 'Bad Password' });
//                 }
//             });

//         }));
// };

var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

module.exports = function (User) {
    passport.use(new LocalStrategy(
        function (username, password, done) {
            User.findOne({ username: username }, function (err, user) {
                if (err) { return done(err); }
                if (!user) {
                    return done(null, false, { message: 'Incorrect username.' });
                }
                if (user.password !== password) {
                    return done(null, false, { message: 'Incorrect password.' });
                }
                return done(null, user);
            });
        }
    ));
};








