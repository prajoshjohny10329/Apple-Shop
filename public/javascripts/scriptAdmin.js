
// admin  view on product currentOffer



try { 
var inputField = document.getElementById("currentOffer");
inputField.addEventListener("input", function(event) {
  const currentOffer = parseInt(event.target.value)
  const  productLastPriceID = document.getElementById('productLastPrice')
  const productPrice = parseInt( document.getElementById('productPrice').value)
  const totalAmount = Math.round(productPrice -((currentOffer / 100) * productPrice)) ;
  productLastPriceID.value = totalAmount;
});
} catch (error) {
 
}



function newOfferSubmit(){
  const currentOffer = document.getElementById('currentOffer').value
  const productStockError= document.getElementById('productStock_error')

  if(currentOffer.length == 0){
    console.log('0 length');
    productStockError.innerHTML = 'Product offer is required'
    setTimeout(() => {
      productStockError.innerHTML = ''
    }, 3000);
    return false
  }
  if(currentOffer <0){
    console.log('1 less than');
    productStockError.innerHTML = ' Less than zero value is not access for product offer '
    setTimeout(() => {
      productStockError.innerHTML = ''
    }, 3000);
    return false
  }
  if(currentOffer >99){
    console.log('1 less than');
    productStockError.innerHTML = ' Greater than 99 value is not access for product offer '
    setTimeout(() => {
      productStockError.innerHTML = ''
    }, 3000);
    return false
  }

  productStockError.innerHTML = ''
  return true
  
}


// admin  view on product is RadioButton Active

try {
function isRadioActive(){
  const stockRadio = document.getElementById('stockRadio')
  const offerRadio = document.getElementById('offerRadio')
  const ProductStockDiv = document.getElementById('ProductStockDiv')
  const ProductOfferDiv = document.getElementById('ProductOfferDiv')

  if (stockRadio.checked) {
    ProductStockDiv.style.display = "block";
    ProductOfferDiv.style.display = "none";
  } 
  else if (offerRadio.checked) {
  ProductOfferDiv.style.display = "block";
    ProductStockDiv.style.display = "none";
  } 
  else {
  ProductStockDiv.style.display = "none";
    ProductOfferDiv.style.display = "none";
  }
}
} catch (error) {
  
}




//Admin add new  Category  Page -----------------/

let CategoryNameError = document.getElementById('categoryName_error')
// let submitError = document.getElementById('submitError')

function validateCategory() {
  console.log("his")
  var categoryName = document.getElementById('CategoryName').value;

  if (categoryName.length == 0) {
    CategoryNameError.innerHTML = 'category name is required';
    return false;
  }
  if (categoryName.length < 2) {
    CategoryNameError.innerHTML = 'Write full Name of the Category'
    return false;
  }
  if (!categoryName.match(/^[A-Za-z ]+$/)) {
    CategoryNameError.innerHTML = 'allows only letters';
    return false;
  }
  CategoryNameError.innerHTML = "";
  return true;
}

function validateCategorySubmit() {
  if (!validateCategory()) {
    submitError.style.display = 'block';
    submitError.innerHTML = 'please check and submit';
    setTimeout(() => {
      submitError.style.display = 'none';
    }, 3000);
    return false;
  }
  return true;
}


//Admin add new  Category  Page  ----------------- END---//

//Admin add new  Product Page ---------------------/

let productPriceError = document.getElementById('productPrice_error')
let productStockError = document.getElementById('productStock_error')
let productOfferError = document.getElementById('productOffer_error')
let productNameError = document.getElementById('productName_error')
let descriptionError = document.getElementById('productDescription_error')
let productImagesError = document.getElementById('productImages_error')
let productWarrantyError = document.getElementById('productWarranty_error')
let categorySelectError = document.getElementById('categorySelect_error')




function productNameChecker() {
  let productName = document.getElementById('productName').value;

  if (productName.length < 3) {
    productNameError.innerHTML = 'Product Name  is required';
    return false;
  }
  productNameError.innerHTML = "";
  return true;
}




let fileInput = document.getElementById('productImages');




