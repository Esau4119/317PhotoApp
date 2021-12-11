var express = require('express');
var router = express.Router();
var isLoggedIn = require('../middleware/routeprotectors').userIsLoggedIn
var {getRecentPosts, getPostById, getCommentsByPostId} = require('../middleware/postmiddleware');
var db = require('../config/database');
/* GET home page. */
router.get('/', getRecentPosts,function(req, res, next) {
  res.render('index', { title: 'Index', name:"Esau Bojorquez Medina" ,layout: 'indexLay'});
});


router.get('/login',(req,res,next) => {
  res.render('login', {title: 'Login'})
})

router.get('/registration',(req,res,next) => {
  res.render('registration', {title: 'Registration'})
})
//router.use('postimage', isLoggedIn);
router.get('/postimage',isLoggedIn,(req,res,next) => {
  res.render('postimage', {title: 'POST'})
})
router.get('/viewpost',isLoggedIn,(req,res,next) => {
  res.render('viewpost', {title: 'ViewPost',layout: 'viewLay'})
})

router.get('/post/:id(\\d+)', getPostById,getCommentsByPostId, (req,res,next) => {

    res.render('viewpost',{title: `Post ${req.params.id}`,layout: 'viewLay'})
 


})




module.exports = router;



