var cors = require('cors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');

var app = express();

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const log4js = require('log4js');
const service = require('./app/service')
app.use(log4js.connectLogger(service.getLogger('normal'), {
  level: 'auto',
  format: ':method :url'
}));

app.use('/', indexRouter);
app.use('/api', apiRouter);

module.exports = app;
