/* ------------------- scripts for user page ---------------   */

//function for user to load
window.addEventListener("load", function () {
  const loader = document.querySelector(".loader");
  loader.className += " hidden";
});


/* ------------------- scripts for user my account ---------------   */

//function for user to account page open sidebar
function openNav() {
  document.getElementById("mySidebar").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
  document.getElementById("footerId").style.marginLeft = "250px";
  document.getElementById("firstHead").style.marginLeft = "250px";
  document.getElementById("footerId").style.transition = "0.5s";
  document.getElementById("firstHead").style.transition = "0.5s";
  document.getElementById("openBtn").style.display = "none";
}

//function for user to account page open sidebar
function closeNav() {
  console.log("hi");
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
  document.getElementById("footerId").style.marginLeft = "0";
  document.getElementById("firstHead").style.marginLeft = "0";
  document.getElementById("openBtn").style.display = "flex";
  document.getElementById("myAccountHead").style.marginRight = "55px";
}

//function for user my account to hide toggle 
try {
  window.addEventListener("DOMContentLoaded", function () {
    const openBtn = document.getElementById("openBtn");
    if (!openBtn) {
      console.log('Error: Element with id "openBtn" not found.');
      return;
    }
    window.addEventListener("scroll", function () {
      let scrollPosition = window.scrollY;
      if (scrollPosition >= 50) {
        openBtn.style.display = "none";
      } else {
        openBtn.style.display = "block";
      }
    });
  });
} catch (error) {
  console.log("scroll exception:");
}

//function for user to go back
function goBack() {
  history.back();
}

/* ------------------- scripts for user address page ---------------   */

// user newAddress ------------------------------/
const userAddressName_error = document.getElementById("userAddressName_error");
const userAddressPhone_error = document.getElementById("userAddressPhone_error");
const userAddressPincode_error = document.getElementById("userAddressPincode_error");
const userAddressState_error = document.getElementById("userAddressState_error");
const userAddressCity_error = document.getElementById("userAddressCity_error");
const userAddressHouseNo_error = document.getElementById("userAddressHouseNo_error");
const userAddressRoad_error = document.getElementById("userAddressRoad_error");
const userAddressNearAddress_error = document.getElementById("userAddressNearAddress_error");
const userAddressDistrict_error = document.getElementById("userAddressDistrict_error");
const submit_error = document.getElementById("submitError");
var isIndianAddress = false;
const indianCheckbox = document.getElementById("indianCheckbox");
const indianDiv = document.getElementsByClassName("indianDiv");
const otherNationDiv = document.getElementsByClassName("otherNationDiv");
const inputDistrict = document.getElementById("inputDistrict");
const inputState = document.getElementById("inputState");
const otherNationDistrict = document.getElementById("otherNationDistrict");
const otherNationState = document.getElementById("otherNationState");

//default function for user to if indian address
try {
  if (indianCheckbox.checked) {
    isIndianAddress = true;
    console.log("indian");
    for (let i = 0; i < indianDiv.length; i++) {
      indianDiv[i].style.display = "block";
    }
    for (let i = 0; i < otherNationDiv.length; i++) {
      otherNationDiv[i].style.display = "none";
    }
    inputDistrict.disabled = false;
    inputState.disabled = false;
    otherNationDistrict.disabled = true;
    otherNationState.disabled = true;
  } else {
    isIndianAddress = false;
    for (let i = 0; i < indianDiv.length; i++) {
      indianDiv[i].style.display = "none";
    }
    for (let i = 0; i < otherNationDiv.length; i++) {
      otherNationDiv[i].style.display = "block";
    }
    inputDistrict.disabled = true;
    inputState.disabled = true;
    otherNationDistrict.disabled = false;
    otherNationState.disabled = false;
  }
} catch (error) {
  console.log("some exception in indian address");
}

