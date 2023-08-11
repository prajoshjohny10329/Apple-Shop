/* ---------------------------------- scripts for admin pages ---------------------------------- */


/* -------------------scripts for admin view single product ---------   */

//listener for admin single product total amount
try {
  let inputField = document.getElementById("currentOffer");
  inputField.addEventListener("input", function (event) {
    const currentOffer = parseInt(event.target.value);
    const productLastPriceID = document.getElementById("productLastPrice");
    const productPrice = parseInt(
      document.getElementById("productPrice").value
    );
    const totalAmount = Math.round(
      productPrice - (currentOffer / 100) * productPrice
    );
    productLastPriceID.value = totalAmount;
  });
} catch (error) {}


//function for admin change image on click
function changeImage(src) {
  let singleImage = $("#singleImage");
  singleImage.attr("src", src);
}

//function for admin to product new offer submit
function newOfferSubmit() {
  const currentOffer = document.getElementById("currentOffer").value;
  const productStockError = document.getElementById("productStock_error");
  
  if (currentOffer.length == 0) {
    productStockError.innerHTML = "Product offer is required";
    setTimeout(() => {
      productStockError.innerHTML = "";
    }, 3000);
    return false;
  }
  if (currentOffer < 0) {
    productStockError.innerHTML =
      " Less than zero value is not access for product offer ";
    setTimeout(() => {
      productStockError.innerHTML = "";
    }, 3000);
    return false;
  }
  if (currentOffer > 99) {
    productStockError.innerHTML =
      " Greater than 99 value is not access for product offer ";
    setTimeout(() => {
      productStockError.innerHTML = "";
    }, 3000);
    return false;
  }
  productStockError.innerHTML = "";
  return true;
}

//function for admin view single product to check radio active
try {
  function isRadioActive() {
    const stockRadio = document.getElementById("stockRadio");
    const offerRadio = document.getElementById("offerRadio");
    const ProductStockDiv = document.getElementById("ProductStockDiv");
    const ProductOfferDiv = document.getElementById("ProductOfferDiv");

    if (stockRadio.checked) {
      ProductStockDiv.style.display = "block";
      ProductOfferDiv.style.display = "none";
    } else if (offerRadio.checked) {
      ProductOfferDiv.style.display = "block";
      ProductStockDiv.style.display = "none";
    } else {
      ProductStockDiv.style.display = "none";
      ProductOfferDiv.style.display = "none";
    }
  }
} catch (error) {}

/* ------------------- scripts for admin add new category ---------   */

let CategoryNameError = document.getElementById("categoryName_error");

//function for admin to check category name
function validateCategory() {
  let categoryName = document.getElementById("CategoryName").value;

  if (categoryName.length == 0) {
    CategoryNameError.innerHTML = "category name is required";
    return false;
  }
  if (categoryName.length < 2) {
    CategoryNameError.innerHTML = "Write full Name of the Category";
    return false;
  }
  if (!categoryName.match(/^[A-Za-z ]+$/)) {
    CategoryNameError.innerHTML = "allows only letters";
    return false;
  }
  CategoryNameError.innerHTML = "";
  return true;
}

//function for admin to submit add new category
function validateCategorySubmit() {
  if (!validateCategory()) {
    submitError.style.display = "block";
    submitError.innerHTML = "please check and submit";
    setTimeout(() => {
      submitError.style.display = "none";
    }, 3000);
    return false;
  }
  return true;
}

/* ------------------- scripts for admin add new product ---------   */

let productPriceError = document.getElementById("productPrice_error");
let productStockError = document.getElementById("productStock_error");
let productOfferError = document.getElementById("productOffer_error");
let productNameError = document.getElementById("productName_error");
let descriptionError = document.getElementById("productDescription_error");
let productImageError = document.getElementById("productImageError")
let productImagesError = document.getElementById("productImages_error");
let productWarrantyError = document.getElementById("productWarranty_error");
let categorySelectError = document.getElementById("categorySelect_error");
let fileInput = document.getElementById("productImages");
const inputValues = [];

//function for admin add new product to check product name
function productNameChecker() {
  let productName = document.getElementById("productName").value;

  if (productName.length < 3) {
    productNameError.innerHTML = "Product Name  is required";
    return false;
  }
  productNameError.innerHTML = "";
  return true;
}

//function for admin add new product to show details about based on category
function showProductData() {
  const dynamicShowHideDiv =
    document.getElementsByClassName("dynamicShowHideDiv")[0];
  dynamicShowHideDiv.style.display = "flex";
}

