var express = require('express');
var router = express.Router();
var isLoggedIn = require('../middleware/routeprotectors').userIsLoggedIn

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Index', name:"Esau Bojorquez Medina" ,layout: 'uniLay'});
});

module.exports = router;
router.get('/home',isLoggedIn,(req,res,next) => {
  res.render('home', {title: 'Home'})
})
router.get('/login',(req,res,next) => {
  res.render('login', {title: 'Login',layout: 'uniLay'})
})

router.get('/registration',(req,res,next) => {
  res.render('registration', {title: 'Registration',layout: 'uniLay'})
})
//router.use('postimage', isLoggedIn);
router.get('/postimage',isLoggedIn,(req,res,next) => {
  res.render('postimage', {title: 'POST',layout: 'uniLay'})
})
router.get('/viewpost',isLoggedIn,(req,res,next) => {
  res.render('viewpost', {title: 'ViewPost',layout: 'viewLay'})
})