//function for user to check add new address is indian address
function indianAddress() {
  if (indianCheckbox.checked) {
    isIndianAddress = true;
    console.log("indian");
    for (let i = 0; i < indianDiv.length; i++) {
      indianDiv[i].style.display = "block";
    }
    for (let i = 0; i < otherNationDiv.length; i++) {
      otherNationDiv[i].style.display = "none";
    }
    inputDistrict.disabled = false;
    inputState.disabled = false;
    otherNationDistrict.disabled = true;
    otherNationState.disabled = true;
  } else {
    isIndianAddress = false;
    console.log("other");
    for (let i = 0; i < indianDiv.length; i++) {
      indianDiv[i].style.display = "none";
    }
    for (let i = 0; i < otherNationDiv.length; i++) {
      otherNationDiv[i].style.display = "block";
    }
    inputDistrict.disabled = true;
    inputState.disabled = true;
    otherNationDistrict.disabled = false;
    otherNationState.disabled = false;
  }
}

//function for user to check add new address state
function userStateChecker() {
  if (isIndianAddress) {
    console.log("if");
    return true;
  } else {
    console.log("else");
    const otherNationState = document.getElementById("otherNationState").value;

    if (otherNationState.length == 0) {
      userAddressState_error.innerHTML = "state name is required";
      return false;
    }
    if (otherNationState.length < 3) {
      userAddressState_error.innerHTML = "invalid state name";

      return false;
    }
    if (!otherNationState.match(/^[A-Za-z\s]+$/)) {
      userAddressState_error.innerHTML = "only allowed letters ";

      return false;
    }
    userAddressState_error.innerHTML = "";
    return true;
  }
}

//function for user to check add new address name
function userNameChecker() {
  const userAddressName = document.getElementById("userAddressName").value;
  if (userAddressName.length == 0) {
    userAddressName_error.innerHTML = "user name is required";
    return false;
  }
  if (userAddressName.length <= 3) {
    userAddressName_error.innerHTML = "user full name is required";
    return false;
  }
  if (!userAddressName.match(/^[a-zA-Z]+(?:\s[a-zA-Z]+)+$/)) {
    userAddressName_error.innerHTML = "invalid user Full name ";
    return false;
  }
  userAddressName_error.innerHTML = "";
  return true;
}

//function for user to check add new address phone
function userPhoneChecker() {
  const userAddressPhone = document.getElementById("userAddressPhone").value;
  if (userAddressPhone.length == 0) {
    console.log("if");
    userAddressPhone_error.innerHTML = "phone number is required";
    return false;
  }

  if (!userAddressPhone.match(/^[0-9]+$/)) {
    userAddressPhone_error.innerHTML = "invalid phone number please check ";
    return false;
  }
  if (userAddressPhone.length !== 10) {
    console.log("if");
    userAddressPhone_error.innerHTML = "invalid phone number please check";
    return false;
  }
  userAddressPhone_error.innerHTML = "";
  return true;
}

//function for user to check add new address pin code
function userPincodChecker() {
  const userAddressPincode =
    document.getElementById("userAddressPincode").value;

  if (userAddressPincode.length == 0) {
    userAddressPincode_error.innerHTML = "pincode number is required";
    return false;
  }
  if (userAddressPincode.length !== 6) {
    userAddressPincode_error.innerHTML = "invalid pincode please check";
    return false;
  }
  userAddressPincode_error.innerHTML = "";
  return true;
}

function userHouseNoChecker() {
  const userAddressHouseNo =
    document.getElementById("userAddressHouseNo").value;

  if (userAddressHouseNo.length == 0) {
    userAddressHouseNo_error.innerHTML =
      "House name /building name  is required";
    return false;
  }
  if (userAddressHouseNo.length < 4) {
    userAddressHouseNo_error.innerHTML =
      "House name /building name  is invalid";
    return false;
  }
  userAddressHouseNo_error.innerHTML = "";
  return true;
}

//function for user to check add new address pin code
function userDistrictChecker() {
  const otherNationDistrict = document.getElementById(
    "otherNationDistrict"
  ).value;

  if (otherNationDistrict.length == 0) {
    userAddressDistrict_error.innerHTML = "state name is required";
    return false;
  }
  if (otherNationDistrict.length < 3) {
    userAddressDistrict_error.innerHTML = "invalid state name";
    return false;
  }
  if (!otherNationDistrict.match(/^[A-Za-z\s]+$/)) {
    userAddressDistrict_error.innerHTML = "only allowed letters ";
    return false;
  }
  userAddressDistrict_error.innerHTML = "";
  return true;
}

