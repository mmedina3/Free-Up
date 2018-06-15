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

//connection to get images from the db and display it on the frontend
app.get('/imagePost', function (req, res) {
  debugger;
  const img = 'SELECT * FROM post WHERE post_city = ?';
  const user = req.query.post_city
  connection.query(img, user, function (error, result, field) {
    if (error) throw error;
    const data = JSON.parse(JSON.stringify(result));
    return res.send(data);
  })
})

  //connection to database for image
app.post('/upload', function (req, res) {
  console.log('in other upload')
  // res.json({thing: 'hi'})
  console.log(req.body)

  let imageFile = req.files.file;

  imageFile.mv(`${__dirname}/public/images/${req.body.filename}.jpg`, function (err) {
    if (err) {
      return res.status(500).send(err);
    }
    const name = {
      image_data: `/public/images/${req.body.filename}.jpg`,
      user__id: 71,
      category: req.body.category,
      infant_clothes: req.body.infant_clothes,
      infant_shoe: req.body.infant_shoe,
      baby_clothes: req.body.baby_clothes,
      baby_shoe: req.body.baby_shoe,
      kids_clothes: req.body.kids_clothes,
      kids_shoe: req.body.kids_shoe,
      post_city: null
    };
    console.log(name)
    connection.query('INSERT INTO post SET ?', name, (err, results, fields) => {
      if (err) throw err;
    })

    res.json({ file: `public/images/${req.body.filename}.jpg` });
  });
})

  // //connection to database for input form
  // app.post('/userInfo', function(req, res) {
  // console.log(req.body);
  //   const name = {
  //     Name: req.body.Name, 
  //     email: req.body.email, 
  //     location: req.body.location
  //   };
  //   connection.query('INSERT INTO user SET ?', name, (err, results, fields) => {
  //     if(err) throw err;
  //   })
  // });

  //connection from Auth0 profile info to import to  db
app.post('/profile', function (req, res) {
  console.log(req.body.email);
  const formInfo = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    date: req.body.date
  };
  connection.query('INSERT INTO user SET ?', formInfo, (err, results, fields) => {
    if (err) throw err;
    res.send({ banana: 3 })
  })
});


// error handler for MySQL
app.use(function (err, req, res, next) {
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