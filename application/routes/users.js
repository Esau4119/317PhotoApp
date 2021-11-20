var express = require('express');
var router = express.Router();
var db = require('../config/database');
var bcrypt = require('bcrypt')
const {registerValidator} = require('../middleware/validationM');
const UserError = require("../helpers/error/UserError");
const {errorPrint,successPrint} = require("../helpers/debug/debugprinters");
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});


router.post('/register',  registerValidator,(req, res, next) => {
  let password = req.body.password;
  let email = req.body.email;
  let username = req.body.username;
  let cpassword = req.body.cpassword;
 
  // res.json({
  //   message:"Valid User!!!"
  // })


  /**
   * 
   * do server side validation 
   * not done in video must do on your own 
   */
  db.execute("SELECT * FROM users WHERE username=?", [username])
    .then(([results, fields]) => {
      if (results && results.length == 0) {
        return db.execute("SELECT * FROM users WHERE email=?", [email])
      } else {
        throw new UserError(
          "Registration Failed: Username already exists",
          "/registration",
          200
        );
      }
    })
    .then(([results, fields]) => {
      if (results && results.length == 0) {
        return bcrypt.hash(password, 8);
      } else {
        throw new UserError(
          "Registration Failed: Email already exists",
          "/registration",
          200);
      }
    })
    .then((hashedPassword) => {

      let baseSQL = "INSERT INTO users (username, email, password, created ) VALUES(?,?,?,now());"
      return db.execute(baseSQL, [username, email, hashedPassword])

    })
    .then(([results, fields]) => {
      if (results && results.affectedRows) {
        successPrint("User.js --> User was created!!")
        req.flash('success','User account has been made!')
        req.session.save(err =>{
          res.redirect('/login');
        })
       
      } else {
        throw new UserError(
          "Server Error, user could not be created",
          "/registration",
          500
        );
      }
    })
    .catch((err) => {
      errorPrint("user could not be made", err);
      if (err instanceof UserError) {
        errorPrint(err.getMessage());
        req.flash('error',err.getMessage())
        res.status(err.getStatus());
        res.redirect(err.getRedirectURL());
      } else {
        next(err);
      }
    });


});

router.post('/login', (req, res, next) => {
  let username = req.body.username
  let password = req.body.password;
  /**
 * 
 * do server side validation 
 * not done in video must do on your own 
 */

  let baseSQL = "SELECT id, username, password FROM users WHERE username=?;"
  let userId;
  db.execute(baseSQL, [username])
    .then(([results, fields]) => {
      if (results && results.length == 1) {
        let hashedPassword = results[0].password
        userId = results[0].id;
        return bcrypt.compare(password, hashedPassword)
      } else {
        throw new UserError("-Invalid username and/or password!", "/login", 200)
      }
    })
    .then((passwordsMatched) => {
      if (passwordsMatched) {
        successPrint(`User ${username} is logged in`);

        req.session.username = username;
        req.session.userId = userId;
        res.locals.logged = true;

        // res.cookie("logged",username,{expires: new Date(Date.now()+900000), httpOnly: false});
        // res.cookie("islogged","true",{expires: new Date(Date.now()+900000), httpOnly: false});
        req.flash('success','You have been successfully Logged in!')
        res.redirect("/");

      } else {
        throw new UserError("--Invalid username and/or password!", "/login", 200)
      }
    })
    .catch((err) => {
      errorPrint("user Login Failed");
      if (err instanceof UserError) {
        errorPrint(err.getMessage());
        req.flash('error',err.getMessage())
        res.status(err.getStatus());
        res.redirect('/login')
      } else {
        next(err);
      }
    })
});



router.post('/logout', (req, res, next) => {
  req.session.destroy((err) => {
    if(err){
      errorPrint('session could not be destroyed!')
      next(err);
    }else{
      successPrint('session was 360 no scoped')
      res.clearCookie('csid');
      res.json({status: "ok", message: "User is logged out"})
    }
  })

})
module.exports = router;


