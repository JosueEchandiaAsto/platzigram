var express = require('express');
var multer  = require('multer');
var opts = { cache: false}
var ext = require('file-extension');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './src/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, +Date.now() + '.' + ext(file.originalname))
  }
})

var upload = multer({ storage: storage }).single('picture')

var app = express();
app.set('view engine', 'pug');

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.render('index', { title: 'Plaztigram'})
})
app.get('/api/users', function(req, res) {
  var pictures = [
    {
      user: {
        username: "Josuechandiasto",
        avatar: "foto 0.jpg",
        description: "Me gusta la Programación, El Desarrollo Web, me atrae la Robotica y las Matematicas"
      },
      post:
        [{
          url: "post (1).jpg",
          likes: 1,
          liked: false,
          createdAt: new Date()
        }, {
          url: "post (2).jpg",
          likes: 0,
          liked: true,
          createdAt: new Date()
        },{
          url: "post (3).jpg",
          likes: 2,
          liked: true,
          createdAt: new Date()
        }]
    },
    {
      user: {
        username: "Platzi",
        avatar: "foto 1.jpg",
        description: "Platzi Cursos de diseño, marketing y desarrollo web/móvil en la mejor experiencia de educación online. | Usa el HT #Platzi goo.gl/f1a0yA"
      },
      post:
        [{
          url: "post (4).jpg",
          likes: 10,
          liked: true,
          createdAt: new Date()
        },{
          url: "post (5).jpg",
          likes: 9,
          liked: true,
          createdAt: new Date()
        },{
          url: "post (6).jpg",
          likes: 3,
          liked: true,
          createdAt: new Date()
        }]
    }
  ];
  setTimeout(function() {
    res.send(pictures)
  },0);
})
app.post('/api/pictures', function(req , res) {
  upload(req, res, function(err) {
    if (err) {
      return res.send(500, "Error uploading file");
    }
    res.send("File Uploaded")
  });
})

app.get('/signup', function(req, res) {
  res.render('index')
})
app.get('/user/:u', function(req, res) {
  res.render('user', { title:req.params.u})
})
app.get('/post/:p', function(req, res) {
  res.render('user', { title: req.params.p})
})
app.get('/signin', function(req, res) {
  res.render('index')
})

app.listen(8080, function(err) {
  if (err) return console.log('Hubo un error'), process.exit(1);
  console.log("Escuchando en el puerto 8080")
})