//function for admin add new product to check product price
function productPriceChecker() {
  let productPrice = document.getElementById("productPrice").value;
  const value = parseInt(productPrice);
  if (productPrice.length == 0) {
    productPriceError.innerHTML = "Product price  is required";
    return false;
  }
  if (value < 1) {
    productPriceError.innerHTML = "Product price must greater than 0";
    return false;
  }
  if (value > 99999999999) {
    productPriceError.innerHTML = "Product price must less than 99999999999";
    return false;
  }
  productPriceError.innerHTML = "";
  return true;
}

//function for admin add new product to check product stock
function productStockChecker() {
  let productStock = document.getElementById("productStock").value;
  const value = parseInt(productStock);
  if (value < 1) {
    productStockError.innerHTML = "Product stock must greater than 0";
    return false;
  }
  if (productStock.length == 0) {
    productStockError.innerHTML = "Product stock  is required";
    return false;
  }
  productStockError.innerHTML = "";
  return true;
}

//function for admin add new product to check product offer
function productOfferChecker() {
  let productOffer = document.getElementById("productOffer").value;
  const value = parseInt(productOffer);
  if (value < 0) {
    productOfferError.innerHTML = "Product offer  is must 0 or greater than 0";
    return false;
  }
  if (value > 99) {
    productOfferError.innerHTML = "Product offer  is must 0 to 99";
    return false;
  }
  if (productOffer.length == 0) {
    productOfferError.innerHTML = "Product offer  is required";
    return false;
  }
  
  productOfferError.innerHTML = "";
  return true;
}

//function for admin add new product to check product Warranty
function productWarrantyChecker() {
  let productWarranty = document.getElementById("productWarranty").value;
  const value = parseInt(productWarranty);
  if (productWarranty.length == 0) {
    productWarrantyError.innerHTML = "Product Warranty  is required";
    return false;
  }
  if (value < 0) {
    productWarrantyError.innerHTML = "Product Warranty is must 0 or  greater than 0";
    return false;
  }
  if (value > 100) {
    productWarrantyError.innerHTML = "Product Warranty limit is 100 months";
    return false;
  }
  productWarrantyError.innerHTML = "";
  return true;
}

//function for admin add new product to show filed based on category change
function productCategoryOnchange() {
  let chooseOption = document.getElementById("productCategory").value;
  if (chooseOption == "") {
    categorySelectError.innerHTML = "please select a Category";
    return false;
  } else {
    categorySelectError.innerHTML = "";
    return true;
  }
}

//function for admin add new product to check product description
function DescriptionChecker() {
  let productDescription = document.getElementById("productDescription").value;

  if (productDescription.length == 0) {
    descriptionError.innerHTML = "Product description is required";
    return false;
  }
  if (productDescription.length < 18) {
    descriptionError.innerHTML =
      "Product description minium 18 more letters required";
    return false;
  }
  descriptionError.innerHTML = "";
  return true;
}

//function for admin add new product to check product first Image
function validateProductImage() {
  const fileInput = document.getElementById("productFirstImage");
  const filePath = fileInput.value;
  const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;

  if (fileInput.files.length == 0) {
    fileInput.value = "";
    productImageError.innerHTML = "product first image is required";
    return false;
  }
  if (!allowedExtensions.exec(filePath)) {
    fileInput.value = "";
    productImageError.innerHTML = "invalid file only allowed .jpg .jpeg .png";
    return false;
  }

  productImageError.innerHTML = "";
  return true;
}

//function for admin add new product to check product Images
function validateProductImages() {
  const fileInput = document.getElementById("productImages");
  const filePath = fileInput.value;
  const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;

  if (fileInput.files.length == 0) {
    fileInput.value = "";
    productImagesError.innerHTML = "product images required";
    return false;
  }
  if (fileInput.files.length < 2) {
    fileInput.value = "";
    productImagesError.innerHTML = "minimum two product images is required";
    return false;
  }
  if (!allowedExtensions.exec(filePath)) {
    fileInput.value = "";
    productImagesError.innerHTML = "invalid file only allowed .jpg .jpeg .png";
    return false;
  }

  productImagesError.innerHTML = "";
  return true;
}

//add Event listener for admin add new product to check product first Image change
try {
  fileInput.addEventListener("change", (event) => {
    const images = document.getElementById("imgView");
    const imageFiles = event.target.files;
    images.innerHTML = "";
    if (imageFiles.length > 0) {
      // Loop through all the selected images
      for (const imageFile of imageFiles) {
        const reader = new FileReader();
        reader.readAsDataURL(imageFile);
        reader.addEventListener("load", () => {
          // Create new <img> element and add it to the DOM
          images.innerHTML += `<img class="eachImage" src='${reader.result}'>`;
        });
      }
    } else {
      images.innerHTML = "";
    }
  });
} catch (error) {}

