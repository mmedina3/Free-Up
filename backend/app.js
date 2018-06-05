const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const cors = require('cors');
const mysql = require('mysql');
const mySqlKey = require('./keys').mySql
const Date = require('node-datetime')
const app = express();
const dotenv = require('dotenv');

const SELECT_IMAGE_QUERY = 'SELECT * FROM post'


dotenv.load();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//hide this once everything is working
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


//needed to connect with db
  connection.connect((err) => {
      if (err) throw err;        
  })

//information will show on Chrome DevTools & console
app.get('/user', function(req, res){
  const sqlQuery = 'SELECT * FROM user';
    connection.query(sqlQuery, function(error, result, field){
      if(error) throw error;
      const data= JSON.parse(JSON.stringify(result));
      console.log(data);
      return res.send(data);
    })
});


  //connection to database for image
app.post('/upload', function(req, res) {
  console.log('in other upload')
  // res.json({thing: 'hi'})
  console.log(req.body)

  let imageFile = req.files.file;

  imageFile.mv(`${__dirname}/public/images/${req.body.filename}.jpg`, function(err) {
    if (err) {
      return res.status(500).send(err);
    }
    const name = {
      image_data: `/public/images/${req.body.filename}.jpg` ,
      date_added: '0001-11-11 00:00:00',
      date_created: '0001-11-11 00:00:00',
      user__id: 2
    };
    console.log(name)
    connection.query('INSERT INTO post SET ?', name, (err, results, fields) => {
      if(err) throw err;
    })
    
    res.json({file: `public/images/${req.body.filename}.jpg`});
  });
})


  //connection to database for input form
  app.post('/userInfo', function(req, res) {
  console.log(req.body);
    const name = {
      Name: req.body.name, 
      email: req.body.email, 
      location: req.body.location
    };
    connection.query('INSERT INTO user SET ?', name, (err, results, fields) => {
      if(err) throw err;
    })
  });



// error handler for MySQL
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

 // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(8000, () => {
  console.log('localhost:8000');
});

module.exports = app;