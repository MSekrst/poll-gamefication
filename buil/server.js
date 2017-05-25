'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _settings = require('./config/settings.js');

var _index = require('./routes/index.js');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('./mongo/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

// create database connections pool
(0, _index3.connectDatabase)();

app.use((0, _morgan2.default)('dev'));

app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_bodyParser2.default.json());

// serve static files from 'public'
app.use(_express2.default.static('public'));

// connect router on server
app.use(_index2.default);

app.listen(_settings.port, function () {
  console.log('Server is running at: ' + _settings.host + ':' + _settings.port);
});