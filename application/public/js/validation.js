var password = document.getElementById('password');
var conPassword = document.getElementById('conPassword');

conPassword.oninput = passCheck;

function passCheck() {
  //console.log("change even fired.....");
  var format = /[  ( / * - + ! @ # $ ^ & * .)]/;
  var uppercase = /[A-Z]/;
  var numcheck = /[0-9]/;
   console.log("PASS: ",password.value,"CON: ",conPassword.value);
  if (conPassword.value == password.value && password.value.length > 8
    && format.test(password.value) === true && numcheck.test(password.value) === true && uppercase.test(password.value) === true) {
      document.getElementById('requirments').setAttribute("class", "requirments");
      document.getElementById('passChecker').innerHTML =
      ` <p id="passChecker" class="good"> Password Valid</p>`;
    
    //document.getElementById('passChecker').setAttribute("class", "good")
    console.log(true, "PASS: ", password.value, "CON: ", conPassword.value);

    return true;

  }
  else {
    document.getElementById('requirments').setAttribute("class", "requirments");
    document.getElementById('passChecker').innerHTML =
    ` <p id="passChecker" class="not-Good"> Password Invalid</p>`;
  
    //document.getElementById('passChecker').setAttribute("class", "not-Good")
    console.log(false, "PASS: ", password.value, "CON: ", conPassword.value);
    return false;

  }
}




var uName = document.getElementById('userName');
uName.oninput = userFormat;
function userFormat() {

  let arr = Array.from(uName.value);
  // console.log(arr)
  if ((/[a-zA-Z]/).test(arr[0]) === true && arr.length >= 3) {
    document.getElementById('requirments').setAttribute("class", "requirments");
    document.getElementById('userChecker').innerHTML =
    ` <p id="userChecker" class="good"> Username Valid</p>`;
   // document.getElementById('userChecker').setAttribute("class", "good")
    return true;
  } else {
    document.getElementById('requirments').setAttribute("class", "requirments");
    document.getElementById('userChecker').innerHTML =
    ` <p id="userChecker" class="not-Good"> Username Invalid</p>`;
    //document.getElementById('userChecker').setAttribute("class", "not-Good");
    return false;
  }

}


var eMail = document.getElementById('email');
eMail.oninput = emailFormat;
function emailFormat() {
 console.log("hj from email val");
  if ((/^\S+@\S+\.\S+$/).test(eMail.value) === true ) {
    document.getElementById('requirments').setAttribute("class", "requirments");
    document.getElementById('emailChecker').innerHTML =
    ` <p id="emailChecker" class="good"> Email Valid</p>`;
  
    return true;
  } else {
    document.getElementById('requirments').setAttribute("class", "requirments");
    document.getElementById('emailChecker').innerHTML =
    ` <p id="emailChecker" class="not-Good"> Email Invalid</p>`;
   
    return false;
  }

}



var subButton = document.getElementById('subButton');


function reg() {
 // console.log("Password check:", passCheck());
 // console.log("User format is:", userFormat())
  if (userFormat() === true && passCheck() === true && emailFormat() === true ) {
    return true
  } else {
    return false;
  }
}

