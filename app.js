var express = require('express'),
    favicon = require('serve-favicon'),
    path = require('path'),
    logger = require('morgan'),
    less = require('less-middleware'),
    bodyParser = require('body-parser'),
    expressLayouts = require('express-ejs-layouts'),
    index = require('./routes/index'),
    app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layout');
app.use(expressLayouts);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/public/javascripts/lib/es6-shim/', express.static(__dirname + '/node_modules/es6-shim/'));
app.use('/public/javascripts/', express.static(__dirname + '/build/'));
app.use('/public/javascripts/lib/socket.io/', express.static(__dirname + '/node_modules/socket.io-client'));
app.use('/public/stylesheets', less(__dirname + '/public/stylesheets'));
app.use('/public', express.static(__dirname + '/public'));

app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if(app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