function showProductData(){
  const dynamicShowHideDiv = document.getElementsByClassName('dynamicShowHideDiv')[0];
  dynamicShowHideDiv.style.display = "flex"
}

function productPriceChecker() {
  let productPrice = document.getElementById('productPrice').value;

  if (productPrice.length == 0) {
    productPriceError.innerHTML = 'Product price  is required';
    return false;
  }
  productPriceError.innerHTML = "";
  return true;
}

function productStockChecker() {
  let productStock = document.getElementById('productStock').value;
  console.log(productStock);
  const value = parseInt(productStock)
  if(value<1){
    productStockError.innerHTML = 'Product stock must greater than 0';
    return false;
  }

  if (productStock.length == 0) {
    productStockError.innerHTML = 'Product stock  is required';
    return false;
  }
  productStockError.innerHTML = "";
  return true;
}

function productOfferChecker() {
  let productOffer = document.getElementById('productOffer').value;
  const value = parseInt(productOffer)
  if(value<0){
    productOfferError.innerHTML = 'Product offer  is must 0 or  greater than 0';
    return false;
  }

  if (productOffer.length == 0) {
    productOfferError.innerHTML = 'Product offer  is required';
    return false;
  }
  productOfferError.innerHTML = "";
  return true;
}

function productWarrantyChecker() {
  let productWarranty = document.getElementById('productWarranty').value;
  if (productWarranty.length == 0) {
    productWarrantyError.innerHTML = 'Product offer  is required';
    return false;
  }
  productWarrantyError.innerHTML = "";
  return true;
}

function productCategoryOnchange(){
  const chooseOption = document.getElementById('productCategory').value;
  console.log('On change');
  console.log(chooseOption);
  if(chooseOption ==''){
      categorySelectError.innerHTML = 'please select a Category'
      return false
  }else{
      categorySelectError.innerHTML = ''
      return true
  }
}

// function productCategoryChecker(){
//   const ChooseOption = document.getElementById('ChooseOption').value;
//   if (ChooseOption == "") {
//     categorySelectError.innerHTML = 'Please select an Category';
//     return false;
//   }
//   categorySelectError.innerHTML = "";
//   return true;
// }

function DescriptionChecker() {
  let productDescription = document.getElementById('productDescription').value;

  if (productDescription.length == 0) {
    descriptionError.innerHTML = 'Product description is required';
    return false;
  }
  if (productDescription.length < 18) {
    descriptionError.innerHTML = 'Product description minium 18 more letters required';
    return false;
  }
  descriptionError.innerHTML = "";
  return true;
}

function validateProductImages() {
  const fileInput = document.getElementById('productImages');
  console.log(fileInput);
  const  filePath = fileInput.value;
  console.log(file);
  const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
  if (!allowedExtensions.exec(filePath)) {
      fileInput.value = '';
      productImagesError.innerHTML = 'invalid file only allowed .jpg .jpeg .png';
      return false;
  }
  if(fileInput.files.length<2){
    fileInput.value = '';
      productImagesError.innerHTML = 'only allowed one more files';
      return false;
  }
  productImagesError.innerHTML = '';
  return true
}

try {
  fileInput.addEventListener('change', (event) => {
  const images = document.getElementById('imgView');
  const imageFiles = event.target.files;
  console.log(imageFiles.length);
  images.innerHTML = '';
  if (imageFiles.length > 0) {
    // Loop through all the selected images
    for (const imageFile of imageFiles) {
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.addEventListener('load', () => {
        // Create new <img> element and add it to the DOM
        images.innerHTML += `<img class="eachimage" src='${reader.result}'>`;
      });
    }
  } else {
    images.innerHTML = '';
  }
})
  
} catch (error) {
  
}
const inputValues = []; // Array to store input field values

function addInputField() {
  const container = document.getElementById('inputContainer');
  const input = document.createElement('input');
  const inputName = 'productAllAbout'// Generate unique input name
  input.setAttribute('type', 'text');
  input.setAttribute('placeholder', 'Enter about your new Product');
  input.setAttribute('name', inputName);
  input.classList.add('form-control');
  container.appendChild(input);
  const brTag = document.createElement('br');
  container.appendChild(brTag);

}

