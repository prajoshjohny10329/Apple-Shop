
const adminHelper = require("../helper/admin-helper");
const userHelper = require("../helper/user-helper");
const zHelper = require("../helper/z-helper");
const cloudinaryHelper = require("../helper/cloudinary-helper");
const cloudinary = require("../utils/cloudnary");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

module.exports = {

  //function for get admin Dashboard
  getAdminLandingPage: async (req, res, next) => {
    try {
      const categoryGraph = await adminHelper.categoryForGraph();
      const adminDashboard = await adminHelper.getAdminDashboard();
      const orderGraph = await adminHelper.orderGraph();
      res.render("admin-home", {
        adminLayout: true,
        categoryGraph,
        adminDashboard,
        orderGraph,
      });
    } catch (error) {
      console.log(error);
      res.redirect("/admin/error");
    }
  },

  //function for admin submit email and password to admin login
  postAdminLogin: (req, res, next) => {
    try {
      const adminData = req.body;
      adminHelper.adminLogin(adminData).then((response) => {
        if (response.status) {
          req.session.admin = true;
          res.redirect("/admin");
        } else {
          errorMessage = response.errorMessage;
          res.render("admin-login", { formLayout: true, errorMessage });
        }
      });
    } catch (error) {
      console.log(error);
      res.redirect("/admin/error");
    }
  },

  //function for get page create new admin profile
  getAdminSignup: (req, res, next) => {
    try {
      res.render("admin-signup", { formLayout: true });
    } catch (error) {
      console.log(error);
      res.redirect("/admin/error");
    }
  },

  //function for submit data to create new admin profile
  postAdminSignup: async (req, res, next) => {
    try {
      let adminData = req.body;
      await adminHelper.adminSIDforSignup(adminData).then((response) => {
        if (response.status) {
          adminHelper.emailCheck(adminData.Admin_Email).then((response) => {
            if (response.status) {
              adminHelper
                .mobileCheck(adminData.Admin_Mobile)
                .then((response) => {
                  if (response.status) {
                    req.session.adminData = adminData;
                    let Otp_Number = "+91" + adminData.Admin_Mobile;
                    let last4 = Otp_Number.slice(-4);
                    let successMessage =
                      "Otp is send your  Mobile ****" + last4;
                    res.render("admin-signupOTP", {
                      formLayout: true,
                      successMessage,
                    });
                    client.verify.v2
                      .services(process.env.TWILIO_SERVICE_SID)
                      .verifications.create({ to: Otp_Number, channel: "sms" })
                      .then((verification) => console.log(verification.status))
                      .catch((e) => {
                        console.log(
                          "Got an error post admin signup:",
                          e.code,
                          e.message
                        );
                      });
                  } else {
                    errorMessage = response.errorMessage;
                    res.render("admin-signup", {
                      formLayout: true,
                      errorMessage,
                    });
                  }
                });
            } else {
              errorMessage = response.errorMessage;
              res.render("admin-signup", { formLayout: true, errorMessage });
            }
          });
        } else {
          errorMessage = response.errorMessage;
          res.render("admin-signup", { formLayout: true, errorMessage });
        }
      });
    } catch (error) {
      console.log(error);
      res.redirect("/admin/error");
    }
  },

  //function to check otp for new admin create
  postAdminSignupOTP: (req, res, next) => {
    try {
      let adminData = req.session.adminData;
      let OtpCode = req.body.userOTP;
      let Otp_Verify_Number = "+91" + req.session.adminData.Admin_Mobile;
      client.verify.v2
        .services(process.env.TWILIO_SERVICE_SID)
        .verificationChecks.create({ to: Otp_Verify_Number, code: OtpCode })
        .then((verification_check) => {
          if (verification_check.status == "approved") {
            adminHelper.createNewAdmin(adminData).then((response) => {
              if (response.status) {
                req.session.admin = true;
                res.redirect("/admin");
              }
            });
          } else {
            let errorMessage = "Sorry wrong OTP! please check and Submit";
            res.render("admin-signupOTP", { formLayout: true, errorMessage });
          }
        })
        .catch((e) => {
          console.error(
            "Got an error on postAdminSignupOTP :",
            e.code,
            e.message
          );
        });
    } catch (error) {
      console.log(error);
      res.redirect("/admin/error");
    }
  },

  //function for submit admin logout
  postAdminLogOut: (req, res, next) => {
    try {
      req.session.admin = false;
      res.redirect("/admin");
    } catch (error) {
      console.log(error);
      res.redirect("/admin/error");
    }
  },

  getAdminUsers: (req, res, next) => {
    try {
      adminHelper.getAllUsers().then((usersData) => {
        res.render("admin-userdata1", { usersData });
      });
    } catch (error) {
      console.log(error);
      res.redirect("/admin/error");
    }
  },

  getAdminSID: (req, res, next) => {
    try {
      res.render("admin-sid1", { formLayout: true });
    } catch (error) {
      console.log(error);
      res.redirect("/admin/error");
    }
  },
  postAdminSecret: (req, res, next) => {
    try {
      let adminData = req.body;
      adminHelper.adminSIDCheck(adminData).then((response) => {
        if (response.status) {
          let Otp_Number = "+91" + response.Admin_Data.Admin_Mobile;
          req.session.Otp_Number = Otp_Number;
          let last4 = Otp_Number.slice(-4);
          let successMessage = "Otp is send your  Mobile ****" + last4;
          res.render("admin-sid2", { formLayout: true, successMessage });
          client.verify.v2
            .services(process.env.TWILIO_SERVICE_SID)
            .verifications.create({ to: Otp_Number, channel: "sms" })
            .then((verification) => console.log(verification.status))
            .catch((e) => {
              console.error("Got an error post adminSID:", e.code, e.message);
            });
        } else {
          let errorMessage = response.errorMessage;
          res.render("admin-sid1", { formLayout: true, errorMessage });
        }
      });
    } catch (error) {
      console.log(error);
      res.redirect("/admin/error");
    }
  },
  postAdminSidOTP: (req, res, next) => {
    try {
      let OtpCode = req.body;
      let Otp_Verify_Number = req.session.Otp_Number;
      client.verify.v2
        .services(process.env.TWILIO_SERVICE_SID)
        .verificationChecks.create({ to: Otp_Verify_Number, code: OtpCode })
        .then((verification_check) => {
          if (verification_check.status == "approved") {
            let successMessage = "Otp is success please Enter New SID ";

            res.render("admin-sid3", { formLayout: true, successMessage });
          } else {
            let errorMessage = "Otp Wrong ! Please cheack ";
            res.render("admin-sid2", { errorMessage });
          }
        })
        .catch((e) => {
          console.error("Got an error postadminSID OTP:", e.code, e.message);
        });
    } catch (error) {
      console.log(error);
      res.redirect("/admin/error");
    }
  },
  getAdminForgot: (req, res, next) => {
    try {
      res.render("admin-forgot1", { formLayout: true });
    } catch (error) {
      console.log(error);
      res.redirect("/admin/error");
    }
  },
  postAdminForgot: (req, res, next) => {
    try {
      let Admin_Email = req.body.Admin_Email;
      adminHelper.AdminEmailCheck(Admin_Email).then((response) => {
        if (response.status) {
          req.session.adminData = response.adminData;
          let Otp_Number = "+91" + response.adminData.Admin_Mobile;
          let last4 = Otp_Number.slice(-4);
          let successMessage = "Otp is send your  Mobile ****" + last4;
          req.session.Otp_Number = Otp_Number;
          res.render("admin-forgot2", { formLayout: true, successMessage });
          client.verify.v2
            .services(process.env.TWILIO_SERVICE_SID)
            .verifications.create({ to: Otp_Number, channel: "sms" })
            .then((verification) => console.log(verification.status))
            .catch((e) => {
              console.error(
                "Got an error  postAdminForgot:",
                e.code,
                e.message
              );
            });
        } else {
          let errorMessage = response.errorMessage;
          res.render("admin-forgot1", { formLayout: true, errorMessage });
        }
      });
    } catch (error) {
      console.log(error);
      res.redirect("/admin/error");
    }
  },
  postAdminForgotOTP: (req, res, next) => {
    try {
      let OtpCode = req.body.adminOTP;
      let Otp_Verify_Number = req.session.Otp_Number;
      client.verify.v2
        .services(process.env.TWILIO_SERVICE_SID)
        .verificationChecks.create({ to: Otp_Verify_Number, code: OtpCode })
        .then((verification_check) => {
          if (verification_check.status == "approved") {
            let adminData = req.session.adminData;
            res.render("admin-forgot3", { formLayout: true });
          } else {
            let errorMessage = "Wrong Otp ! please Check and submit ";
            res.render("admin-forgot2", { formLayout: true, errorMessage });
          }
        })
        .catch((e) => {
          console.error("Got an error  postAdminForgotOTP:", e.code, e.message);
        });
    } catch (error) {
      console.log(error);
      res.redirect("/admin/error");
    }
  },
  postAdminChangePassword: (req, res, next) => {
    try {
      let adminData = req.session.adminData;

      adminHelper.adminChangePassword(adminData).then((response) => {
        if (response.status) {
          req.session.admin = true;
          res.redirect("/admin");
        }
      });
    } catch (error) {
      console.log(error);
      res.redirect("/admin/error");
    }
  },
  getAdminAllUsers: (req, res, next) => {
    try {
      adminHelper.getAllUsers().then((usersData) => {
        res.render("admin-users", { adminLayout: true, usersData });
      });
    } catch (error) {
      console.log(error);
      res.redirect("/admin/error");
    }
  },
  PostAdminBlock: (req, res, next) => {
    try {
      adminHelper.blockUser(req.body.userId);
      res.redirect("/admin/users");
    } catch (error) {
      console.log(error);
      res.redirect("/admin/error");
    }
  },
  PostAdminUnBlock: async (req, res, next) => {
    try {
      await adminHelper.unBlockUser(req.body.userId);
      res.redirect("/admin/users");
    } catch (error) {
      console.log(error);
      res.redirect("/admin/error");
    }
  },
  getCategory: async (req, res, next) => {
    try {
      const result = await adminHelper.getAllCategory();
      res.render("admin-category", { adminLayout: true, result });
    } catch (error) {
      console.log(error);
      res.redirect("/admin/error");
    }
  },
  getAddCategory: (req, res, next) => {
    try {
      res.render("admin-addcategory", { adminLayout: true });
    } catch (error) {
      console.log(error);
      res.redirect("/admin/error");
    }
  },
  postAddCategory: async (req, res, next) => {
    try {
      const result = await adminHelper.categoryCheck(req.body.categoryName);
      if (result != null) {
        errorMessage =
          "This category is already exist please enter new category";
        res.render("admin-addcategory", { adminLayout: true, errorMessage });
      } else {
        const response = await adminHelper.addCategory(req.body.categoryName);
        res.redirect("/admin/category");
      }
    } catch (error) {
      console.log(error);
      res.redirect("/admin/error");
    }
  },
  getCategoryBlock: async (req, res, next) => {
    try {
      let categoryID = req.body.categoryId;
      await adminHelper.blockCategory(categoryID);
      res.redirect("/admin/category");
    } catch (error) {
      console.log(error);
      res.redirect("/admin/error");
    }
  },
  getCategoryUnBlock: async (req, res, next) => {
    try {
      let categoryID = req.body.categoryId;
      await adminHelper.unBlockCategory(categoryID);
      res.redirect("/admin/category");
    } catch (error) {
      console.log(error);
      res.redirect("/admin/error");
    }
  },

  // coupon

  getCoupon: async (req, res, next) => {
    try {
      let coupons = await adminHelper.getAllCoupons();
      coupons = await zHelper.couponsDestructure(coupons)
      res.render("admin-coupon", { adminLayout: true, coupons });
    } catch (error) {
      console.log(error);
      res.redirect("/admin/error");
    }
  },
  getAddCoupon: (req, res, next) => {
    try {
      res.render("admin-addCoupon", { adminLayout: true });
    } catch (error) {
      console.log(error);
      res.redirect("/admin/error");
    }
  },
  postAddCoupon: async (req, res, next) => {
    try {
      
      const cloudResult = await cloudinaryHelper.uploadSingleImage( req.files.couponBanner);

      const couponData = await zHelper.couponDataDestructure(
        req.body,
        cloudResult
      );
      console.log(couponData);
      await adminHelper.AddCoupon(couponData);
      res.redirect("/admin/coupon");
    } catch (error) {
      console.log(error);
      res.redirect("/admin/error");
    }
  },
  getCouponBlock: async (req, res, next) => {
    try {
      let CouponID = req.body.couponId;
      await adminHelper.blockCoupon(CouponID);
      res.redirect("/admin/coupon");
    } catch (error) {
      console.log(error);
      res.redirect("/admin/error");
    }
  },
  getCouponUnBlock: async (req, res, next) => {
    try {
      let CouponID = req.body.couponId;
      await adminHelper.unBlockCoupon(CouponID);
      res.redirect("/admin/coupon");
    } catch (error) {
      console.log(error);
      res.redirect("/admin/error");
    }
  },

  postDeleteCoupon: async (req, res, next) => {
    try {
      const couponData = await adminHelper.getSingleCouponData(
        req.body.deleteCouponID
      );
      console.log(couponData);
      await cloudinaryHelper.deleteCloudImage(couponData.couponImageId);
      await adminHelper.deleteCoupon(req.body.deleteCouponID);
      res.redirect("/admin/coupon");
    } catch (error) {
      res.redirect("/admin/error");
    }
  },

  getAddProduct: async (req, res, next) => {
    try {
      const categoryList = await adminHelper.getCategoryList();
      res.render("admin-addProduct", { adminLayout: true, categoryList });
    } catch (error) {
      console.log(error);
      res.redirect("/admin/error");
    }
  },
  postAddNewProduct: async (req, res, next) => {
    try {
      const productFirstImage = await uploadImage(req.files.productFirstImage);
      async function uploadImage(productFirstImage) {
        try {
          const result = await cloudinary.uploader.upload(
            productFirstImage.tempFilePath,
            { folder: "Apple Shop/Product Images" }
          );
          return result.secure_url;
        } catch (error) {
          console.log("error in single image");
          console.log(error);
        }
      }
      const productImagesURL = await uploadImages(req.files.productImages);
      async function uploadImages(images) {
        try {
          const uploadedUrls = [];
          for (const image of images) {
            const result = await cloudinary.uploader.upload(
              image.tempFilePath,
              {
                folder: "Apple Shop/Product Images",
              }
            );
            uploadedUrls.push(result.secure_url);
          }
          return uploadedUrls;
        } catch (error) {
          console.log("error in multiple image");
          console.log(error);
        }
      }
      let productData = await zHelper.destructingProductData(req.body);
      productData.productFirstImage = productFirstImage;
      productData.productImagesURL = productImagesURL;
      await adminHelper.addProduct(productData);
      res.redirect("/admin/products");
    } catch (error) {
      console.log(error);
      res.redirect("/admin/error");
    }
  },

  //function for admin to get all products 
  getAllProducts: async (req, res, next) => {
    try {
      const products = await adminHelper.getAllProducts();
      res.render("admin-products", { adminLayout: true, products });
    } catch (error) {
      console.log(error);
      res.redirect("/admin/error");
    }
  },

  //function for admin to block product temporary
  blockProduct: async (req, res, next) => {
    try {
      await adminHelper.blockProduct(req.body.blockProductId);
      res.redirect("/admin/products");
    } catch (error) {
      console.log(error);
      res.redirect("/admin/error");
    }
  },

  //function for admin to un block product temporary
  unBlockProducts: async (req, res, next) => {
    try {
      await adminHelper.unBlockProduct(req.body.unBlockProductId);
      res.redirect("/admin/products");
    } catch (error) {
      console.log(error);
      res.redirect("/admin/error");
    }
  },

  //function for admin to delete product permanently
  postDeleteProduct: async (req, res, next) => {
    try {
      const productData = await adminHelper.getProductForEdit(req.body.deleteProductID);
      let productImages = []
      productImages.push(productData.productImagesURL)
      productImages.push(productData.productFirstImage)
      const imageArray = productImages.flat();
      await cloudinaryHelper.deleteCloudImages(imageArray);
      await adminHelper.deleteProduct(req.body.deleteProductID);
      res.redirect("/admin/products");
    } catch (error) {
      res.redirect("/admin/error");
    }
  },

  //function for admin to get edit product product permanently
  productForEdit: async (req, res, next) => {
    try {
      const productData = await adminHelper.getProductForEdit(req.body.editProductId);
      console.log(productData);
      req.session.productId = productData._id
      const category = await zHelper.getCategory(productData.productCategory);
      const checkers = await zHelper.Checkers(productData);
      res.render("admin-productEdit", {
        adminLayout: true,
        category,
        productData,
        checkers,
      });
    } catch (error) {
      console.log(error);
      res.redirect("/admin/error");
    }
  },

  //function for admin to submit edit product permanently
  postProductForEdit: async (req, res, next) => {
    let productData = await zHelper.destructingProductData(req.body);
    if(req.files){
      if(req.files.changeFirstImage){
        console.log('first image');
        let firstImagePath = req.files.changeFirstImage.tempFilePath
        console.log(firstImagePath);
        const firstImageResponse = await cloudinaryHelper.uploadProductImage(firstImagePath)
        productData.productFirstImage = firstImageResponse.imageURL
        productData.productFirstImageId = firstImageResponse.imageId
      }
      if(req.files.changeImagesURL){
       console.log('images');
        const imagePath = await zHelper.formatChangeImagesPath(req.files.changeImagesURL)
        const cloudResponse = await cloudinaryHelper.uploadEditImages(imagePath)
        productData.productImagesURL = cloudResponse.imageURL
        productData.productImagesId = cloudResponse.imageId
      }
      await adminHelper.updateEditProduct(req.session.productId,productData)
    }
    else{
      console.log('files not exist');
      await adminHelper.updateEditProduct(req.session.productId,productData)
    }
    res.redirect("/admin/products");
    
  },

  //function for admin to view single product permanently
  getProduct: async (req, res, next) => {
    try {
      const currentProduct = await adminHelper.getProductForEdit(req.body.viewProductId);
      res.render("admin-viewOneProduct", { adminLayout: true, currentProduct });
    } catch (error) {
      console.log(error);
      res.redirect("/admin/error");
    }
  },
  postProductStock: async (req, res, next) => {
    try {
      console.log('stock change');
      await adminHelper.postProductStock(
        req.body.productId,
        req.body.productNewSTock
      );
      const currentProduct = await adminHelper.getProductForEdit(
        req.body.productId
      );
      res.render("admin-viewOneProduct", { adminLayout: true, currentProduct });
    } catch (error) {
      console.log(error);
      res.redirect("/admin/error");
    }
  },

  postProductOffer: async (req, res, next) => {
    try {
      console.log('offers change');
      console.log(req.body);
      await adminHelper.postProductOffer(
        req.body.productId,
        req.body.productNewOffer,
        req.body.productLastPrice
      );
      const currentProduct = await adminHelper.getProductForEdit(
        req.body.productId
      );
      res.render("admin-viewOneProduct", { adminLayout: true, currentProduct });
    } catch (error) {
      console.log(error);
      res.redirect("/admin/error");
    }
  },

  ////orders

  getOrders: async (req, res, next) => {
    try {
      let allOrders = await adminHelper.getAllOrders();
      allOrders = await zHelper.myOrdersDestructure(allOrders);
      res.render("admin-orders", { adminLayout: true, allOrders });
    } catch (error) {
      console.log(error);
      res.redirect("/admin/error");
    }
  },
  viewOneOrder: async (req, res, next) => {
    try {
      const currentOrder = await userHelper.getOrderProducts(
        req.body.viewOrderId
      );
      let orderData = await adminHelper.getOrderData(req.body.viewOrderId);
      let orderStatus = await zHelper.oneOrderStatus(orderData);
      res.render("admin-viewOneOrder", {
        adminLayout: true,
        currentOrder,
        orderData,
        orderStatus,
      });
    } catch (error) {
      console.log(error);
      res.redirect("/admin/error");
    }
  },

  //admin see full order and option for change status function
  changeStatus: async (req, res, next) => {
    try {
      const currentOrder = await userHelper.getOrderProducts(
        req.body.editOrderId
      );
      const orderData = await adminHelper.getOrderData(req.body.editOrderId);
      res.render("admin-changeStatus", {
        adminLayout: true,
        currentOrder,
        orderData,
      });
    } catch (error) {
      console.log(error);
      res.redirect("/admin/error");
    }
  },

  //admin submit change order status function
  postOrderStatus: async (req, res, next) => {
    try {
      await adminHelper.changeOrderStatus(
        req.body.orderId,
        req.body.orderStatus
      );
      res.redirect("/admin/all-orders");
    } catch (error) {
      console.log(error);
      res.redirect("/admin/error");
    }
  },

  //admin submit order confirm  cancel function
  postConfirmCancel: async (req, res, next) => {
    try {
      console.log('post confirm cancel');
      let walletAmount = 0;
      const orderData = await adminHelper.getOrderData(req.body.cancelOrderId);
      const products = orderData.orderObj.products
      await adminHelper.changeProductQuantityCancel(products);
      if (orderData.orderObj.paymentMethod == "COD") {
        await adminHelper.sendOrderToCancel(orderData);
        await adminHelper.removeOrder(req.body.cancelOrderId);
      } else {
        walletAmount = orderData.orderObj.totalAmount;
        const userWallet = await adminHelper.getOneUserOneWallet(orderData.orderObj.userId);
        if (userWallet) {
          walletAmount = walletAmount + userWallet.walletAmount;
          await adminHelper.updateWallet(walletAmount, userWallet._id);
          console.log(walletAmount);
        } else {
          let insertData = {
            userId: orderData.orderObj.userId,
            walletAmount: orderData.orderObj.totalAmount,
          };
          console.log(insertData);
          await adminHelper.createNewWallet(insertData);
        }
        await adminHelper.sendOrderToCancel(orderData);
        await adminHelper.removeOrder(req.body.cancelOrderId);
      }
      res.redirect("/admin/all-orders");
    } catch (error) {
      console.log(error);
      res.redirect("/admin/error");
    }
  },

  // show all banners for admin function
  getBanners: async (req, res, next) => {
    try {
      const userBanners = await adminHelper.getAllBanners();
      res.render("admin-banners", { adminLayout: true, userBanners });
    } catch (error) {
      console.log(error);
      res.redirect("/admin/error");
    }
  },

  //admin get page for add new banner function
  getAddBanner: async (req, res, next) => {
    try {
      const categoryList = await adminHelper.getCategoryList();
      res.render("admin-addBanner", { adminLayout: true, categoryList });
    } catch (error) {
      console.log(error);
      res.redirect("/admin/error");
    }
  },

  //admin submit new banner for  user side 
  postAddBanner: async (req, res, next) => {
    try {
      const cloudResult = await cloudinaryHelper.uploadBannerImage(
        req.files.bannerImage
      );
      const userBanner = {};
      userBanner.isActive = true;
      userBanner.Date = new Date();
      userBanner.BannerCategory = req.body.BannerCategory;
      userBanner.bannerUrl = cloudResult.secure_url;
      userBanner.bannerId = cloudResult.public_id;
      await adminHelper.postAddBanner(userBanner);
      res.redirect("/admin/all-banners");
    } catch (error) {
      console.log(error);
      res.redirect("/admin/error");
    }
  },

  //admin block banner for user side function
  postBlockBanner: async (req, res, next) => {
    try {
      await adminHelper.blockBanner(req.body.bannerId);
      res.redirect("/admin/all-banners");
    } catch (error) {
      console.log(error);
      res.redirect("/admin/error");
    }
  },

  //admin unblock banner for user side function
  postUnBlockBanner: async (req, res, next) => {
    try {
      await adminHelper.unBlockBanner(req.body.bannerId);
      res.redirect("/admin/all-banners");
    } catch (error) {
      console.log(error);
      res.redirect("/admin/error");
    }
  },

  //admin delete banner  function
  postDeleteBanner: async (req, res, next) => {
    try {
      const bannerData = await adminHelper.getSingleBannerData(
        req.body.bannerId
      );
      await cloudinaryHelper.deleteCloudImage(bannerData.bannerId);
      await adminHelper.deleteBanner(req.body.bannerId);
      res.redirect("/admin/all-banners");
    } catch (error) {
      res.redirect("/admin/error");
    }
  },

  

  //Admin sales report function with query
  salesReport: async (req, res) => {
    try {
      let queryMessage = 'This report is based on all delivered order until now'
      const { start, end } = req.query;
      const query = {};
      query.orderStatus = { "orderObj.status": "Delivered" };
      if (start || end) {
        queryMessage = 'This report is based on all delivered orders from '+ start.slice(0, 10) + ' to '+ end.slice(0, 10) 
        query.date = {};
        if (start) {
          query.date.$gte = new Date(start);
        }
        if (end) {
          query.date.$lte = new Date(end);
        }
      }
      console.log(queryMessage);
      let salesReport = await adminHelper.getSalesReport(query);
      salesReport = await zHelper.salesReportDestructure(salesReport)
      let totalRevenue = 0;
      const months = [
        "JAN",
        "FEB",
        "MARCH",
        "APRIL",
        "MAY",
        "JUNE",
        "JULY",
        "AUG",
        "SEP",
        "OCT",
        "NOV",
        "DEC",
      ];
      for (let i = 0; i < salesReport.length; i++) {
        salesReport[i].date =
          salesReport[i].orderObj.data.getDate() +
          "-" +
          months[salesReport[i].orderObj.data.getMonth()] +
          "-" +
          salesReport[i].orderObj.data.getFullYear();
        totalRevenue = totalRevenue + salesReport[i].orderObj.totalAmount;
      }
      res.render("admin-salesReport", {
        adminLayout: true,
        queryMessage,
        salesReport,
        totalRevenue,
      });
    } catch (error) {
      console.log(error);
      res.redirect("/admin/error");
    }
  },

  //error page rendering function
  getError: (req, res, next) => {
    try {
      res.render("error", { formLayout: true });
    } catch (error) {
      console.log(error, " in error admin route");
    }
  },
};
