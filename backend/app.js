const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

const SELECT_ALL_IMAGES_QUERY = 'SELECT * FROM post';

//Hide this part once it is working
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mySqlKey',
  database: 'freeup_db'
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
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


app.get('/cactus', function(req, res) {
    // We must end the request when we are done handling it
    res.end();
  });

  // connection to database for user
connection.connect(err=>{
  if(err) {
    return err;
  }
  const name = {Name: 'Michelle', email: 'mmmm@gmail.com', location: 'SF'};
  connection.query('INSERT INTO user (name, email, location) VALUES (\'Michelle\', \'mmmm@gmail.com\', \'SF\')', (err, results, fields) => {
    if(err) throw err;
  })
});

//connection to database for post
connection.connect(err=>{
  if(err) {
    return err;
  }
  const name = {image_data: 'asdf', availability: 'yes', date_added: '1/10/11', date_created: '1/11/11', user__id: '2'};
  connection.query('INSERT INTO post (image_data, availability, date_added, date_created, user__id) VALUES (\'asdf\', \'asdf\', \'1/10/11\', \'1/11/11\', \'2\')', (err, results, fields) => {
    if(err) throw err;
  })
});


// app.use(cors());

// app.get('/public/images', (req, res) => {
//   const {image_data} = req.query;
//   // const INSERT_IMAGE_QUERY = `INSERT INTO post (image_data) SET ('${image_data}')`
//   const url = {image_data: `${image_data}`};
//   connection.query('INSERT INTO post SET ?', url, (err, results) => {
//     if(err){
//       return res.send(err)
//     }
//     else{
//       return res.send('successful add')
//     }
//   });
// });

// const url = {};
// INSERT INTO post (image_data) SET ?, url, (err, results, fields) => {

// }



// catch 404 and forward to error handler
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