function validateNewProductSubmit() {

  const inputs = document.querySelectorAll('#inputContainer input');

  const inputArray = [];
  inputs.forEach((input) => {
    const inputValue = input.value;
    inputArray.push(inputValue);
  });

  inputValues.push(inputArray);

  if (!productPriceChecker() || !productStockChecker() || !productOfferChecker() || !productNameChecker()
       || !DescriptionChecker() || !validateProductImages() || !productWarrantyChecker() ||!productCategoryOnchange()
       || !productCategoryOnchange()) {
    submitError.style.display = 'block';
    submitError.innerHTML = 'please check and submit';
    setTimeout(() => {
      submitError.style.display = 'none';
    }, 3000);
    return false;
  }
  return true;
}

function categorySelected() {

  console.log('category selctes');

  const productCategory = document.getElementById('productCategory').value;
  const mackDiv = document.getElementsByClassName('mackDiv')
  const mackInputFields = document.getElementsByClassName("mackInput");
  const iphoneDiv = document.getElementsByClassName('iphoneDiv')
  const iphoneInputFields = document.getElementsByClassName("iphoneInput");
  const ipadDiv = document.getElementsByClassName('ipadDiv')
  const ipadInputFields = document.getElementsByClassName("ipadInput");
  const iWatchDiv = document.getElementsByClassName('iWatchDiv')
  const iWatchInputFields = document.getElementsByClassName("iWatchInput");
  const airPodsDiv = document.getElementsByClassName('airPodsDiv')
  const airPodsInputFields = document.getElementsByClassName("airPodsInput");
  

  if (productCategory == 'MacBook') {
    for (let i = 0; i < mackInputFields.length ; i++) {
      mackInputFields[i].disabled = false;
      if (mackDiv[i]) {
        mackDiv[i].style.display = "block";
      }
    }
  }
  else {
    for (let i = 0; i < mackInputFields.length; i++) {
      mackInputFields[i].disabled = true;
      if (mackDiv[i]) {
        mackDiv[i].style.display = "none";
      }
    }

  }

  //for iphone show hidden


  if (productCategory == 'iPhone') {
    console.log(productCategory);
    for (let i = 0; i < iphoneInputFields.length; i++) {
      iphoneInputFields[i].disabled = false;
      if (iphoneDiv[i]) {
        iphoneDiv[i].style.display = "block";
      }
    }
    console.log("iphone selected");
  }
  else {
    for (let i = 0; i < iphoneInputFields.length; i++) {
      iphoneInputFields[i].disabled = true;
      if (iphoneDiv[i]) {
        iphoneDiv[i].style.display = "none";
      }
    }

  }

    //for ipad show hidden

  if (productCategory == 'iPad') {
    for (let i = 0; i < ipadInputFields.length; i++) {
      ipadInputFields[i].disabled = false;
      if (ipadDiv[i]) {
        ipadDiv[i].style.display = "block";
      }
    }
  }
  else {
    for (let i = 0; i < ipadInputFields.length; i++) {
      ipadInputFields[i].disabled = true;
      if (ipadDiv[i]) {
        ipadDiv[i].style.display = "none";
      }
    }

  }

  //for iWatch show hidden
  if (productCategory == 'Apple Watch') {
    for (let i = 0; i < iWatchInputFields.length; i++) {
      iWatchInputFields[i].disabled = false;
      if (iWatchDiv[i]) {
        iWatchDiv[i].style.display = "block";
      }
    }
  }
  else {
    for (let i = 0; i < iWatchInputFields.length; i++) {
      iWatchInputFields[i].disabled = true;
      if (iWatchDiv[i]) {
        iWatchDiv[i].style.display = "none";
      }
    }

  }
    //for AirPods show hidden

    if (productCategory == 'AirPods') {
      for (let i = 0; i < airPodsInputFields.length; i++) {
        airPodsInputFields[i].disabled = false;
        if (airPodsDiv[i]) {
          airPodsDiv[i].style.display = "block";
        }
      }
    }
    else {
      for (let i = 0; i < airPodsInputFields.length; i++) {
        airPodsInputFields[i].disabled = true;
        if (airPodsDiv[i]) {
          airPodsDiv[i].style.display = "none";
        }
      }
  
    }
}

