const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const mysql = require('mysql');
const mySqlKey = require('./keys').mySql

const app = express();

const SELECT_IMAGE_QUERY = 'SELECT * FROM post'

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const connection = mysql.createConnection({
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: 'mySqlKey',
  database: 'freeup_db'
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(cors());
app.use(cookieParser());
app.use(fileUpload());
app.use('/public', express.static(__dirname + '/public'));


app.post('/upload', (req, res, next) => {
  console.log(req);
  let imageFile = req.files.file;

  imageFile.mv(`${__dirname}/public/images/${req.body.filename}.jpg`, function(err) {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({file: `public/images/${req.body.filename}.jpg`});
  });

})

  connection.connect((err) => {
      if (err) throw err;        
  })


app.get('/user', function(req, res){
  const sqlQuery = 'SELECT * FROM user';
  // mysqlConnect((closeConnection) => {
    connection.query(sqlQuery, function(error, result, field){
      if(error) throw error;
      const data= JSON.parse(JSON.stringify(result));
      console.log(data);
      return res.send(data);
    })
});


  //connection to database for user info
app.post('/userInfo', function(req, res) {
  console.log(req.body);
    const name = {Name: req.body.name, email: req.body.email, location: req.body.location};
    connection.query('INSERT INTO user SET ?', name, (err, results, fields) => {
      if(err) throw err;
    })
})





//catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(8000, () => {
  console.log('8000');
});

module.exports = app;

