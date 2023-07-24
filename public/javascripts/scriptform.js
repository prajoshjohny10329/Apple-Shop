var nameError = document.getElementById('name-error')
var emailError = document.getElementById('email-error')
var passwordError = document.getElementById('password-error')
var mobileError = document.getElementById('mobile-error')
var submitError = document.getElementById('submit-error')
var confirmPasswordError =document.getElementById('confirmpassword-error')
var OTPError = document.getElementById('OTP-error');
var adminCodeError = document.getElementById('AdminCode-error')




function  validateAdminSubmit(){
  if( !validateName() ||!validateEmail()||!validateMobile()||!validatePassword()||!validateConfirm()||!validateAdminCode()){
    submitError.style.display ='block';
    submitError.innerHTML = 'please cheack and submit';
    setTimeout(() => {
      submitError.style.display ='none';
    }, 3000);
    return false;
  }
  return true;
}


function validateAdminCode(){
  let adminCode = document.getElementById('inputAdminCode').value;
  let adminCodeInput = document.getElementById('inputAdminCode')

  if(adminCode.length == 0 ){
    adminCodeError.innerHTML = 'Admin Code Should required'
    return false;
  }
  if(!adminCode.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)){
    adminCodeError.innerHTML = 'must contain number, uppercase and lowercase ';
    return false;
  }
  adminCodeInput.style.border = "3px solid lime";
  adminCodeError.innerHTML = "";
  return true;
  
}

function validateOTP(){
  let OTP = document.getElementById('inputOTP').value;
  let otpInput = document.getElementById('inputOTP')
  if(OTP.length !==6){
    OTPError.innerHTML = 'OTP should be 6 digits'
    return false;
  }

  if(!OTP.match(/^[0-9]{6}$/)){
    OTPError.innerHTML = 'OTP should be  Numbers';
    return false;
  }
  otpInput.style.border = "3px solid lime";
  OTPError.innerHTML = "";
  return true;

}



function validateConfirm(){
  let password = document.getElementById('inputPassword').value;
  let confirmPassword = document.getElementById('inputconfirmPassword').value;
  let confirmInput = document.getElementById('inputconfirmPassword')

  if(confirmPassword.length ==0 ){
    confirmPasswordError.innerHTML = 'confirm pasword require';
    return false;
  }
  if(password != confirmPassword){
    confirmPasswordError.innerHTML = 'password not matched'
    return false;
  }
  confirmInput.style.border = "3px solid lime";
  confirmPasswordError.innerHTML = "";
  return true;

}

function validateName(){

  let name = document.getElementById('inputName').value;
  let nameInput = document.getElementById('inputName')

  if(name.length == 0){
    nameError.innerHTML = 'Name is required';
    return false;
  }
  if(name.length < 5){
    nameError.innerHTML = 'Write full name';
    return false;
  }
  if(!name.match(/^[A-Za-z\s]+$/)){
    nameError.innerHTML = 'Write full name';
    return false;
  }
  nameInput.style.border = "3px solid lime";
  nameError.innerHTML = "";
  return true;
}

function validateEmail(){

  let email = document.getElementById('inputEmail').value;
  let emailInput = document.getElementById('inputEmail')
  if(email.length == 0 ){
    emailError.innerHTML = 'Email is required';
    return false;
  }
  if(email.length <14){
    emailError.innerHTML = 'Email is invalid';
    return false;
  }
  if(!email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
    emailError.innerHTML = 'Email is not valid';
    return false;
  }
  emailInput.style.border = "3px solid lime";
  emailError.innerHTML = "";
  return true;

  
}


function validatePassword(){

  let password = document.getElementById('inputPassword').value;
  let passwordInput = document.getElementById('inputPassword')

  if(password.length ==0 || password.length <8){
    passwordError.innerHTML = 'password require';
    return false;
  }
  if(!password.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)){
    passwordError.innerHTML = 'must contain number, uppercase and lowercase ';
    return false;
  }
  passwordInput.style.border = "3px solid lime";
  passwordError.innerHTML = "";
  return true;
  
}

function validateLoginPassword(){

  let password = document.getElementById('inputPassword').value;
  let passwordInput = document.getElementById('inputPassword')

  if(password.length ==0 || password.length <8){
    passwordError.innerHTML = 'password require';
    return false;
  }
  if(!password.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)){
    passwordError.innerHTML = 'invalid Password';
    return false;
  }
  passwordInput.style.border = "3px solid lime";
  passwordError.innerHTML = "";
  return true;
  
}

function validateMobile(){
  
  let mobile = document.getElementById('inputMobile').value;
  let mobileInput = document.getElementById('inputMobile')


  if(mobile.length ==0){
    mobileError.innerHTML = 'Mobile no is required';
    return false;
  }
  if(mobile.length !==10){
    mobileError.innerHTML = 'Mobile No should be 10 digits';
    return false;
  }
  if(!mobile.match(/^[0-9]{10}$/)){
    mobileError.innerHTML = 'Mobile No is not valid';
    return false;
  }
  mobileInput.style.border = "3px solid lime";
  mobileError.innerHTML = "";
  return true; 
}

function  validateSubmit(){
  if( !validateName() ||!validateEmail()||!validateMobile()||!validatePassword()||!validateConfirm()){
    submitError.style.display ='block';
    submitError.innerHTML = 'please cheack and submit';
    setTimeout(() => {
      submitError.style.display ='none';
    }, 3000);
    return false;
  }
  return true;
}
function  validateLoginSubmit(){
  if( !validateEmail()||!validateLoginPassword()){
    submitError.style.display ='block';
    submitError.innerHTML = 'please cheack and submit';
    setTimeout(() => {
      submitError.style.display ='none';
    }, 3000);
    return false;
  }
  return true;
}
function validateSubmit_OTP(){
    if( !validateOTP()){
      submitError.style.display ='block';
      submitError.innerHTML = 'please cheack and submit';
      setTimeout(() => {
        submitError.style.display ='none';
      }, 3000);
      return false;
    }
    return true;
}

function validateForgot1(){

  if(!validateMobile()){
    submitError.style.display ='block';
    submitError.innerHTML = 'please cheack and submit';
    setTimeout(() => {
      submitError.style.display ='none';
    }, 3000);
    return false;
  }
  return true;
}

function validateforgot3(){

  if( !validatePassword()||!validateConfirm()){
    submitError.style.display ='block';
    submitError.innerHTML = 'please cheack and submit';
    setTimeout(() => {
      submitError.style.display ='none';
    }, 3000);
    return false;
  }
  return true;
}
function validateLoginwithOtp1(){
  if( !validateMobile()){
    submitError.style.display ='block';
    submitError.innerHTML = 'please cheack and submit';
    setTimeout(() => {
      submitError.style.display ='none';
    }, 3000);
    return false;
  }
  return true;
}

function validateAdminforgot(){

  if( !validateEmail()){
    submitError.style.display ='block';
    submitError.innerHTML = 'please cheack and submit';
    setTimeout(() => {
      submitError.style.display ='none';
    }, 3000);
    return false;
  }
  return true;
}


try {
setTimeout(() => { document.getElementById("errorMessage").style.display ='none' }, 3000)

setTimeout(() => { document.getElementById("successMessage").style.display ='none' }, 6000)

setTimeout(() => { document.getElementById("warningMessage").style.display ='none' }, 5000)
} catch (error) {
  console.log('set time out error');
}


window.addEventListener("load",function(){
  const loader = document.querySelector(".loader")
  loader.className += " hidden"
})


//  script for button disabled