//coupon
const couponCode_error = document.getElementById('couponCode_error')
const couponName_error = document.getElementById('couponName_error')
const couponOffer_error = document.getElementById('couponOffer_error')
const couponMaxPrice_error = document.getElementById('couponMaxPrice_error')
const couponBanner_error = document.getElementById('couponBanner_error')

function couponNameChecker(){
  const couponName = document.getElementById('couponName').value
  if(couponName.length == 0){
    couponName_error.innerHTML = 'coupon Name is required'
    return false
  }
  if(couponName.length < 5){
    couponName_error.innerHTML = 'coupon Name length must 5'
    return false
  }
  couponName_error.innerHTML = ''
  return true
}

function couponCodeChecker(){
  const couponCode = document.getElementById('couponCode').value
  if(couponCode.length == 0){
    couponCode_error.innerHTML = 'coupon Code is required'
    return false
  }
  if(couponCode.length < 8){
    couponCode_error.innerHTML = 'coupon code length should 8'
    return false
  }
  couponCode_error.innerHTML = ''
  return true
}

function couponOfferChecker() {
  const couponOffer = document.getElementById("couponOffer")
  const number = parseInt(couponOffer.value);

  if (couponOffer.value.length == 0) {
    couponOffer_error.innerHTML ='offer is required'
    return false
  }

  if (number >= 100) {
    couponOffer_error.innerHTML ='99 % more than offer is invalid'
    return false
  }
    couponOffer_error.innerHTML =''
    return true

}

function couponMaxPriceChecker() {
  const couponMaxPrice = document.getElementById("couponMaxPrice")
  const number = parseInt(couponMaxPrice.value);

  if (couponMaxPrice.value.length == 0) {
    couponMaxPrice_error.innerHTML ='offer is required'
    return false
  }

  if (number >= 10001) {
    couponMaxPrice_error.innerHTML ='10000  more than Maximum Price is invalid'
    return false
  }
    couponMaxPrice_error.innerHTML =''
    return true

}


function couponDateChecker(){
  var now = new Date();
  console.log(now);
  var formattedDate = now.toISOString().slice(0, 16);
  console.log(formattedDate);
  document.getElementById("couponExpiryDate").setAttribute("min", formattedDate);
}

function couponDateCheckerStart(){
  var now = new Date();
  console.log(now);
  var formattedDate = now.toISOString().slice(0, 16);
  console.log(formattedDate);
  document.getElementById("couponStartingDate").setAttribute("min", formattedDate);
}

function validateCouponSubmit(){
  if (!couponNameChecker() || !couponCodeChecker()|| !couponOfferChecker() || !couponMaxPriceChecker() ||!validateCouponBanner()) {
    submitError.style.display = 'block';
    submitError.innerHTML = 'please check and submit';
    setTimeout(() => {
      submitError.style.display = 'none';
    }, 3000);
    return false;
  }
  return true;

}

function generatePassword() {
  const couponCode = document.getElementById('couponCode')
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let password = '';
  const length = 8
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }
  couponCode.value = password
  console.log(password);
  return
}

function validateCouponBanner() {
  const fileInput = document.getElementById('couponBanner');
  const  filePath = fileInput.value;
  const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
  if (!allowedExtensions.exec(filePath)) {
      fileInput.value = '';
      couponBanner_error.innerHTML = 'invalid file only allowed .jpg .jpeg .png';
      return false;
  }
  couponBanner_error.innerHTML = '';
  return true
}

function couponImgViewFunction(event) {
  document.getElementById('couponImgView').src = URL.createObjectURL(event.target.files[0])
}



var el = document.getElementById("wrapper");
var toggleButton = document.getElementById("menu-toggle");

toggleButton.onclick = function () {
  el.classList.toggle("toggled");
};

function firstImageView(event) {
  document.getElementById('firstImgView').src = URL.createObjectURL(event.target.files[0])
}



window.addEventListener("load", function () {
  const loader = document.querySelector(".loader")
  loader.className += " hidden"
})



