const checkUsername = (username) => {
    /**reg explination
     * ^     ---> start of string 
     * \D    ---> anything Not a digit {^0-9}
     * \w    anything that is a alphanumeric character [a-zA-Z0-9]
     * {2,}  --> 2 or more characters w/ no Upper limit
     * 
     */
    let usernameChecker = /^\D\w{2,}$/
    return usernameChecker.test(username)


};


const checkPassword = (password, cpassword) => {
    let passchecker = /^(?=.*[0-9])(?=.*[!@#$.%^&*])[a-zA-Z0-9!@#$.%^&*]{7,15}$/;
    return passchecker.test(password) && password == cpassword;

};

const checkEmail = (email) => {
    let emailChecker = /^\S+@\S+\.\S+$/
    return emailChecker.test(email)
};


const registerValidator = (req, res, next) => {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let cpassword = req.body.cpassword;
    if (!checkUsername(username)) {
        req.flash('error', "Invalid Username")
        req.session.save(err => {
            res.redirect("/registration")
        });
    } else if (!checkEmail(email)) {
        req.flash('error', "Invalid Email");
        req.session.save(err => {
            res.redirect("/registration")
        });
    } else if (!checkPassword(password, cpassword)) {
        req.flash('error', "Invalid Password");
        req.session.save(err => {
            res.redirect("/registration")
        });
    } else {
        next();
    }

}


const loginValidator = (req, res, next) => {

}

module.exports = { registerValidator, loginValidator }