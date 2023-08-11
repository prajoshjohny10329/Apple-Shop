var express = require('express');
var router = express.Router();
const adminHelper = require("../helper/admin-helper");
const userHelpers = require('../helper/user-helper');
const { render } = require('../app');
const middleware = require('../middlewares/middlewares');
const adminController = require('../controllers/admin-controller');
const cloudinary = require('../utils/cloudnary');


// admin routes
router.get('/',middleware.adminIsLogged,adminController.getAdminLandingPage)

router.post('/admin-login',adminController.postAdminLogin)

router.get('/admin-logout',adminController.postAdminLogOut)

router.get('/adminSignup',adminController.getAdminSignup)

router.post('/adminSignup',adminController.postAdminSignup)

router.post('/adminsignupOTP',adminController.postAdminSignupOTP)

router.get('/adminSID',adminController.getAdminSID)

router.post('/adminSID',adminController.postAdminSecret)

router.get('/adminUsers',middleware.adminMiddleware,adminController.getAdminUsers)

router.post('/adminSID_OTP',adminController.postAdminSidOTP)

//admin forgot password routes
router.get('/adminForgot',adminController.getAdminForgot)

router.post('/adminForgot',adminController.postAdminForgot)

router.post('/adminForgotOTP',adminController.postAdminForgotOTP)

router.post('/adminChangePassword',adminController.postAdminChangePassword)

//admin user routes
router.get('/users',middleware.adminMiddleware,adminController.getAdminAllUsers)

router.post('/block-user',middleware.adminMiddleware,adminController.PostAdminBlock)

router.post('/unBlock-user',middleware.adminMiddleware,adminController.PostAdminUnBlock)

//admin category routes
router.get('/category',middleware.adminMiddleware,adminController.getCategory)

router.get('/add-category',middleware.adminMiddleware,adminController.getAddCategory)

router.post('/add-category',middleware.adminMiddleware,adminController.postAddCategory)

router.post('/category-block',middleware.adminMiddleware,adminController.getCategoryBlock)

router.post('/category-unBlock',middleware.adminMiddleware,adminController.getCategoryUnBlock)

//admin coupon routes
router.get('/coupon',middleware.adminMiddleware,adminController.getCoupon)

router.get('/add-coupon',middleware.adminMiddleware,adminController.getAddCoupon)

router.post('/add-coupon',middleware.adminMiddleware,adminController.postAddCoupon)

router.post('/coupon-block',middleware.adminMiddleware,adminController.getCouponBlock)

router.post('/coupon-unBlock',middleware.adminMiddleware,adminController.getCouponUnBlock)

router.post('/delete-coupon',middleware.adminMiddleware,adminController.postDeleteCoupon)

//admin product routes
router.get('/add-new-product',middleware.adminMiddleware,adminController.getAddProduct)

router.post('/add-new-product',middleware.adminMiddleware,adminController.postAddNewProduct)

router.get('/products',middleware.adminMiddleware,adminController.getAllProducts)

router.post('/block-product',middleware.adminMiddleware,adminController.blockProduct)

router.post('/unblock-product',middleware.adminMiddleware,adminController.unBlockProducts)

router.post('/edit-product',adminController.productForEdit)

router.post('/edit-product-submit',adminController.postProductForEdit)

router.post('/delete-product',middleware.adminMiddleware,adminController.postDeleteProduct)

router.post('/view-single-product',middleware.adminMiddleware,adminController.getProduct)

router.post('/stock-changer',middleware.adminMiddleware,adminController.postProductStock)

router.post('/offer-changer',middleware.adminMiddleware,adminController.postProductOffer)

//admin banners routes
router.get('/all-banners',middleware.adminMiddleware,adminController.getBanners)

router.get('/add-banner',middleware.adminMiddleware,adminController.getAddBanner)

router.post('/add-banner',middleware.adminMiddleware,adminController.postAddBanner)

router.post('/block-banner',middleware.adminMiddleware,adminController.postBlockBanner)

router.post('/unBlock-banner',middleware.adminMiddleware,adminController.postUnBlockBanner)

router.post('/delete-banner',middleware.adminMiddleware,adminController.postDeleteBanner)

//admin order routes
router.get('/all-orders',middleware.adminMiddleware,adminController.getOrders)

router.post('/view-order',middleware.adminMiddleware,adminController.viewOneOrder)

router.post('/change-status/',middleware.adminMiddleware,adminController.changeStatus)

router.post('/change-order-status',middleware.adminMiddleware,adminController.postOrderStatus)

router.post('/confirm-cancel',middleware.adminMiddleware,adminController.postConfirmCancel)

//admin sales routes
router.get("/sales-report",middleware.adminMiddleware,adminController.salesReport);

//admin error routes
router.get("/error", adminController.getError);










module.exports = router;
