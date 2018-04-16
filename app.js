const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const flash = require('express-flash');
const override = require('method-override');
const https = require('https');
const app = express();
const engines = require('consolidate');
const fs = require('fs');
require('dotenv').config();
app.use(logger('dev'));
// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Passport authentication
app.use(session({saveUninitialized: true, resave: true, secret: 'secret'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Allows us to use '_method=<method>' to specify put, delete, etc.
app.use(override('_method'));

// Access public folder
app.use('/public', express.static(path.join(__dirname, 'public')));

// Allows for embedded Javascript
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Models
// const models = require('./server/models');

// Routes
require('./server/routes/index')(app, passport);

// Passport strategies
require('./server/config/passport.js')(passport);

app.get('*', (req, res) => res.status(404).send({
    message: 'Page not found...',
}));

const options = {
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem'),
    requestCert: false,
    rejectUnauthorized: false,
};
const models = require('./server/models');
models.sequelize.sync().then(function() {
    console.log('Nice! Database looks fine');
    }).catch(function(err) {
        console.log(err, 'Something went wrong with the Database Update!');
    });
const port = process.env.PORT || 8081;
https.createServer(options, app).listen(port, () => {
    console.log('server running at ' + port);
});