//function for user to check add new address city
function userCityChecker() {
  const userAddressCity = document.getElementById("userAddressCity").value;

  if (userAddressCity.length == 0) {
    userAddressCity_error.innerHTML = "city/town/village name is required";
    return false;
  }
  if (userAddressCity.length < 3) {
    userAddressCity_error.innerHTML = "invalid city/town/village name";
    return false;
  }
  if (!userAddressCity.match(/^[A-Za-z\s]+$/)) {
    userAddressCity_error.innerHTML = "only allowed letters ";
    return false;
  }
  userAddressCity_error.innerHTML = "";
  return true;
}

//function for user to check add new address road name
function userAddressRoadChecker() {
  const userAddressRoad = document.getElementById("userAddressRoad").value;
  if (userAddressRoad.length == 0) {
    userAddressRoad_error.innerHTML =
      "road/town/village/nearest place name is required";
    return false;
  }
  if (userAddressRoad.length < 3) {
    userAddressRoad_error.innerHTML =
      "invalid road/city/town/village/nearest place name";
    return false;
  }
  userAddressRoad_error.innerHTML = "";
  return true;
}
function userAddressNearAddressChecker() {
  const userAddressNearAddress = document.getElementById(
    "userAddressNearAddress"
  ).value;
  if (userAddressNearAddress.length < 3) {
    userAddressNearAddress_error.innerHTML = "invalid city/town/village name";
    return false;
  }
  userAddressNearAddress_error.innerHTML = "";
  return true;
}

//function for user to check add new address submit
function validateAddNewAddress() {
  if (
    !userNameChecker() ||
    !userPhoneChecker() ||
    !userPincodChecker() ||
    !userStateChecker() ||
    !userCityChecker() ||
    !userHouseNoChecker() ||
    !userAddressNearAddressChecker() ||
    !userAddressRoadChecker()
  ) {
    submit_error.innerHTML = "please check and try Submit";
    setTimeout(() => {
      submit_error.style.display = "none";
    }, 3000);
    return false;
  }
  submit_error.innerHTML = "";
  return true;
}

/* ------------------- scripts for user pagination ---------------   */

try {
  const paginationContainer = document.querySelector(".pagination-list");
  let pageNo = document.getElementById("pageNo").value;
  const sortId = document.getElementById("sortId").value;
  console.log(sortId);
  console.log(pageNo);

  for (var i = 1; i <= pageNo; i++) {
    var li = document.createElement("li");
    var link = document.createElement("a");
    link.href = `/search?page=${i}&sort=${sortId}&`; // Set the appropriate link for each page
    link.textContent = i;
    li.appendChild(link);
    paginationContainer.appendChild(li);
  }
} catch (error) {
 
}

/* ------------------- scripts for user coupon page ---------------   */

function copyCouponCode(couponCode) {
  const tempInput = document.createElement("input");
  tempInput.setAttribute("value", couponCode);
  document.body.appendChild(tempInput);
  tempInput.select();
  tempInput.setSelectionRange(0, 99999); 
  document.execCommand("copy");
  document.body.removeChild(tempInput);
  Swal.fire("Good job!", "You Copied Coupon Code!", "success");
}

/* ------------------- scripts for user view single page ---------------   */

function changeImage(src) {
  var singleImage = $("#singleImage"); 
  singleImage.attr("src", src);
}

/* ------------------- scripts for user address page is indian ---------------   */

