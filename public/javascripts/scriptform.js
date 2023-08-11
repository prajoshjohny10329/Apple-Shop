/* ------------------- scripts for form page common ---------   */

let nameError = document.getElementById("name-error");
let emailError = document.getElementById("email-error");
let passwordError = document.getElementById("password-error");
let mobileError = document.getElementById("mobile-error");
let submitError = document.getElementById("submit-error");
let confirmPasswordError = document.getElementById("confirm-password-error");
let OTPError = document.getElementById("OTP-error");
let adminCodeError = document.getElementById("AdminCode-error");

//function for admin to check admin SID code
function validateAdminCode() {
  let adminCode = document.getElementById("inputAdminCode").value;
  let adminCodeInput = document.getElementById("inputAdminCode");

  if (adminCode.length == 0) {
    adminCodeError.innerHTML = "Admin Code Should required";
    return false;
  }
  if (!adminCode.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)) {
    adminCodeError.innerHTML = "must contain number, uppercase and lowercase ";
    return false;
  }
  adminCodeInput.style.border = "3px solid lime";
  adminCodeError.innerHTML = "";
  return true;
}

//function for check OTP
function validateOTP() {
  let OTP = document.getElementById("inputOTP").value;
  let otpInput = document.getElementById("inputOTP");
  if (OTP.length !== 6) {
    OTPError.innerHTML = "OTP should be 6 digits";
    return false;
  }
  if (!OTP.match(/^[0-9]{6}$/)) {
    OTPError.innerHTML = "OTP should be  Numbers";
    return false;
  }
  otpInput.style.border = "3px solid lime";
  OTPError.innerHTML = "";
  return true;
}

//function for check confirm password
function validateConfirm() {
  let password = document.getElementById("inputPassword").value;
  let confirmPassword = document.getElementById("inputConfirmPassword").value;
  let confirmInput = document.getElementById("inputConfirmPassword");

  if (confirmPassword.length == 0) {
    confirmPasswordError.innerHTML = "confirm password require";
    return false;
  }
  if (password != confirmPassword) {
    confirmPasswordError.innerHTML = "password not matched";
    return false;
  }
  confirmInput.style.border = "3px solid lime";
  confirmPasswordError.innerHTML = "";
  return true;
}

//function for check account name
function validateName() {
  let name = document.getElementById("inputName").value;
  let nameInput = document.getElementById("inputName");

  if (name.length == 0) {
    nameError.innerHTML = "Name is required";
    return false;
  }
  if (name.length < 5) {
    nameError.innerHTML = "Write full name";
    return false;
  }
  if (!name.match(/^[A-Za-z\s]+$/)) {
    nameError.innerHTML = "Write full name";
    return false;
  }
  nameInput.style.border = "3px solid lime";
  nameError.innerHTML = "";
  return true;
}

//function for check email
function validateEmail() {
  let email = document.getElementById("inputEmail").value;
  let emailInput = document.getElementById("inputEmail");
  if (email.length == 0) {
    emailError.innerHTML = "Email is required";
    return false;
  }
  if (email.length < 14) {
    emailError.innerHTML = "Email is invalid";
    return false;
  }
  if (
    !email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  ) {
    emailError.innerHTML = "Email is not valid";
    return false;
  }
  emailInput.style.border = "3px solid lime";
  emailError.innerHTML = "";
  return true;
}

//function for check password
function validatePassword() {
  let password = document.getElementById("inputPassword").value;
  let passwordInput = document.getElementById("inputPassword");

  if (password.length == 0 || password.length < 8) {
    passwordError.innerHTML = "password require";
    return false;
  }
  if (!password.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)) {
    passwordError.innerHTML = "must contain number, uppercase and lowercase ";
    return false;
  }
  passwordInput.style.border = "3px solid lime";
  passwordError.innerHTML = "";
  return true;
}

//function for check login password
function validateLoginPassword() {
  let password = document.getElementById("inputPassword").value;
  let passwordInput = document.getElementById("inputPassword");

  if (password.length == 0 || password.length < 8) {
    passwordError.innerHTML = "password require";
    return false;
  }
  if (!password.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)) {
    passwordError.innerHTML = "invalid Password";
    return false;
  }
  passwordInput.style.border = "3px solid lime";
  passwordError.innerHTML = "";
  return true;
}

//function for check mobile number
function validateMobile() {
  let mobile = document.getElementById("inputMobile").value;
  let mobileInput = document.getElementById("inputMobile");

  if (mobile.length == 0) {
    mobileError.innerHTML = "Mobile no is required";
    return false;
  }
  if (mobile.length !== 10) {
    mobileError.innerHTML = "Mobile No should be 10 digits";
    return false;
  }
  if (!mobile.match(/^[0-9]{10}$/)) {
    mobileError.innerHTML = "Mobile No is not valid";
    return false;
  }
  mobileInput.style.border = "3px solid lime";
  mobileError.innerHTML = "";
  return true;
}

