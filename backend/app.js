var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    cookieParser = require('cookie-parser'),
    session = require('express-session');

var app = express();
var port = process.env.PORT || 8000;

var db = mongoose.connect('mongodb://localhost:27017/simstock');
var User = require('./models/userModel');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(session({ secret: 'simstock' }));
require('./config/passport')(app, User);


adminRouter = require('./routes/admin')(User);
authRouter = require('./routes/auth')(User);
userRouter = require('./routes/users')(User);

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use('/api/admin', adminRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);


app.get('/', function (req, res) {
    res.send("Hello SimStoker!");
})


app.listen(port, function (err) {
    console.log("SimStock Backend Running on Port " + port);
});