var AndraPradesh = [
  "Anantapur",
  "Chittoor",
  "East Godavari",
  "Guntur",
  "Kadapa",
  "Krishna",
  "Kurnool",
  "Prakasam",
  "Nellore",
  "Srikakulam",
  "Visakhapatnam",
  "Vizianagaram",
  "West Godavari",
];
var ArunachalPradesh = [
  "Anjaw",
  "Changlang",
  "Dibang Valley",
  "East Kameng",
  "East Siang",
  "Kra Daadi",
  "Kurung Kumey",
  "Lohit",
  "Longding",
  "Lower Dibang Valley",
  "Lower Subansiri",
  "Namsai",
  "Papum Pare",
  "Siang",
  "Tawang",
  "Tirap",
  "Upper Siang",
  "Upper Subansiri",
  "West Kameng",
  "West Siang",
  "Itanagar",
];
var Assam = [
  "Baksa",
  "Barpeta",
  "Biswanath",
  "Bongaigaon",
  "Cachar",
  "Charaideo",
  "Chirang",
  "Darrang",
  "Dhemaji",
  "Dhubri",
  "Dibrugarh",
  "Goalpara",
  "Golaghat",
  "Hailakandi",
  "Hojai",
  "Jorhat",
  "Kamrup Metropolitan",
  "Kamrup (Rural)",
  "Karbi Anglong",
  "Karimganj",
  "Kokrajhar",
  "Lakhimpur",
  "Majuli",
  "Morigaon",
  "Nagaon",
  "Nalbari",
  "Dima Hasao",
  "Sivasagar",
  "Sonitpur",
  "South Salmara Mankachar",
  "Tinsukia",
  "Udalguri",
  "West Karbi Anglong",
];
var Bihar = [
  "Araria",
  "Arwal",
  "Aurangabad",
  "Banka",
  "Begusarai",
  "Bhagalpur",
  "Bhojpur",
  "Buxar",
  "Darbhanga",
  "East Champaran",
  "Gaya",
  "Gopalganj",
  "Jamui",
  "Jehanabad",
  "Kaimur",
  "Katihar",
  "Khagaria",
  "Kishanganj",
  "Lakhisarai",
  "Madhepura",
  "Madhubani",
  "Munger",
  "Muzaffarpur",
  "Nalanda",
  "Nawada",
  "Patna",
  "Purnia",
  "Rohtas",
  "Saharsa",
  "Samastipur",
  "Saran",
  "Sheikhpura",
  "Sheohar",
  "Sitamarhi",
  "Siwan",
  "Supaul",
  "Vaishali",
  "West Champaran",
];
var Chhattisgarh = [
  "Balod",
  "Baloda Bazar",
  "Balrampur",
  "Bastar",
  "Bemetara",
  "Bijapur",
  "Bilaspur",
  "Dantewada",
  "Dhamtari",
  "Durg",
  "Gariaband",
  "Janjgir Champa",
  "Jashpur",
  "Kabirdham",
  "Kanker",
  "Kondagaon",
  "Korba",
  "Koriya",
  "Mahasamund",
  "Mungeli",
  "Narayanpur",
  "Raigarh",
  "Raipur",
  "Rajnandgaon",
  "Sukma",
  "Surajpur",
  "Surguja",
];
var Goa = ["North Goa", "South Goa"];
var Gujarat = [
  "Ahmedabad",
  "Amreli",
  "Anand",
  "Aravalli",
  "Banaskantha",
  "Bharuch",
  "Bhavnagar",
  "Botad",
  "Chhota Udaipur",
  "Dahod",
  "Dang",
  "Devbhoomi Dwarka",
  "Gandhinagar",
  "Gir Somnath",
  "Jamnagar",
  "Junagadh",
  "Kheda",
  "Kutch",
  "Mahisagar",
  "Mehsana",
  "Morbi",
  "Narmada",
  "Navsari",
  "Panchmahal",
  "Patan",
  "Porbandar",
  "Rajkot",
  "Sabarkantha",
  "Surat",
  "Surendranagar",
  "Tapi",
  "Vadodara",
  "Valsad",
];
var Haryana = [
  "Ambala",
  "Bhiwani",
  "Charkhi Dadri",
  "Faridabad",
  "Fatehabad",
  "Gurugram",
  "Hisar",
  "Jhajjar",
  "Jind",
  "Kaithal",
  "Karnal",
  "Kurukshetra",
  "Mahendragarh",
  "Mewat",
  "Palwal",
  "Panchkula",
  "Panipat",
  "Rewari",
  "Rohtak",
  "Sirsa",
  "Sonipat",
  "Yamunanagar",
];
var HimachalPradesh = [
  "Bilaspur",
  "Chamba",
  "Hamirpur",
  "Kangra",
  "Kinnaur",
  "Kullu",
  "Lahaul Spiti",
  "Mandi",
  "Shimla",
  "Sirmaur",
  "Solan",
  "Una",
];
var JammuKashmir = [
  "Anantnag",
  "Bandipora",
  "Baramulla",
  "Budgam",
  "Doda",
  "Ganderbal",
  "Jammu",
  "Kargil",
  "Kathua",
  "Kishtwar",
  "Kulgam",
  "Kupwara",
  "Leh",
  "Poonch",
  "Pulwama",
  "Rajouri",
  "Ramban",
  "Reasi",
  "Samba",
  "Shopian",
  "Srinagar",
  "Udhampur",
];
var Jharkhand = [
  "Bokaro",
  "Chatra",
  "Deoghar",
  "Dhanbad",
  "Dumka",
  "East Singhbhum",
  "Garhwa",
  "Giridih",
  "Godda",
  "Gumla",
  "Hazaribagh",
  "Jamtara",
  "Khunti",
  "Koderma",
  "Latehar",
  "Lohardaga",
  "Pakur",
  "Palamu",
  "Ramgarh",
  "Ranchi",
  "Sahebganj",
  "Seraikela Kharsawan",
  "Simdega",
  "West Singhbhum",
];
var Karnataka = [
  "Bagalkot",
  "Bangalore Rural",
  "Bangalore Urban",
  "Belgaum",
  "Bellary",
  "Bidar",
  "Vijayapura",
  "Chamarajanagar",
  "Chikkaballapur",
  "Chikkamagaluru",
  "Chitradurga",
  "Dakshina Kannada",
  "Davanagere",
  "Dharwad",
  "Gadag",
  "Gulbarga",
  "Hassan",
  "Haveri",
  "Kodagu",
  "Kolar",
  "Koppal",
  "Mandya",
  "Mysore",
  "Raichur",
  "Ramanagara",
  "Shimoga",
  "Tumkur",
  "Udupi",
  "Uttara Kannada",
  "Yadgir",
];
var Kerala = [
  "Alappuzha",
  "Ernakulam",
  "Idukki",
  "Kannur",
  "Kasaragod",
  "Kollam",
  "Kottayam",
  "Kozhikode",
  "Malappuram",
  "Palakkad",
  "Pathanamthitta",
  "Thiruvananthapuram",
  "Thrissur",
  "Wayanad",
];
var MadhyaPradesh = [
  "Agar Malwa",
  "Alirajpur",
  "Anuppur",
  "Ashoknagar",
  "Balaghat",
  "Barwani",
  "Betul",
  "Bhind",
  "Bhopal",
  "Burhanpur",
  "Chhatarpur",
  "Chhindwara",
  "Damoh",
  "Datia",
  "Dewas",
  "Dhar",
  "Dindori",
  "Guna",
  "Gwalior",
  "Harda",
  "Hoshangabad",
  "Indore",
  "Jabalpur",
  "Jhabua",
  "Katni",
  "Khandwa",
  "Khargone",
  "Mandla",
  "Mandsaur",
  "Morena",
  "Narsinghpur",
  "Neemuch",
  "Panna",
  "Raisen",
  "Rajgarh",
  "Ratlam",
  "Rewa",
  "Sagar",
  "Satna",
  "Sehore",
  "Seoni",
  "Shahdol",
  "Shajapur",
  "Sheopur",
  "Shivpuri",
  "Sidhi",
  "Singrauli",
  "Tikamgarh",
  "Ujjain",
  "Umaria",
  "Vidisha",
];
var Maharashtra = [
  "Ahmednagar",
  "Akola",
  "Amravati",
  "Aurangabad",
  "Beed",
  "Bhandara",
  "Buldhana",
  "Chandrapur",
  "Dhule",
  "Gadchiroli",
  "Gondia",
  "Hingoli",
  "Jalgaon",
  "Jalna",
  "Kolhapur",
  "Latur",
  "Mumbai City",
  "Mumbai Suburban",
  "Nagpur",
  "Nanded",
  "Nandurbar",
  "Nashik",
  "Osmanabad",
  "Palghar",
  "Parbhani",
  "Pune",
  "Raigad",
  "Ratnagiri",
  "Sangli",
  "Satara",
  "Sindhudurg",
  "Solapur",
  "Thane",
  "Wardha",
  "Washim",
  "Yavatmal",
];
var Manipur = [
  "Bishnupur",
  "Chandel",
  "Churachandpur",
  "Imphal East",
  "Imphal West",
  "Jiribam",
  "Kakching",
  "Kamjong",
  "Kangpokpi",
  "Noney",
  "Pherzawl",
  "Senapati",
  "Tamenglong",
  "Tengnoupal",
  "Thoubal",
  "Ukhrul",
];
var Meghalaya = [
  "East Garo Hills",
  "East Jaintia Hills",
  "East Khasi Hills",
  "North Garo Hills",
  "Ri Bhoi",
  "South Garo Hills",
  "South West Garo Hills",
  "South West Khasi Hills",
  "West Garo Hills",
  "West Jaintia Hills",
  "West Khasi Hills",
];
var Mizoram = [
  "Aizawl",
  "Champhai",
  "Kolasib",
  "Lawngtlai",
  "Lunglei",
  "Mamit",
  "Saiha",
  "Serchhip",
  "Aizawl",
  "Champhai",
  "Kolasib",
  "Lawngtlai",
  "Lunglei",
  "Mamit",
  "Saiha",
  "Serchhip",
];
var Nagaland = [
  "Dimapur",
  "Kiphire",
  "Kohima",
  "Longleng",
  "Mokokchung",
  "Mon",
  "Peren",
  "Phek",
  "Tuensang",
  "Wokha",
  "Zunheboto",
];
var Odisha = [
  "Angul",
  "Balangir",
  "Balasore",
  "Bargarh",
  "Bhadrak",
  "Boudh",
  "Cuttack",
  "Debagarh",
  "Dhenkanal",
  "Gajapati",
  "Ganjam",
  "Jagatsinghpur",
  "Jajpur",
  "Jharsuguda",
  "Kalahandi",
  "Kandhamal",
  "Kendrapara",
  "Kendujhar",
  "Khordha",
  "Koraput",
  "Malkangiri",
  "Mayurbhanj",
  "Nabarangpur",
  "Nayagarh",
  "Nuapada",
  "Puri",
  "Rayagada",
  "Sambalpur",
  "Subarnapur",
  "Sundergarh",
];
var Punjab = [
  "Amritsar",
  "Barnala",
  "Bathinda",
  "Faridkot",
  "Fatehgarh Sahib",
  "Fazilka",
  "Firozpur",
  "Gurdaspur",
  "Hoshiarpur",
  "Jalandhar",
  "Kapurthala",
  "Ludhiana",
  "Mansa",
  "Moga",
  "Mohali",
  "Muktsar",
  "Pathankot",
  "Patiala",
  "Rupnagar",
  "Sangrur",
  "Shaheed Bhagat Singh Nagar",
  "Tarn Taran",
];
var Rajasthan = [
  "Ajmer",
  "Alwar",
  "Banswara",
  "Baran",
  "Barmer",
  "Bharatpur",
  "Bhilwara",
  "Bikaner",
  "Bundi",
  "Chittorgarh",
  "Churu",
  "Dausa",
  "Dholpur",
  "Dungarpur",
  "Ganganagar",
  "Hanumangarh",
  "Jaipur",
  "Jaisalmer",
  "Jalore",
  "Jhalawar",
  "Jhunjhunu",
  "Jodhpur",
  "Karauli",
  "Kota",
  "Nagaur",
  "Pali",
  "Pratapgarh",
  "Rajsamand",
  "Sawai Madhopur",
  "Sikar",
  "Sirohi",
  "Tonk",
  "Udaipur",
];
var Sikkim = ["East Sikkim", "North Sikkim", "South Sikkim", "West Sikkim"];
var TamilNadu = [
  "Ariyalur",
  "Chennai",
  "Coimbatore",
  "Cuddalore",
  "Dharmapuri",
  "Dindigul",
  "Erode",
  "Kanchipuram",
  "Kanyakumari",
  "Karur",
  "Krishnagiri",
  "Madurai",
  "Nagapattinam",
  "Namakkal",
  "Nilgiris",
  "Perambalur",
  "Pudukkottai",
  "Ramanathapuram",
  "Salem",
  "Sivaganga",
  "Thanjavur",
  "Theni",
  "Thoothukudi",
  "Tiruchirappalli",
  "Tirunelveli",
  "Tiruppur",
  "Tiruvallur",
  "Tiruvannamalai",
  "Tiruvarur",
  "Vellore",
  "Viluppuram",
  "Virudhunagar",
];
var Telangana = [
  "Adilabad",
  "Bhadradri Kothagudem",
  "Hyderabad",
  "Jagtial",
  "Jangaon",
  "Jayashankar",
  "Jogulamba",
  "Kamareddy",
  "Karimnagar",
  "Khammam",
  "Komaram Bheem",
  "Mahabubabad",
  "Mahbubnagar",
  "Mancherial",
  "Medak",
  "Medchal",
  "Nagarkurnool",
  "Nalgonda",
  "Nirmal",
  "Nizamabad",
  "Peddapalli",
  "Rajanna Sircilla",
  "Ranga Reddy",
  "Sangareddy",
  "Siddipet",
  "Suryapet",
  "Vikarabad",
  "Wanaparthy",
  "Warangal Rural",
  "Warangal Urban",
  "Yadadri Bhuvanagiri",
];
var Tripura = [
  "Dhalai",
  "Gomati",
  "Khowai",
  "North Tripura",
  "Sepahijala",
  "South Tripura",
  "Unakoti",
  "West Tripura",
];
var UttarPradesh = [
  "Agra",
  "Aligarh",
  "Allahabad",
  "Ambedkar Nagar",
  "Amethi",
  "Amroha",
  "Auraiya",
  "Azamgarh",
  "Baghpat",
  "Bahraich",
  "Ballia",
  "Balrampur",
  "Banda",
  "Barabanki",
  "Bareilly",
  "Basti",
  "Bhadohi",
  "Bijnor",
  "Budaun",
  "Bulandshahr",
  "Chandauli",
  "Chitrakoot",
  "Deoria",
  "Etah",
  "Etawah",
  "Faizabad",
  "Farrukhabad",
  "Fatehpur",
  "Firozabad",
  "Gautam Buddha Nagar",
  "Ghaziabad",
  "Ghazipur",
  "Gonda",
  "Gorakhpur",
  "Hamirpur",
  "Hapur",
  "Hardoi",
  "Hathras",
  "Jalaun",
  "Jaunpur",
  "Jhansi",
  "Kannauj",
  "Kanpur Dehat",
  "Kanpur Nagar",
  "Kasganj",
  "Kaushambi",
  "Kheri",
  "Kushinagar",
  "Lalitpur",
  "Lucknow",
  "Maharajganj",
  "Mahoba",
  "Mainpuri",
  "Mathura",
  "Mau",
  "Meerut",
  "Mirzapur",
  "Moradabad",
  "Muzaffarnagar",
  "Pilibhit",
  "Pratapgarh",
  "Raebareli",
  "Rampur",
  "Saharanpur",
  "Sambhal",
  "Sant Kabir Nagar",
  "Shahjahanpur",
  "Shamli",
  "Shravasti",
  "Siddharthnagar",
  "Sitapur",
  "Sonbhadra",
  "Sultanpur",
  "Unnao",
  "Varanasi",
];
var Uttarakhand = [
  "Almora",
  "Bageshwar",
  "Chamoli",
  "Champawat",
  "Dehradun",
  "Haridwar",
  "Nainital",
  "Pauri",
  "Pithoragarh",
  "Rudraprayag",
  "Tehri",
  "Udham Singh Nagar",
  "Uttarkashi",
];
var WestBengal = [
  "Alipurduar",
  "Bankura",
  "Birbhum",
  "Cooch Behar",
  "Dakshin Dinajpur",
  "Darjeeling",
  "Hooghly",
  "Howrah",
  "Jalpaiguri",
  "Jhargram",
  "Kalimpong",
  "Kolkata",
  "Malda",
  "Murshidabad",
  "Nadia",
  "North 24 Parganas",
  "Paschim Bardhaman",
  "Paschim Medinipur",
  "Purba Bardhaman",
  "Purba Medinipur",
  "Purulia",
  "South 24 Parganas",
  "Uttar Dinajpur",
];
var AndamanNicobar = ["Nicobar", "North Middle Andaman", "South Andaman"];
var Chandigarh = ["Chandigarh"];
var DadraHaveli = ["Dadra Nagar Haveli"];
var DamanDiu = ["Daman", "Diu"];
var Delhi = [
  "Central Delhi",
  "East Delhi",
  "New Delhi",
  "North Delhi",
  "North East Delhi",
  "North West Delhi",
  "Shahdara",
  "South Delhi",
  "South East Delhi",
  "South West Delhi",
  "West Delhi",
];
var Lakshadweep = ["Lakshadweep"];
var Puducherry = ["Karaikal", "Mahe", "Puducherry", "Yanam"];