//function for admin to create new profile check SID
function validateAdminSID() {
  let adminSID = document.getElementById("inputAdminCode").value;
  let adminSIDinput = document.getElementById("inputAdminCode");

  if (adminSID.length == 0) {
    adminCodeError.innerHTML = "Admin SID is required ";
    return false;
  }
  if (adminSID.length < 7) {
    adminCodeError.innerHTML = "Admin SID is not valid";
    return false;
  }

  adminSIDinput.style.border = "3px solid lime";
  adminCodeError.innerHTML = "";
  return true;
}

//function for user to create new account
function validateSubmit() {
  if (
    !validateName() ||
    !validateEmail() ||
    !validateMobile() ||
    !validatePassword() ||
    !validateConfirm()
  ) {
    submitError.style.display = "block";
    submitError.innerHTML = "please check and submit";
    setTimeout(() => {
      submitError.style.display = "none";
    }, 3000);
    return false;
  }
  return true;
}

//function for admin to create new account
function validateSubmitAdmin() {
  if (
    !validateName() ||
    !validateEmail() ||
    !validateMobile() ||
    !validatePassword() ||
    !validateAdminSID() ||
    !validateConfirm()
  ) {
    submitError.style.display = "block";
    submitError.innerHTML = "please check and submit";
    setTimeout(() => {
      submitError.style.display = "none";
    }, 3000);
    return false;
  }
  return true;
}

//function for login submit
function validateLoginSubmit() {
  if (!validateEmail() || !validateLoginPassword()) {
    submitError.style.display = "block";
    submitError.innerHTML = "please check and submit";
    setTimeout(() => {
      submitError.style.display = "none";
    }, 3000);
    return false;
  }
  return true;
}

//function for submit OTP
function validateSubmit_OTP() {
  if (!validateOTP()) {
    submitError.style.display = "block";
    submitError.innerHTML = "please check and submit";
    setTimeout(() => {
      submitError.style.display = "none";
    }, 3000);
    return false;
  }
  return true;
}

//function for user forgot OTP
function validateForgot1() {
  if (!validateMobile()) {
    submitError.style.display = "block";
    submitError.innerHTML = "please check and submit";
    setTimeout(() => {
      submitError.style.display = "none";
    }, 3000);
    return false;
  }
  return true;
}

//function for user forgot OTP 3
function validateForgot3() {
  if (!validatePassword() || !validateConfirm()) {
    submitError.style.display = "block";
    submitError.innerHTML = "please check and submit";
    setTimeout(() => {
      submitError.style.display = "none";
    }, 3000);
    return false;
  }
  return true;
}

//function for user login with OTP
function validateLoginWithOtp1() {
  if (!validateMobile()) {
    submitError.style.display = "block";
    submitError.innerHTML = "please check and submit";
    setTimeout(() => {
      submitError.style.display = "none";
    }, 3000);
    return false;
  }
  return true;
}

//function for admin login with OTP
function validateAdminForgot() {
  if (!validateEmail()) {
    submitError.style.display = "block";
    submitError.innerHTML = "please check and submit";
    setTimeout(() => {
      submitError.style.display = "none";
    }, 3000);
    return false;
  }
  return true;
}

// function for time count
function startTimer() {
  const otpExpiryTime = 55;
  let seconds = otpExpiryTime;
  document.getElementById("timer").innerText = formatTime(seconds);
  const timerInterval = setInterval(() => {
    seconds--;
    document.getElementById("timer").innerText = formatTime(seconds);

    if (seconds === 0) {
      clearInterval(timerInterval);
      document.getElementById("timer").style.display = "none";
      document.getElementById("resendOtp").style.display = "block";
    }
    if (seconds <= 20) {
      document.getElementById("timer").style.color = "#e2ff08";
    }
    if (seconds <= 10) {
      document.getElementById("timer").style.color = "#ffc108";
    }
    if (seconds <= 3) {
      document.getElementById("timer").style.color = "#ff0808";
    }
  }, 1000);

  //function for startTimer function
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  }
}

/* ------------------- scripts for common form pages---------   */

//listener for form pages loader
window.addEventListener("load", function () {
  const loader = document.querySelector(".loader");
  loader.className += " hidden";
});

//common page messages
try {
  setTimeout(() => {
    document.getElementById("errorMessage").style.display = "none";
  }, 3000);

  setTimeout(() => {
    document.getElementById("successMessage").style.display = "none";
  }, 6000);

  setTimeout(() => {
    document.getElementById("warningMessage").style.display = "none";
  }, 5000);
} catch (error) {
  console.log("set time out error");
}
