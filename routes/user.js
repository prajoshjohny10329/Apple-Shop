var express = require("express");
var router = express.Router();
const adminHelper = require("../helper/admin-helper");
const userHelpers = require("../helper/user-helper");
const userController = require("../controllers/user-controller");
const middleware = require("../middlewares/middlewares");

const { render } = require("../app");


router.get('/res',(req,res)=>{
  
  res.render("user-signupOTP",{formLayout: true})
  
})

router.get("/", middleware.isLoggedIn, userController.getLandingPage); //home page

router.get("/view-product/:id", userController.viewOneProduct); // view One Product

router.get("/login", middleware.userIsLoggedIn, userController.getLogin);

router.post("/login", middleware.userIsLoggedIn, userController.postLogin);

router.get("/signup", middleware.userIsLoggedIn, userController.getSignup);

router.post("/signup", middleware.userIsLoggedIn, userController.postSignup);

router.get("/otp", middleware.userIsLoggedIn, userController.getOTP);

router.post("/otp", middleware.userIsLoggedIn, userController.postOTP);

router.get(
  "/forgotPassword",
  middleware.userIsLoggedIn,
  userController.getForgot
);

router.post(
  "/forgotPassword",
  middleware.userIsLoggedIn,
  userController.postForgot
);

router.post(
  "/forgotPasswordOTP",
  middleware.userIsLoggedIn,
  userController.postForgotOTP
);

router.post(
  "/forgotPassword3",
  middleware.userIsLoggedIn,
  userController.postForgot3
);

router.get(
  "/loginwithOTP",
  middleware.userIsLoggedIn,
  userController.getLoginWithOTP
);

router.post(
  "/loginwithOTP1",
  middleware.userIsLoggedIn,
  userController.postLoginWithOTP1
);

router.post(
  "/loginwithOTP2",
  middleware.userIsLoggedIn,
  userController.postLoginWithOTP2
);

///only valid user area

router.get("/my-orders", middleware.userMiddleware, userController.getMyOrders);

router.get(
  "/my-account",
  middleware.userMiddleware,
  userController.getMyAccount
);

router.get(
  "/add-address",
  middleware.userMiddleware,
  userController.getAddAddress
);

router.post(
  "/add-address",
  middleware.userMiddleware,
  userController.postAddAddress
);

router.post(
  "/edit-address",
  middleware.userMiddleware,
  userController.getEditAddAddress
);

router.post(
  "/edit-myAddress",
  middleware.userMiddleware,
  userController.postEditAddress
);

/// order routes

router.get(
  "/select-address",
  middleware.userMiddleware,
  userController.getSelectAddress
);

router.post(
  "/select-address",
  middleware.userMiddleware,
  userController.postSelectAddress
);

router.get(
  "/order-summary",
  middleware.userMiddleware,
  userController.getOrderSummary
);

router.get(
  "/place-order",
  middleware.userMiddleware,
  userController.getPlaceOrder
);

router.post(
  "/place-order",
  middleware.userMiddleware,
  userController.postPlaceOrder
);

router.post(
  "/verify-payment",
  middleware.userMiddleware,
  userController.verifyPayment
);

router.get(
  "/order-success",
  middleware.userMiddleware,
  userController.getOrderSuccess
);

/// my order

router.get(
  "/view-orderProducts/:id",
  middleware.userMiddleware,
  userController.getOrderProducts
);

router.post(
  "/cancel-order",
  middleware.userMiddleware,
  userController.cancelOrder
);

router.post(
  "/return-order",
  middleware.userMiddleware,
  userController.returnOrder
);

//coupon

router.post(
  "/post-coupon",
  middleware.userMiddleware,
  userController.postCouponCode
);

router.get("/my-coupons", middleware.userMiddleware, userController.getCoupons);

//wallet

router.get("/my-wallet", middleware.userMiddleware, userController.getWallet);

router.get("/my-cart", middleware.userMiddleware, userController.userMyCart);

router.get(
  "/add-to-cart/:id",
  middleware.userMiddleware,
  userController.addToCart
);

router.get("/cart", middleware.userMiddleware, userController.userCart);

router.post(
  "/change-product-quantity",
  middleware.userMiddleware,
  userController.cartQuantityChange
);

router.post(
  "/remove-cart-product",
  middleware.userMiddleware,
  userController.removeProductCart
);

router.get("/search", userController.getSearch);

router.get("/logout", middleware.userMiddleware, userController.userLogOut);

//error
router.get("/error", userController.getError);



module.exports = router;