$("#inputState").change(function () {
  var StateSelected = $(this).val();
  var optionsList;
  var htmlString = "";

  switch (StateSelected) {
    case "Andra Pradesh":
      optionsList = AndraPradesh;
      break;
    case "Arunachal Pradesh":
      optionsList = ArunachalPradesh;
      break;
    case "Assam":
      optionsList = Assam;
      break;
    case "Bihar":
      optionsList = Bihar;
      break;
    case "Chhattisgarh":
      optionsList = Chhattisgarh;
      break;
    case "Goa":
      optionsList = Goa;
      break;
    case "Gujarat":
      optionsList = Gujarat;
      break;
    case "Haryana":
      optionsList = Haryana;
      break;
    case "Himachal Pradesh":
      optionsList = HimachalPradesh;
      break;
    case "Jammu and Kashmir":
      optionsList = JammuKashmir;
      break;
    case "Jharkhand":
      optionsList = Jharkhand;
      break;
    case "Karnataka":
      optionsList = Karnataka;
      break;
    case "Kerala":
      optionsList = Kerala;
      break;
    case "Madya Pradesh":
      optionsList = MadhyaPradesh;
      break;
    case "Maharashtra":
      optionsList = Maharashtra;
      break;
    case "Manipur":
      optionsList = Manipur;
      break;
    case "Meghalaya":
      optionsList = Meghalaya;
      break;
    case "Mizoram":
      optionsList = Mizoram;
      break;
    case "Nagaland":
      optionsList = Nagaland;
      break;
    case "Orissa":
      optionsList = Orissa;
      break;
    case "Punjab":
      optionsList = Punjab;
      break;
    case "Rajasthan":
      optionsList = Rajasthan;
      break;
    case "Sikkim":
      optionsList = Sikkim;
      break;
    case "Tamil Nadu":
      optionsList = TamilNadu;
      break;
    case "Telangana":
      optionsList = Telangana;
      break;
    case "Tripura":
      optionsList = Tripura;
      break;
    case "Uttaranchal":
      optionsList = Uttaranchal;
      break;
    case "Uttar Pradesh":
      optionsList = UttarPradesh;
      break;
    case "West Bengal":
      optionsList = WestBengal;
      break;
    case "Andaman and Nicobar Islands":
      optionsList = AndamanNicobar;
      break;
    case "Chandigarh":
      optionsList = Chandigarh;
      break;
    case "Dadar and Nagar Haveli":
      optionsList = DadraHaveli;
      break;
    case "Daman and Diu":
      optionsList = DamanDiu;
      break;
    case "Delhi":
      optionsList = Delhi;
      break;
    case "Lakshadeep":
      optionsList = Lakshadeep;
      break;
    case "Pondicherry":
      optionsList = Pondicherry;
      break;
  }

  for (var i = 0; i < optionsList.length; i++) {
    htmlString =
      htmlString +
      "<option value='" +
      optionsList[i] +
      "'>" +
      optionsList[i] +
      "</option>";
  }
  $("#inputDistrict").html(htmlString);
});

/* ------------------- scripts for user generate razorpay ---------------   */

function generateRazorpay(order) {
  var options = {
    key: "rzp_test_Jvi1smZWyXoW4Z", // Enter the Key ID generated from the Dashboard
    amount: order.response.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: "INR",
    name: "Apple Shop", //your business name
    description: "Test Transaction",
    image: "../public/images/mainlogo-dark.JPG",
    order_id: order.response.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    handler: function (response) {
      verifyPayment(response, order);
    },
    prefill: {
      //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
      name: "Gaurav Kumar", //your customer's name
      email: "gaurav.kumar@example.com",
      contact: "9000090000", //Provide the customer's phone number for better conversion rates
    },
    notes: {
      address: "Razorpay Corporate Office",
    },
    theme: {
      color: "#3399cc",
    },
  };
  var rzp1 = new Razorpay(options);
  rzp1.open();
}

/* ------------------- scripts for user show confirm messgae ---------------   */

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
    document.getElementById(Id).submit();
  }

  document.body.appendChild(confirmBox);
  return false;
}

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

