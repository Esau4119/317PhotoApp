var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Index', name:"Esau Bojorquez Medina" ,layout: 'uniLay'});
});

module.exports = router;
router.get('/home',(req,res,next) => {
  res.render('home', {title: 'Home'})
})
router.get('/login',(req,res,next) => {
  res.render('login', {title: 'Login',layout: 'uniLay'})
})

router.get('/registration',(req,res,next) => {
  res.render('registration', {title: 'Registration',layout: 'uniLay'})
})
router.get('/postimage',(req,res,next) => {
  res.render('postimage', {title: 'POST',layout: 'uniLay'})
})
router.get('/viewpost',(req,res,next) => {
  res.render('viewpost', {title: 'ViewPost',layout: 'viewLay'})
})