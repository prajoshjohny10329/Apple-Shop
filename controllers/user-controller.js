// const { Number } = require("twilio/lib/twiml/VoiceResponse");
// const { response } = require("../app");
const { response } = require("../app");
const adminHelper = require("../helper/admin-helper");
const userHelper = require("../helper/user-helper");
const zHelper = require("../helper/z-helper");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

module.exports = {
  // only user page
  getLandingPage: async (req, res, next) => {
    try {
      const user = req.session.user;
      const cartCount = await userHelper.cartCount(req.session.user._id);
      const products = await userHelper.getUserHomeProducts();
      const banners = await userHelper.getActiveBanners();
      res.render("user-home", {
        userLayout: true,
        loggedIn: true,
        user,
        products,
        cartCount,
        banners,
      });
    } catch (error) {
      res.redirect("/error");
    }
  },

  //get user login function
  getLogin: (req, res, next) => {
    try {
      let warningMessage = req.session.warningMessage;
      res.render("user-login", { formLayout: true, warningMessage });
      req.session.warningMessage = "";
    } catch (error) {
      res.redirect("/error");
    }
  },

  // post user login function
  postLogin: (req, res, next) => {
    try {
      let userData = req.body;
      userHelper.doLogin(userData).then(async (response) => {
        if (response.status) {
          await userHelper.userActive(response.user._id);
          req.session.loggedIn = true;
          req.session.user = response.user;
          if (req.session.currentURL) {
            res.redirect(req.session.currentURL);
            req.session.currentURL = null;
          } else {
            res.redirect("/");
          }
        } else {
          console.log("login post not matched");
          let loggedError = response.message;
          res.render("user-login", { formLayout: true, loggedError });
        }
      });
    } catch (error) {
      res.redirect("/error");
    }
  },

  // get create  new user
  getSignup: (req, res, next) => {
    try {
      res.render("user-signup", { formLayout: true, title: "Express" });
    } catch (error) {
      res.redirect("/error");
    }
  },

  // post create  new user
  postSignup: (req, res, nex) => {
    try {
      req.session.userDataForOTP = req.body;
      let userData = req.body;
      userData.userStatus = true;
      req.session.user = userData;
      userHelper.emailCheck(userData.Email).then((response) => {
        let errorMessage = response.message;
        if (response.status) {
          userHelper.mobileCheck(userData.Mobile).then((response) => {
            if (response.status) {
              errorMessage = response.mobileMessage;
              res.render("user-signup", { formLayout: true, errorMessage });
            } else {
              let last4 = userData.Mobile.slice(-4);
              req.session.successMessage =
                "Otp is send your  Mobile ****" + last4;
              res.redirect("/otp");
            }
          });
        } else {
          res.render("user-signup", { formLayout: true, errorMessage });
        }
      });
    } catch (error) {
      res.redirect("/error");
    }
  },

  // Otp create for  create  new user
  getOTP: (req, res, next) => {

      let successMessage = req.session.successMessage || "";
      let Otp_Number = "+91" + req.session.userDataForOTP.Mobile;
      res.render("user-signupOTP", { formLayout: true, successMessage });
      req.session.successMessage = null;
      client.verify.v2
        .services(process.env.TWILIO_SERVICE_SID)
        .verifications.create({ to: Otp_Number, channel: "sms" })
        .then((verification) => console.log(verification.status))
        .catch((e) => {
          console.log("Got an error postForgotOtp:", e.code, e.message);
        });

  },
  //  Otp verify for  create  new user
  postOTP: (req, res, next) => {
    try {
      let Otp_Verify_Number = "+91" + req.session.userDataForOTP.Mobile;
      let userOtp = req.body.userOTP;
      client.verify.v2
        .services(process.env.TWILIO_SERVICE_SID)
        .verificationChecks.create({ to: Otp_Verify_Number, code: userOtp })
        .then((verification_check) => {
          if (verification_check.status == "approved") {
            userHelper.doSignup(req.session.userDataForOTP).then((response) => {
              if (response.status) {
                req.session.loggedIn = true;
                res.redirect("/");
              } else {
                res.render("user-signup", { formLayout: true, response });
              }
            });
          } else {
            let message = "otp wrong";
            res.render("user-signupOTP", { formLayout: true, message });
          }
        })
        .catch((e) => {
          console.log("Got an error postOtp:", e.code, e.message);
        });
    } catch (error) {
      res.redirect("/error");
    }
  },

  // user forgot password OTP
  getForgot: (req, res, next) => {
    try {
      res.render("user-forgot1", { formLayout: true });
    } catch (error) {
      res.redirect("/error");
    }
  },

  // user post data for forgot password OTP and create OTP
  postForgot: (req, res, next) => {
    try {
      userHelper.forgotPassword(req.body).then((response) => {
        if (response.status) {
          req.session.user = response.user;
          req.session.forgotPasswordOTP = req.body;
          let Otp_Number = "+91" + req.session.forgotPasswordOTP.Mobile;
          let last4 = Otp_Number.slice(-4);
          let successMessage = "Otp is send your  Mobile ****" + last4;
          res.render("user-forgot2", { formLayout: true, successMessage });
          client.verify.v2
            .services(process.env.TWILIO_SERVICE_SID)
            .verifications.create({ to: Otp_Number, channel: "sms" })
            .then((verification) => console.log(verification.status))
            .catch((e) => {
              console.log("Got an error postForgot:", e.code, e.message);
            });
        } else {
          let errorMessage = response.errorMessage;
          res.render("user-forgot1", { formLayout: true, errorMessage });
        }
      });
    } catch (error) {
      res.redirect("/error");
    }
  },

  // user forgot password verify
  postForgotOTP: (req, res, next) => {
    try {
      let Otp_Verify_Number = "+91" + req.session.forgotPasswordOTP.Mobile;
      let userOtp = req.body.userOTP;
      client.verify.v2
        .services(process.env.TWILIO_SERVICE_SID)
        .verificationChecks.create({ to: Otp_Verify_Number, code: userOtp })
        .then((verification_check) => {
          if (verification_check.status == "approved") {
            let successMessage = "please change your password";
            res.render("user-forgot3", { formLayout: true, successMessage });
          } else {
            let errorMessage = "otp wrong ! please enter correct Otp";
            res.render("user-forgot2", { formLayout: true, errorMessage });
          }
        })
        .catch((e) => {
          console.log("Got an error postForgotOtp:", e.code, e.message);
        });
    } catch (error) {
      res.redirect("/error");
    }
  },

  // user forgot password after verify change password
  postForgot3: (req, res, next) => {
    try {
      const userMobile = req.session.forgotPasswordOTP.Mobile;
      const newPassword = req.body.Password;
      userHelper.changePassword(userMobile, newPassword).then((response) => {
        if (response.status) {
          req.session.loggedIn = true;
          res.redirect("/");
        }
      });
    } catch (error) {
      res.redirect("/error");
    }
  },

  //user login with OTP
  getLoginWithOTP: (req, res, next) => {
    try {
      const errorMessage = req.session.errorMessage;
      res.render("user-login_otp1", { formLayout: true, errorMessage });
      req.session.errorMessage = null;
    } catch (error) {
      res.redirect("/error");
    }
  },

  // post mobile number and create OTP for login with OTP
  postLoginWithOTP1: (req, res, next) => {
    try {
      let Mobile = req.body.Mobile;
      userHelper.mobileCheck(Mobile).then((response) => {
        if (response.status) {
          if (response.user.userStatus == true) {
            req.session.user = response.user;
            req.session.userDataForOTP = Mobile;
            let Otp_Number = "+91" + req.session.userDataForOTP;
            res.render("user-login_otp2", { formLayout: true });
            client.verify.v2
              .services(process.env.TWILIO_SERVICE_SID)
              .verifications.create({ to: Otp_Number, channel: "sms" })
              .then((verification) => console.log(verification.status))
              .catch((e) => {
                console.log(
                  "Got an error postLoginWithOTP:",
                  e.code,
                  e.message
                );
              });
          } else {
            req.session.errorMessage = "login failed ! case of User is blocked";
            res.redirect("/loginwithOTP");
          }
        } else {
          errorMessage = response.mobileMessage;
          res.render("user-login_otp1", { formLayout: true, errorMessage });
        }
      });
    } catch (error) {
      res.redirect("/error");
    }
  },

  // verify otp for user login with otp
  postLoginWithOTP2: (req, res, next) => {
    try {
      let Otp_Verify_Number = "+91" + req.session.userDataForOTP;
      let userOtp = req.body.userOTP;
      client.verify.v2
        .services(process.env.TWILIO_SERVICE_SID)
        .verificationChecks.create({ to: Otp_Verify_Number, code: userOtp })
        .then((verification_check) => {
          if (verification_check.status == "approved") {
            req.session.loggedIn = true;
            res.redirect("/");
          } else {
            let errorMessage = "Wrong Otp ! please Check";
            res.render("user-login_otp2", { formLayout: true, errorMessage });
          }
        })
        .catch((e) => {
          console.log("Got an error postLoginwithOTP2:", e.code, e.message);
        });
    } catch (error) {
      res.redirect("/error");
    }
  },

  // user view One Product
  viewOneProduct: async (req, res, next) => {
    try {
      const product = await userHelper.viewOneProduct(req.params.id);
      if (req.session.loggedIn) {
        const user = req.session.user;
        const cartCount = await userHelper.cartCount(req.session.user._id);
        res.render("user-viewOneProduct", {
          userLayout: true,
          loggedIn: true,
          user,
          product,
          cartCount,
        });
      } else {
        res.render("user-viewOneProduct", { userLayout: true, product });
      }
    } catch (error) {
      console.log(error);
      res.redirect("/error");
    }
  },
  addToCart: (req, res, next) => {
    try {
      userHelper.addToCart(req.params.id, req.session.user._id);
      res.redirect("/cart");
    } catch (error) {
      console.log(error);
      res.redirect("/error");
    }
  },

  userCart: async (req, res, next) => {
    try {
      const user = req.session.user;
      let cartProducts = await userHelper.getCartList(user._id);
      const cartCount = await userHelper.cartCount(user._id);
      if (cartProducts != null) {
        let totalAmount = await userHelper.getTotalAmount(user._id);
        req.session.total = totalAmount;
        let totalProducts = await userHelper.getTotalProducts(user._id);
        res.render("user-cart", {
          userLayout: true,
          loggedIn: true,
          user,
          cartProducts,
          cartCount,
          totalProducts,
          totalAmount,
        });
      } else {
        res.render("user-cart", {
          userLayout: true,
          loggedIn: true,
          user,
          cartCount,
        });
      }
    } catch (error) {
      console.log(error);
      res.redirect("/error");
    }
  },

  userMyCart: async (req, res, next) => {
    try {
      const user = req.session.user;
      let cartProducts = await userHelper.getCartList(user._id);
      const cartCount = await userHelper.cartCount(user._id);
      if (cartProducts != null) {
        let totalAmount = await userHelper.getTotalAmount(user._id);
        let totalProducts = await userHelper.getTotalProducts(user._id);
        res.render("user-myCart", {
          userLayout: true,
          loggedIn: true,
          user,
          cartProducts,
          cartCount,
          totalProducts,
          totalAmount,
        });
      } else {
        res.render("user-myCart", {
          userLayout: true,
          loggedIn: true,
          user,
          cartCount,
        });
      }
    } catch (error) {
      console.log(error);
      res.redirect("/error");
    }
  },

  cartQuantityChange: async (req, res, next) => {
    try {
      const quantity = parseInt(req.body.quantity);
      const result = await userHelper.getProductWithID(req.body.product);
      if (result.ProductStock > quantity) {
        userHelper.changeCartQuantity(req.body).then(async (response) => {
          response.total = await userHelper.getTotalAmount(req.body.user);
          response.totalPro = await userHelper.getTotalProducts(req.body.user);
          res.json(response);
        });
      } else {
        let response = {};
        response.total = await userHelper.getTotalAmount(req.body.user);
        response.totalPro = await userHelper.getTotalProducts(req.body.user);
        response.stockNot = true;
        res.json(response);
      }
    } catch (error) {
      console.log(error);
      res.redirect("/error");
    }
  },

  removeProductCart: (req, res, next) => {
    try {
      userHelper.removeCart(req.body).then((response) => {
        res.json(response);
      });
    } catch (error) {
      console.log(error);
      res.redirect("/error");
    }
  },

  getSelectAddress: async (req, res, next) => {
    try {
      const user = req.session.user;
      const cartCount = await userHelper.cartCount(user._id);
      const userAddress = await userHelper.getUserAddress(user._id);
      res.render("user-addressSelect", {
        userLayout: true,
        loggedIn: true,
        user,
        cartCount,
        userAddress,
      });
    } catch (error) {
      console.log(error);
      res.redirect("/error");
    }
  },

  postSelectAddress: async (req, res, next) => {
    try {
      const orderAddress = await userHelper.getSingleAddress(
        req.body.deliveryAddressID
      );
      req.session.orderAddress = orderAddress;

      res.redirect("/order-summary");
    } catch (error) {
      console.log(error);
      res.redirect("/error");
    }
  },

  getOrderSummary: async (req, res, next) => {
    try {
      const user = req.session.user;
      let total = await userHelper.getTotalAmount(user._id);
      let discount = 0;
      if (req.session.couponDiscount) {
        discount = req.session.couponDiscount;
      }
      total = total - discount;
      let cartProducts = await userHelper.getCartList(user._id);
      const cartCount = await userHelper.cartCount(user._id);
      let totalProducts = await userHelper.getTotalProducts(user._id);
      const orderAddress = req.session.orderAddress;
      res.render("user-orderSummary", {
        userLayout: true,
        loggedIn: true,
        user,
        total,
        cartCount,
        totalProducts,
        cartProducts,
        orderAddress,
        discount,
      });
    } catch (error) {
      console.log(error);
      res.redirect("/error");
    }
  },

  getPlaceOrder: async (req, res, next) => {
    try {
      const user = req.session.user;
      let total = await userHelper.getTotalAmount(user._id);
      let discount = 0;
      if (req.session.couponDiscount) {
        discount = req.session.couponDiscount;
      }
      total = total - discount;
      const cartCount = await userHelper.cartCount(user._id);
      const orderAddress = req.session.orderAddress;
      console.log(orderAddress);
      res.render("user-placeOrder", {
        userLayout: true,
        loggedIn: true,
        total,
        user,
        cartCount,
        orderAddress,
      });
    } catch (error) {
      console.log(error);
      res.redirect("/error");
    }
  },
  postPlaceOrder: async (req, res, next) => {
    try {
      const user = req.session.user;
      const orderAddress = req.session.orderAddress.userAddress;
      let products = await userHelper.getCartProductList(user._id);
      let total = await userHelper.getTotalAmount(user._id);
      let discount = 0;
      if (req.session.couponDiscount) {
        discount = req.session.couponDiscount;
      }

      total = total - discount;
      let totalProd = await userHelper.getTotalProducts(user._id);

      userHelper
        .placeOrder(
          req.body,
          orderAddress,
          user._id,
          products,
          total,
          totalProd
        )
        .then(async (response) => {
          if (req.body["payment-method"] === "COD") {
            await userHelper.removeCartForOrder(user._id);
            await userHelper.changeProductQuantity(products);
            res.json({ status: true });
          } else {
            userHelper
              .generateRazorpay(response.insertedId, total)
              .then((response) => {
                res.json({ response });
              });
          }
        });
    } catch (error) {
      console.log(error);
      res.redirect("/error");
    }
  },

  verifyPayment: async (req, res, next) => {
    try {
      await userHelper.verifyPayment(req.body);
      await userHelper.changeOrderStatus(req.body["order[response][receipt]"]);
      await userHelper.removeCartForOrder(req.session.user._id);
      res.json({ status: true });
    } catch (error) {
      res.json({ status: false, errorMessage: "payment Failed" });
    }
  },

  getOrderSuccess: async (req, res, next) => {
    try {
      const user = req.session.user;
      const cartCount = await userHelper.cartCount(user._id);
      res.render("user-orderConfirm", {
        userLayout: true,
        loggedIn: true,
        user,
        cartCount,
      });
    } catch (error) {
      console.log(error);
      res.redirect("/error");
    }
  },

  ///view order

  getOrderProducts: async (req, res, next) => {
    try {
      const user = req.session.user;
      const cartCount = await userHelper.cartCount(req.session.user._id);
      let orderProducts = await userHelper.getOrderProducts(req.params.id);
      const orderData = await adminHelper.getOrderData(req.params.id);
      res.render("use-viewOrders", {
        userLayout: true,
        loggedIn: true,
        user,
        cartCount,
        orderProducts,
        orderData,
      });
    } catch (error) {
      console.log(error);
      res.redirect("/error");
    }
  },
  cancelOrder: async (req, res, next) => {
    try {
      await userHelper.cancelOrder(req.body.cancelOrderId);
      res.redirect("/my-orders");
    } catch (error) {
      console.log(error);
      res.redirect("/error");
    }
  },

  getMyOrders: async (req, res, next) => {
    try {
      const user = req.session.user;
      let myOrders = await userHelper.myOrders(req.session.user._id);
      myOrders = await zHelper.myOrdersDestructure(myOrders);
      const cartCount = await userHelper.cartCount(req.session.user._id);
      res.render("user-myOrders", {
        userLayout: true,
        loggedIn: true,
        user,
        cartCount,
        myOrders,
      });
    } catch (error) {
      console.log(error);
      res.redirect("/error");
    }
  },
  getDynamicCategory: async (req, res, next) => {
    try {
      let products = await userHelper.getDynamicCategory(req.params.category);
      if (req.session.user) {
        const cartCount = await userHelper.cartCount(req.session.user._id);
        res.render("user-category", {
          userLayout: true,
          products,
          loggedIn: true,
          cartCount,
        });
      }
      res.render("user-category", { userLayout: true, products });
    } catch (error) {
      console.log(error);
      res.redirect("/error");
    }
  },
  getMyAccount: async (req, res, next) => {
    try {
      const user = req.session.user;
      let total = await userHelper.getTotalAmount(user._id);
      const cartCount = await userHelper.cartCount(user._id);
      const userAddress = await userHelper.getUserAddress(user._id);
      res.render("user-myAccount", {
        userLayout: true,
        loggedIn: true,
        user,
        total,
        cartCount,
        userAddress,
      });
    } catch (error) {
      console.log(error);
      res.redirect("/error");
    }
  },
  getAddAddress: async (req, res, next) => {
    try {
      const user = req.session.user;
      let total = await userHelper.getTotalAmount(req.session.user._id);
      const cartCount = await userHelper.cartCount(req.session.user._id);
      res.render("user-newAddress", {
        userLayout: true,
        loggedIn: true,
        user,
        total,
        cartCount,
      });
    } catch (error) {
      console.log(error);
      res.redirect("/error");
    }
  },
  postAddAddress: async (req, res, next) => {
    try {
      await userHelper.postAddAddress(req.session.user._id, req.body);
      res.redirect("/my-account");
    } catch (error) {
      console.log(error);
      res.redirect("/error");
    }
  },
  getEditAddAddress: async (req, res, next) => {
    try {
      const user = req.session.user;
      const cartCount = await userHelper.cartCount(req.session.user._id);
      const addressData = await userHelper.getSingleAddress(req.body.addressId);
      req.session.userAddressId = addressData._id;
      let isAddressHome = false;
      if (addressData.userAddress.userAddressType === "Home") {
        isAddressHome = true;
      }
      addressData.isAddressHome = isAddressHome;
      res.render("user-editAddress", {
        userLayout: true,
        loggedIn: true,
        user,
        cartCount,
        addressData,
        isAddressHome,
      });
    } catch (error) {
      console.log(error);
      res.redirect("/error");
    }
  },
  postEditAddress: async (req, res, next) => {
    try {
      await userHelper.postEditAddress(req.session.userAddressId, req.body);
      res.redirect("/my-account");
    } catch (error) {
      console.log(error);
      res.redirect("/error");
    }
  },

  ///coupon
  postCouponCode: async (req, res, next) => {
    try {
      const response = await userHelper.couponCode(req.body.couponCode);
      if (response.status) {
        req.session.couponDiscount = 1000;
        let total = req.session.total;
        response.finalPrice = total - 1000;
        response.discount = 1000;
        res.json(response);
      } else {
        res.json(response);
      }
    } catch (error) {
      console.log(error);
      res.redirect("/error");
    }
  },

  getCoupons: async (req, res, next) => {
    try {
      const user = req.session.user;
      const cartCount = await userHelper.cartCount(user._id);
      const activeCoupons = await userHelper.getActiveCoupons();
      res.render("user-couponPage", {
        userLayout: true,
        loggedIn: true,
        user,
        cartCount,
        activeCoupons,
      });
    } catch (error) {
      console.log(error);
      res.redirect("/error");
    }
  },

  // wallet
  getWallet: async (req, res, next) => {
    try {
      const user = req.session.user;
      const walletAmount = await userHelper.getWallet(user._id);
      res.render("user-wallet", {
        userLayout: true,
        loggedIn: true,
        user,
        walletAmount,
      });
    } catch (error) {
      console.log(error);
      res.redirect("/error");
    }
  },

  // search
  getSearch: async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) - 1 || 0;
      const limit = parseInt(req.query.limit) || 15;
      const search = req.query.search || "";
      let sort = req.query.sort || "productPrice";
      let productCategory = req.query.productCategory || "All";

      const CategoryOptions = [
        "AirPods",
        "Apple Watch",
        "iPad",
        "iPhone",
        "MacBook",
      ];
      productCategory === "All"
        ? (productCategory = [...CategoryOptions])
        : (productCategory = req.query.productCategory.split(","));
      req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);
      let sortBy = {};
      if (sort[1]) {
        sortBy[sort[0]] = sort[1];
      } else {
        sortBy[sort[0]] = "asc";
      }
      const result = await userHelper.getSearch(
        search,
        productCategory,
        sortBy,
        page,
        limit
      );
      if (req.session.loggedIn) {
        const user = req.session.user;
        const cartCount = await userHelper.cartCount(req.session.user._id);

        res.render("user-search", {
          userLayout: true,
          loggedIn: true,
          user,
          cartCount,
          result,
          sort,
          search,
        });
      } else {
        res.render("user-search", { userLayout: true, result, sort, search });
      }
    } catch (error) {
      console.log(error);
      res.redirect("/error");
    }
  },

  //user logout
  userLogOut: async (req, res, next) => {
    try {
      await userHelper.getLogOut(req.session.user._id);
      req.session.loggedIn = false;
      req.session.user = null;
      res.redirect("/");
    } catch (error) {
      console.log(error);
      res.redirect("/error");
    }
  },
  //user error pages
  getError: (req, res, next) => {
    try {
      res.render("error", { formLayout: true });
    } catch (error) {
      console.log(error, " in error route");
    }
  },
};