////global

try {
  setTimeout(() => {
    let errorMessage = document.getElementById("errorMessage");
    if (errorMessage) {
      errorMessage.style.display = 'none';
    }
  }, 3000);

  setTimeout(() => {
    let successMessage = document.getElementById("successMessage");
    if (successMessage) {
      successMessage.style.display = 'none';
    }
  }, 6000);

  setTimeout(() => {
    let warningMessage = document.getElementById("warningMessage");
    if (warningMessage) {
      warningMessage.style.display = 'none';
    }
  }, 3000);
} catch (err) {
  console.log("external", err);
} finally {
  console.log("external error");
}


//banner

function validateBannerImage() {

  const imageError = document.getElementById('imageError')
  let bannerImage = document.getElementById("bannerImage").value;

  // Allowing file type
  var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
  if (allowedExtensions.exec(bannerImage)) {
    imageError.innerHTML = ''
    return true
  } else {
    imageError.innerHTML = 'Invalid file type'
    return false;
  }
}

const  bannerSubmitError = document.getElementById('submitError')

function validAddBanner(){
  console.log('banner checker');
  if(!validateBannerImage()){
    bannerSubmitError.innerHTML = 'please check and submit'
    setTimeout(() => {
      bannerSubmitError.style.display = 'none';
    }, 3000);
    return false
  }
  return true
 
}

//confirm for form submit

function showConfirmForm(message,Id){
  let confirmBox = document.createElement("div")
  confirmBox.classList.add('confirmBox');

  let messageBox = document.createElement("div")
  messageBox.classList.add('messageBox');
  messageBox.textContent =message;
  confirmBox.appendChild(messageBox);

  let buttonBox = document.createElement("div")
  buttonBox.classList.add('buttonBox');
  messageBox.appendChild(buttonBox);

  let yesButton = document.createElement("button")
  yesButton.classList.add('yesButton');
  yesButton.textContent ="Yes";
  buttonBox.appendChild(yesButton);
  yesButton.addEventListener('click',yesButtonClick)

  let noButton = document.createElement("button")
  noButton.classList.add('noButton');
  noButton.textContent ="No";
  buttonBox.appendChild(noButton);
  noButton.addEventListener('click',noButtonClick)

  function yesButtonClick(){
     removeConfirmBox()
     submitForm(Id)
  }

  function noButtonClick(){
      removeConfirmBox()
  }

  function removeConfirmBox(){
      document.body.removeChild(confirmBox)
  }
  function submitForm(Id){
    console.log(Id)
    document.getElementById(Id).submit()
  }

  document.body.appendChild(confirmBox);
  return false

}


///

function aTagClick(message,href) {
  
  let confirmBox = document.createElement("div")
  confirmBox.classList.add('confirmBox');

  let messageBox = document.createElement("div")
  messageBox.classList.add('messageBox');
  messageBox.textContent =message;
  confirmBox.appendChild(messageBox);

  let buttonBox = document.createElement("div")
  buttonBox.classList.add('buttonBox');
  messageBox.appendChild(buttonBox);

  let yesButton = document.createElement("button")
  yesButton.classList.add('yesButton');
  yesButton.classList.add('mb-2');
  yesButton.textContent ="Yes";
  buttonBox.appendChild(yesButton);
  yesButton.addEventListener('click',yesButtonClick)

  let noButton = document.createElement("button")
  noButton.classList.add('noButton');

  noButton.textContent ="No";
  buttonBox.appendChild(noButton);
  noButton.addEventListener('click',noButtonClick)

  function yesButtonClick(){
     removeConfirmBox()
     window.location.href = href;
  }

  function noButtonClick(){
      removeConfirmBox()
  }

  function removeConfirmBox(){
      document.body.removeChild(confirmBox)
  }

  document.body.appendChild(confirmBox);
  return false

}

function changeImage(src){
  var singleImage = $('#singleImage'); // Use jQuery to select the element
  singleImage.attr('src', src);
}

function editImgViewFunction(event,id) {
  document.getElementById(id).src = URL.createObjectURL(event.target.files[0])
}