//function for admin add new product to create new field for know more
function addInputField() {
  const container = document.getElementById("inputContainer");
  const input = document.createElement("input");
  const inputName = "productAllAbout"; // Generate unique input name
  input.setAttribute("type", "text");
  input.setAttribute("placeholder", "Enter about your new Product");
  input.setAttribute("name", inputName);
  input.classList.add("form-control");
  container.appendChild(input);
  const brTag = document.createElement("br");
  container.appendChild(brTag);
}

//function for admin add new product to check submit
function validateNewProductSubmit() {
  const inputs = document.querySelectorAll("#inputContainer input");
  const inputArray = [];
  inputs.forEach((input) => {
    const inputValue = input.value;
    inputArray.push(inputValue);
  });
  inputValues.push(inputArray);
  if (
    !productNameChecker() ||
    !productCategoryOnchange() ||
    !productPriceChecker() ||
    !productStockChecker() ||
    !productOfferChecker() ||
    !productWarrantyChecker() || 
    !DescriptionChecker() ||
    !validateProductImage() ||
    !validateProductImages() 
    
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

//function for admin add new product to check submit
function validateEditProductSubmit() {
  try {
    const inputs = document.querySelectorAll("#inputContainer input");
    const inputArray = [];
    inputs.forEach((input) => {
      const inputValue = input.value;
      inputArray.push(inputValue);
    });
    inputValues.push(inputArray);
    if (
      !productNameChecker() ||
      !productPriceChecker() ||
      !productStockChecker() ||
      !productOfferChecker() ||
      !productWarrantyChecker() || 
      !DescriptionChecker() ||
      !validateProductImage() ||
      !validateProductImages() 
      
    ) {
      submitError.style.display = "block";
      submitError.innerHTML = "please check and submit";
      setTimeout(() => {
        submitError.style.display = "none";
      }, 3000);
      return false;
    }
    return true;
  } catch (error) {
    console.log('edit product execption');
  }
}

//function for admin add new product to change data based on category change
function categorySelected() {
  const productCategory = document.getElementById("productCategory").value;
  const mackDiv = document.getElementsByClassName("mackDiv");
  const mackInputFields = document.getElementsByClassName("mackInput");
  const iphoneDiv = document.getElementsByClassName("iphoneDiv");
  const iphoneInputFields = document.getElementsByClassName("iphoneInput");
  const ipadDiv = document.getElementsByClassName("ipadDiv");
  const ipadInputFields = document.getElementsByClassName("ipadInput");
  const iWatchDiv = document.getElementsByClassName("iWatchDiv");
  const iWatchInputFields = document.getElementsByClassName("iWatchInput");
  const airPodsDiv = document.getElementsByClassName("airPodsDiv");
  const airPodsInputFields = document.getElementsByClassName("airPodsInput");

  //if macBook
  if (productCategory == "MacBook") {
    for (let i = 0; i < mackInputFields.length; i++) {
      mackInputFields[i].disabled = false;
      if (mackDiv[i]) {
        mackDiv[i].style.display = "block";
      }
    }
  } else {
    for (let i = 0; i < mackInputFields.length; i++) {
      mackInputFields[i].disabled = true;
      if (mackDiv[i]) {
        mackDiv[i].style.display = "none";
      }
    }
  }

  //if iPhone
  if (productCategory == "iPhone") {
    for (let i = 0; i < iphoneInputFields.length; i++) {
      iphoneInputFields[i].disabled = false;
      if (iphoneDiv[i]) {
        iphoneDiv[i].style.display = "block";
      }
    }
  } else {
    for (let i = 0; i < iphoneInputFields.length; i++) {
      iphoneInputFields[i].disabled = true;
      if (iphoneDiv[i]) {
        iphoneDiv[i].style.display = "none";
      }
    }
  }

  //if ipad
  if (productCategory == "iPad") {
    for (let i = 0; i < ipadInputFields.length; i++) {
      ipadInputFields[i].disabled = false;
      if (ipadDiv[i]) {
        ipadDiv[i].style.display = "block";
      }
    }
  } else {
    for (let i = 0; i < ipadInputFields.length; i++) {
      ipadInputFields[i].disabled = true;
      if (ipadDiv[i]) {
        ipadDiv[i].style.display = "none";
      }
    }
  }

  //if Apple Watch
  if (productCategory == "Apple Watch") {
    for (let i = 0; i < iWatchInputFields.length; i++) {
      iWatchInputFields[i].disabled = false;
      if (iWatchDiv[i]) {
        iWatchDiv[i].style.display = "block";
      }
    }
  } else {
    for (let i = 0; i < iWatchInputFields.length; i++) {
      iWatchInputFields[i].disabled = true;
      if (iWatchDiv[i]) {
        iWatchDiv[i].style.display = "none";
      }
    }
  }
  //if AirPods
  if (productCategory == "AirPods") {
    for (let i = 0; i < airPodsInputFields.length; i++) {
      airPodsInputFields[i].disabled = false;
      if (airPodsDiv[i]) {
        airPodsDiv[i].style.display = "block";
      }
    }
  } else {
    for (let i = 0; i < airPodsInputFields.length; i++) {
      airPodsInputFields[i].disabled = true;
      if (airPodsDiv[i]) {
        airPodsDiv[i].style.display = "none";
      }
    }
  }
}

/* ------------------- scripts for admin add new coupon ---------   */

const couponCode_error = document.getElementById("couponCode_error");
const couponName_error = document.getElementById("couponName_error");
const couponOffer_error = document.getElementById("couponOffer_error");
const couponMaxPrice_error = document.getElementById("couponMaxPrice_error");
const couponBanner_error = document.getElementById("couponBanner_error");

//function for admin to check coupon name
function couponNameChecker() {
  const couponName = document.getElementById("couponName").value;
  if (couponName.length == 0) {
    couponName_error.innerHTML = "coupon Name is required";
    return false;
  }
  if (couponName.length < 5) {
    couponName_error.innerHTML = "coupon Name length must 5";
    return false;
  }
  couponName_error.innerHTML = "";
  return true;
}

//function for admin to check coupon code
function couponCodeChecker() {
  const couponCode = document.getElementById("couponCode").value;
  if (couponCode.length == 0) {
    couponCode_error.innerHTML = "coupon Code is required";
    return false;
  }
  if (couponCode.length < 8) {
    couponCode_error.innerHTML = "coupon code length should 8";
    return false;
  }
  couponCode_error.innerHTML = "";
  return true;
}

//function for admin to check coupon offer
function couponOfferChecker() {
  const couponOffer = document.getElementById("couponOffer");
  const number = parseInt(couponOffer.value);

  if (couponOffer.value.length == 0) {
    couponOffer_error.innerHTML = "offer is required";
    return false;
  }
  if (number >= 100) {
    couponOffer_error.innerHTML = "99 % more than offer is invalid";
    return false;
  }
  couponOffer_error.innerHTML = "";
  return true;
}

//function for admin to check coupon maximum price
function couponMaxPriceChecker() {
  const couponMaxPrice = document.getElementById("couponMaxPrice");
  const number = parseInt(couponMaxPrice.value);

  if (couponMaxPrice.value.length == 0) {
    couponMaxPrice_error.innerHTML = "offer is required";
    return false;
  }
  if (number >= 10001) {
    couponMaxPrice_error.innerHTML =
      "10000  more than Maximum Price is invalid";
    return false;
  }
  couponMaxPrice_error.innerHTML = "";
  return true;
}

//function for admin to check coupon expiry date
function couponDateChecker() {
  let now = new Date();
  let formattedDate = now.toISOString().slice(0, 16);
  document
    .getElementById("couponExpiryDate")
    .setAttribute("min", formattedDate);
}

//function for admin to check coupon start date
function couponDateCheckerStart() {
  let now = new Date();
  let formattedDate = now.toISOString().slice(0, 16);
  document
    .getElementById("couponStartingDate")
    .setAttribute("min", formattedDate);
}

//function for admin to create coupon code
function generatePassword() {
  const couponCode = document.getElementById("couponCode");
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let password = "";
  const length = 8;
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }
  couponCode.value = password;
  return;
}

//function for admin to validate coupon banner image
function validateCouponBanner() {
  const fileInput = document.getElementById("couponBanner");
  const filePath = fileInput.value;
  const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
  if (!allowedExtensions.exec(filePath)) {
    fileInput.value = "";
    couponBanner_error.innerHTML = "invalid file only allowed .jpg .jpeg .png";
    return false;
  }
  couponBanner_error.innerHTML = "";
  return true;
}

//function for admin to update coupon banner image
function couponImgViewFunction(event) {
  document.getElementById("couponImgView").src = URL.createObjectURL(
    event.target.files[0]
  );
}

//function for admin to check coupon submit
function validateCouponSubmit() {
  if (
    !couponNameChecker() ||
    !couponCodeChecker() ||
    !couponOfferChecker() ||
    !couponMaxPriceChecker() ||
    !validateCouponBanner()
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

/* ------------------- scripts for admin add new banner ---------   */

const bannerSubmitError = document.getElementById("submitError");

//function for admin to update banner image
function firstImageView(event) {
  document.getElementById("firstImgView").src = URL.createObjectURL(
    event.target.files[0]
  );
}

//function for admin to validate banner image
function validateBannerImage() {
  const imageError = document.getElementById("imageError");
  let bannerImage = document.getElementById("bannerImage").value;
  let allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
  if (allowedExtensions.exec(bannerImage)) {
    imageError.innerHTML = "";
    return true;
  } else {
    imageError.innerHTML = "Invalid file type";
    return false;
  }
}

//function for admin to submit add new banner
function validAddBanner() {
  if (!validateBannerImage()) {
    bannerSubmitError.innerHTML = "please check and submit";
    setTimeout(() => {
      bannerSubmitError.style.display = "none";
    }, 3000);
    return false;
  }
  return true;
}

//function for admin to show confirm box
function showConfirmForm(message, Id) {
  let confirmBox = document.createElement("div");
  confirmBox.classList.add("confirmBox");

  let messageBox = document.createElement("div");
  messageBox.classList.add("messageBox");
  messageBox.textContent = message;
  confirmBox.appendChild(messageBox);

  let buttonBox = document.createElement("div");
  buttonBox.classList.add("buttonBox");
  messageBox.appendChild(buttonBox);

  let yesButton = document.createElement("button");
  yesButton.classList.add("yesButton");
  yesButton.textContent = "Yes";
  buttonBox.appendChild(yesButton);
  yesButton.addEventListener("click", yesButtonClick);

  let noButton = document.createElement("button");
  noButton.classList.add("noButton");
  noButton.textContent = "No";
  buttonBox.appendChild(noButton);
  noButton.addEventListener("click", noButtonClick);

  function yesButtonClick() {
    removeConfirmBox();
    submitForm(Id);
  }

  function noButtonClick() {
    removeConfirmBox();
  }

  function removeConfirmBox() {
    document.body.removeChild(confirmBox);
  }
  function submitForm(Id) {
    console.log(Id);
    document.getElementById(Id).submit();
  }

  document.body.appendChild(confirmBox);
  return false;
}
/* ------------------- scripts for admin show confirm box---------   */

//function for admin to click confirm box
function aTagClick(message, href) {
  let confirmBox = document.createElement("div");
  confirmBox.classList.add("confirmBox");

  let messageBox = document.createElement("div");
  messageBox.classList.add("messageBox");
  messageBox.textContent = message;
  confirmBox.appendChild(messageBox);

  let buttonBox = document.createElement("div");
  buttonBox.classList.add("buttonBox");
  messageBox.appendChild(buttonBox);

  let yesButton = document.createElement("button");
  yesButton.classList.add("yesButton");
  yesButton.classList.add("mb-2");
  yesButton.textContent = "Yes";
  buttonBox.appendChild(yesButton);
  yesButton.addEventListener("click", yesButtonClick);

  let noButton = document.createElement("button");
  noButton.classList.add("noButton");

  noButton.textContent = "No";
  buttonBox.appendChild(noButton);
  noButton.addEventListener("click", noButtonClick);

  function yesButtonClick() {
    removeConfirmBox();
    window.location.href = href;
  }

  function noButtonClick() {
    removeConfirmBox();
  }

  function removeConfirmBox() {
    document.body.removeChild(confirmBox);
  }

  document.body.appendChild(confirmBox);
  return false;
}

function editImgViewFunction(event, id) {
  document.getElementById(id).src = URL.createObjectURL(event.target.files[0]);
}


/* ------------------- scripts for admin pages common ---------   */

//Admin layout toggle
let el = document.getElementById("wrapper");
let toggleButton = document.getElementById("menu-toggle");

toggleButton.onclick = function () {
  el.classList.toggle("toggled");
};

//admin loader
window.addEventListener("load", function () {
  const loader = document.querySelector(".loader");
  loader.className += " hidden";
});

//admin common message fields
try {
  setTimeout(() => {
    let errorMessage = document.getElementById("errorMessage");
    if (errorMessage) {
      errorMessage.style.display = "none";
    }
  }, 3000);

  setTimeout(() => {
    let successMessage = document.getElementById("successMessage");
    if (successMessage) {
      successMessage.style.display = "none";
    }
  }, 6000);

  setTimeout(() => {
    let warningMessage = document.getElementById("warningMessage");
    if (warningMessage) {
      warningMessage.style.display = "none";
    }
  }, 3000);
} catch (err) {
  console.log("external", err);
} finally {
  console.log("external error");
}