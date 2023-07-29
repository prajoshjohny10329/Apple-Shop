
const db = require('../config/connection')
var collection = require('../config/collection');
const ObjectId=require("mongodb").ObjectId
const bcrypt = require('bcrypt');
const { response } = require('../app');
const { AwsInstance } = require('twilio/lib/rest/accounts/v1/credential/aws');



module.exports = {


  getAllUsers: () => {
    return new Promise(async (res, rej) => {
      try {
        let users = await db
          .get()
          .collection(collection.USER_COLLECTION)
          .find()
          .toArray();
        res(users);
      } catch (error) {
        console.log(error)
      }
    });
  },
  deleteUser: (userID) => {
    return new Promise((res, rej) => {
      try {
        db.get()
          .collection(collection.USER_COLLECTION)
          .deleteOne({ _id: new ObjectId(userID) })
          .then((response) => {
            console.log(response);
            res(response);
          });
      } catch (error) {
        console.log(error)
      }
    });
  },
  getUser: (userID) => {
    return new Promise((res, rej) => {
      try {
        db.get()
          .collection(collection.USER_COLLECTION)
          .findOne({ _id: new ObjectId(userID) })
          .then((user) => {
            res(user);
          });
      } catch (error) {
        console.log(error)
      }
    });
  },
  updateUser: (userID, userDetails) => {


    return new Promise((res, rej) => {
      try {
        db.get()
          .collection(collection.USER_COLLECTION)
          .updateOne(
            { _id: new ObjectId(userID) },
            {
              $set: {
                Name: userDetails.Name,
                Email: userDetails.Email,
                Mobile: userDetails.Mobile,
              },
            }
          )
          .then((response) => {
            res(response);
          });
      } catch (error) {
        console.log(error)
      }
    });
  },

  deleteProduct: (userID) => {
    return new Promise((res, rej) => {
      try {
        db.get()
          .collection(collection.PRODUCT_COLLECTION)
          .deleteOne({ _id: new ObjectId(userID) })
          .then((response) => {
            console.log(response);
            res(response);
          });
      } catch (error) {
        console.log(error)
      }
    });
  },
  getProduct: (userID) => {
    return new Promise((res, rej) => {
      try {
        db.get()
          .collection(collection.PRODUCT_COLLECTION)
          .findOne({ _id: new ObjectId(userID) })
          .then((user) => {
            res(user);
          });
      } catch (error) {
        console.log(error)
      }
    });
  },
  updateProduct: (productID, productDetails) => {
    return new Promise((res, rej) => {
      try {
        db.get()
          .collection(collection.PRODUCT_COLLECTION)
          .updateOne(
            { _id: new ObjectId(productID) },
            {
              $set: {
                productName: productDetails.productName,
                productCategory: productDetails.productCategory,
                productPrice: productDetails.productPrice,
                productDescription: productDetails.productPrice,
              },
            }
          )
          .then((response) => {
            res(response);
          });
      } catch (error) {
        console.log(error)
      }
    });
  },
  addUsersbyadmin: (userData) => {
    return new Promise(async (resolve, reject) => {
      try {
        let response = {};
        let user = await db
          .get()
          .collection(collection.USER_COLLECTION)
          .findOne({ Email: userData.Email });
        if (user) {
          response.status = false;
          response.message = "login failed case of email";
          resolve(response);
        } else {
          response.status = true;
          userData.Password = await bcrypt.hash(userData.Password, 10);
          db.get()
            .collection(collection.USER_COLLECTION)
            .insertOne(userData)
            .then((resp) => {
              resolve(response);
            });
        }
      } catch (error) {
        console.log(error)
      }
    });
  },
  addAdmin: (adminData) => {
    return new Promise(async (resolve, rej) => {
      try {
        adminData.Admin_SID = await bcrypt.hash(adminData.Admin_SID, 10);
        db.get()
          .collection(collection.ADMIN_HEAD)
          .insertOne(adminData)
          .then((data) => {
            resolve(data.insertedId);
          });
      } catch (error) {
        console.log(error)
      }
    });
  },
  adminSIDCheck: (adminData) => {
    return new Promise(async (resolve, reject) => {
      try {
        let response = {};
        let adminHead = await db
          .get()
          .collection(collection.ADMIN_HEAD)
          .findOne({ Admin_Email: adminData.Admin_Email });
        response.Admin_Data = adminHead;
        if (adminHead) {
          bcrypt
            .compare(adminData.Admin_SID, adminHead.Admin_SID)
            .then((status) => {
              if (status) {
                response.status = true;
                resolve(response);
              } else {
                response.status = false;
                response.errorMessage = " Sorry! Access  failed case Invalid SID";
                resolve(response);
              }
            });
        } else {
          response.errorMessage = " Sorry! This Email id is not Access ";
          response.status = false;
          resolve(response);
        }
      } catch (error) {
        console.log(error)
      }
    });
  },
  adminSIDforSignup: (adminData) => {
    return new Promise(async (resolve, reject) => {
     try {
       let response = {};
       let adminHead = await db
         .get()
         .collection(collection.ADMIN_HEAD)
         .findOne({});
       response.Admin_Data = adminHead;
       if (adminHead) {
         bcrypt
           .compare(adminData.Admin_SID, adminHead.Admin_SID)
           .then((status) => {
             if (status) {
               response.status = true;
               resolve(response);
             } else {
               response.status = false;
               response.errorMessage = " Sorry! Access  failed case Invalid SID";
               resolve(response);
             }
           });
       } else {
         response.errorMessage = " Sorry! Access  failed case Invalid SID";
         response.status = false;
         resolve(response);
       }
     } catch (error) {
      console.log(error)
     }
    });
  },
  emailCheck: (Admin_Email) => {
    return new Promise(async (resolve, reject) => {
      try {
        let response = {};
        let user = await db
          .get()
          .collection(collection.ADMIN_COLLECTION)
          .findOne({ Admin_Email: Admin_Email });
        if (user) {
          response.status = false;
          response.errorMessage = " Sorry! This  Email address alredy exists ";
          resolve(response);
        } else {
          response.status = true;
          resolve(response);
        }
      } catch (error) {
        console.log(error)
      }
    });
  },
  mobileCheck: (Admin_Mobile) => {
    return new Promise(async (resolve, reject) => {
      try {
        let response = {};
        let mobile_current = await db
          .get()
          .collection(collection.ADMIN_COLLECTION)
          .findOne({ Admin_Mobile: Admin_Mobile });
        if (mobile_current) {
          response.status = false;
          response.errorMessage = " Sorry! This Mobile Number alredy exists ";
          resolve(response);
        } else {
          response.status = true;
          resolve(response);
        }
      } catch (error) {
        console.log(error)
      }
    });
  },
  creatNewAdmin: (adminData) => {
    return new Promise(async (resolve, reject) => {
      try {
        let response = {};
        adminData.Admin_Password = await bcrypt.hash(
          adminData.Admin_Password,
          10
        );
        db.get()
          .collection(collection.ADMIN_COLLECTION)
          .insertOne(adminData)
          .then((response) => {
            response.status = true;
            resolve(response);
          });
      } catch (error) {
        console.log(error)
      }
    });
  },
  adminLogin: (adminData) => {
    return new Promise(async (resolve, reject) => {
      try {
        let response = {};
        let admin = await db
          .get()
          .collection(collection.ADMIN_COLLECTION)
          .findOne({ Admin_Email: adminData.Admin_Email });
        if (admin) {
          bcrypt
            .compare(adminData.Admin_Password, admin.Admin_Password)
            .then((status) => {
              if (status) {
                response.status = true;
                resolve(response);
              } else {
                response.status = false;
                response.errorMessage =
                  "Sorry ! Acces Failed Case of Invalid Password ";
                resolve(response);
              }
            });
        } else {
          response.status = false;
          response.errorMessage = "Sorry !Acces Failed Case of Invalid Email Id";
          resolve(response);
        }
      } catch (error) {
        console.log(error)
      }
    });
  },
  AdminEmailCheck: (Admin_Email) => {
    return new Promise(async (resolve, reject) => {
      try {
        let response = {};
        let adminData = await db
          .get()
          .collection(collection.ADMIN_COLLECTION)
          .findOne({ Admin_Email: Admin_Email });
        if (adminData) {
          response.status = true;
          response.adminData = adminData;
          resolve(response);
        } else {
          response.status = false;
          response.errorMessage = " Sorry! This  Email address not exists ";
          resolve(response);
        }
      } catch (error) {
        console.log(error)
      }
    });
  },
  adminChangePassword: (adminData) => {
    return new Promise(async (resolve, reject) => {
      try {
        let response = {};
        let admin = await db
          .get()
          .collection(collection.ADMIN_COLLECTION)
          .findOne({ Admin_Email: adminData.Admin_Email });
        adminData.Admin_Password = await bcrypt.hash(
          adminData.Admin_Password,
          10
        );
        db.get()
          .collection(collection.ADMIN_COLLECTION)
          .updateOne(
            { _id: admin._id },
            { $set: { Admin_Password: adminData.Admin_Password } }
          );
        response.status = true;
        resolve(response);
      } catch (error) {
        console.log(error)
      }
    });
  },
  blockUser: (userID) => {
    return new Promise(async (resolve, reject) => {
      try {
        await db
          .get()
          .collection(collection.USER_COLLECTION)
          .updateOne(
            { _id: new ObjectId(userID) },
            { $set: { userStatus: false } }
          );
        resolve();
      } catch (error) {
        console.log(error)
      }
    });
  },
  unBlockUser: (userID) => {
    return new Promise(async (resolve, reject) => {
      try {
        await db
          .get()
          .collection(collection.USER_COLLECTION)
          .updateOne(
            { _id: new ObjectId(userID) },
            { $set: { userStatus: true } }
          );
        resolve();
      } catch (error) {
        console.log(error)
      }
    });
  },
  getAllCategory: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const users = await db
          .get()
          .collection(collection.CATEGORY_COLLECTION)
          .find()
          .toArray();
        resolve(users);
      } catch (error) {
        console.log(error)
      }
    });
  },
  categoryCheck: (CategoryName) => {
    return new Promise(async (res, rej) => {
      try {
        const result = await db
          .get()
          .collection(collection.CATEGORY_COLLECTION)
          .findOne({ categoryName: { $regex: CategoryName, $options: "i" } });
        res(result);
      } catch (error) {
        console.log(error)
      }
    });
  },
  addCategory: (CategoryName) => {
    return new Promise(async (res, rej) => {
      try {
        const result = await db
          .get()
          .collection(collection.CATEGORY_COLLECTION)
          .insertOne({ categoryName: CategoryName, CategoryStatus: true });
        res(result);
      } catch (error) {
        console.log(error)
      }
    });
  },
  blockCategory: (categoryID) => {
    return new Promise(async (res, rej) => {
      try {
        let CategoryStatus = false;
        await db
          .get()
          .collection(collection.CATEGORY_COLLECTION)
          .updateOne(
            { _id: new ObjectId(categoryID) },
            { $set: { CategoryStatus: CategoryStatus } }
          );
        res();
      } catch (error) {
        console.log(error)
      }
    });
  },
  unBlockCategory: (categoryID) => {
    return new Promise(async (res, rej) => {
      try {
        let CategoryStatus = true;
        await db
          .get()
          .collection(collection.CATEGORY_COLLECTION)
          .updateOne(
            { _id: new ObjectId(categoryID) },
            { $set: { CategoryStatus: CategoryStatus } }
          );
        res();
      } catch (error) {
        console.log(error)
      }
    });
  },
  getCategoryList: (categoryID) => {
    return new Promise(async (res, rej) => {
      try {
        const CategoryList = await db
          .get()
          .collection(collection.CATEGORY_COLLECTION)
          .find({ CategoryStatus: true })
          .toArray();
        res(CategoryList);
      } catch (error) {
        console.log(error)
      }
    });
  },
  addProduct: (productData) => {
    return new Promise(async (res, rej) => {
 try {
       productCategoryFull = await db
         .get()
         .collection(collection.CATEGORY_COLLECTION)
         .findOne({ categoryName: productData.productCategory });
       productData.productCategoryId = productCategoryFull._id;
       await db
         .get()
         .collection(collection.PRODUCTS_COLLECTION)
         .insertOne(productData);
       res();
 } catch (error) {
  console.log(error)
 }
    });
  },
  
  getAllProducts: () => {
    return new Promise(async (res, rej) => {
      try {
        let products = await db
          .get()
          .collection(collection.PRODUCTS_COLLECTION)
          .find()
          .toArray();
        res(products);
      } catch (error) {
        console.log(error)
      }
    });
  },
  blockProduct: (productID) => {
    return new Promise(async (res, rej) => {
      try {
        await db
          .get()
          .collection(collection.PRODUCTS_COLLECTION)
          .updateOne(
            { _id: new ObjectId(productID) },
            { $set: { productActiveStatus: false } }
          );
        res();
      } catch (error) {
        console.log(error)
      }
    });
  },
  unBlockProduct: (productID) => {
    return new Promise(async (res, rej) => {
      try {
        await db
          .get()
          .collection(collection.PRODUCTS_COLLECTION)
          .updateOne(
            { _id: new ObjectId(productID) },
            { $set: { productActiveStatus: true } }
          );
        res();
      } catch (error) {
        console.log(error)
      }
    });
  },
  getProductForEdit: (productID) => {
    return new Promise(async (res, rej) => {
      try {
        const product = await db
          .get()
          .collection(collection.PRODUCTS_COLLECTION)
          .findOne({ _id: new ObjectId(productID) });
        res(product);
      } catch (error) {
        console.log(error)
      }
    });
  },
  postProductStock: (productID, newStock) => {
    return new Promise(async (resolve, reject) => {
      try {
        newStock = parseInt(newStock);
        console.log(newStock);
        await db
          .get()
          .collection(collection.PRODUCTS_COLLECTION)
          .updateOne(
            { _id: new ObjectId(productID) },
            { $set: { ProductStock: newStock } }
          );
        resolve();
      } catch (error) {
        console.log(error)
      }
    });
  },

  postProductOffer: (productID, newOffer,newLastPrice) => {
    return new Promise(async (resolve, reject) => {
      try {
        console.log('product offer database');
        newOffer = parseInt(newOffer);
        newLastPrice = parseInt(newLastPrice);
        await db
          .get()
          .collection(collection.PRODUCTS_COLLECTION)
          .updateOne(
            { _id: new ObjectId(productID) },
            { $set: { productOffer: newOffer ,productLastPrice : newLastPrice} }
          );
        resolve();
      } catch (error) {
        console.log(error)
      }
    });
  },
  ///coupon

  getAllCoupons: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const getAllCoupons = await db
          .get()
          .collection(collection.COUPON_COLLECTION)
          .find()
          .toArray();
        resolve(getAllCoupons);
      } catch (error) {
        console.log(error)
      }
    });
  },
  AddCoupon: (couponData) => {
    return new Promise(async (resolve, reject) => {
      try {
        await db
          .get()
          .collection(collection.COUPON_COLLECTION)
          .insertOne(couponData);
        resolve();
      } catch (error) {
        console.log(error)
      }
    });
  },
  blockCoupon: (CouponID) => {
    return new Promise(async (res, rej) => {
      try {
        let isCouponActive = false;
        await db
          .get()
          .collection(collection.COUPON_COLLECTION)
          .updateOne(
            { _id: new ObjectId(CouponID) },
            { $set: { isCouponActive: isCouponActive } }
          );
        res();
      } catch (error) {
        console.log(error)
      }
    });
  },
  unBlockCoupon: (CouponID) => {
    return new Promise(async (res, rej) => {
      try {
        let isCouponActive = true;
        await db
          .get()
          .collection(collection.COUPON_COLLECTION)
          .updateOne(
            { _id: new ObjectId(CouponID) },
            { $set: { isCouponActive: isCouponActive } }
          );
        res();
      } catch (error) {
        console.log(error)
      }
    });
  },

  ////orders

  getAllOrders: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const allOrders = await db
          .get()
          .collection(collection.ORDER_COLLECTION)
          .find()
          .toArray();
        resolve(allOrders);
      } catch (error) {
        console.log(error)
      }
    });
  },
  getOrderData: (orderId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const orderData = await db
          .get()
          .collection(collection.ORDER_COLLECTION)
          .findOne({ _id: new ObjectId(orderId) })
        resolve(orderData);
      } catch (error) {
        console.log(error)
      }
    });
  },
  changeOrderStatus: (orderId, orderStatus) => {
    return new Promise(async (resolve, reject) => {
      try {
        await db
          .get()
          .collection(collection.ORDER_COLLECTION)
          .updateOne(
            { _id: new ObjectId(orderId) },
            { $set: { "orderObj.status": orderStatus } }
          );
        resolve();
      } catch (error) {
        console.log(error)
      }
    });
  },
  sendOrderToCancel: (orderData) => {
    return new Promise(async (resolve, reject) => {
      try {
        await db.get().collection(collection.CANCEL_ORDER_COLLECTION).insertOne(orderData);
        resolve();
      } catch (error) {
        console.log(error)
      }
    });
  },
  removeOrder: (orderId) => {
    return new Promise(async (resolve, reject) => {
     try {
       await db.get().collection(collection.ORDER_COLLECTION).deleteOne({_id:new ObjectId(orderId)});
       resolve();
     } catch (error) {
      console.log(error)
     }
    });
  }, 
  ///wallet 
  getOneUserOneWallet:(userId)=>{
    return new Promise(async (resolve, reject) => {
      try {
        const user = await db.get().collection(collection.WALLET_COLLECTION).findOne({userId:new ObjectId(userId)})
        resolve(user)
      } catch (error) {
        console.log(error)
      }
    })
  },

  createNewWallet:(insertData)=>{
    return new Promise(async (resolve, reject) => {
      try {
        const user = await db.get().collection(collection.WALLET_COLLECTION).insertOne(insertData)
        resolve(user)
      } catch (error) {
        console.log(error)
      }
    })
  },
  updateWallet:(walletAmount,walletId)=>{
    return new Promise(async (resolve, reject) => {
      try {
        const user = await db.get().collection(collection.WALLET_COLLECTION).updateOne({_id:walletId},{$set:{walletAmount:walletAmount}})
        resolve()
      } catch (error) {
        console.log(error)
      }
    })
  },


  ///banners
  getAllBanners: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const banners = await db
          .get()
          .collection(collection.BANNER_COLLECTION)
          .find()
          .toArray();
        resolve(banners);
      } catch (error) {
        console.log(error)
      }
    });
  },
  postAddBanner: (userBannerData) => {
    return new Promise(async (resolve, reject) => {
     try {
       await db
         .get()
         .collection(collection.BANNER_COLLECTION)
         .insertOne(userBannerData);
       resolve();
     } catch (error) {
      console.log(error)
     }
    });
  },

  blockBanner: (bannerId) => {
    return new Promise(async (resolve, reject) => {
      try {
        await db
          .get()
          .collection(collection.BANNER_COLLECTION)
          .updateOne(
            { _id: new ObjectId(bannerId) },
            { $set: { isActive: false } }
          );
  
        resolve();
      } catch (error) {
        console.log(error)
      }
    });
  },
  unBlockBanner: (bannerId) => {
    return new Promise(async (resolve, reject) => {
      try {
        await db
          .get()
          .collection(collection.BANNER_COLLECTION)
          .updateOne(
            { _id: new ObjectId(bannerId) },
            { $set: { isActive: true } }
          );
  
        resolve();
      } catch (error) {
        console.log(error)
      }
    });
  },
  deleteBanner: (bannerId) => {
    return new Promise(async (resolve, reject) => {
      try {
        await db
          .get()
          .collection(collection.BANNER_COLLECTION)
          .deleteOne({ _id: new ObjectId(bannerId) });
        resolve();
      } catch (error) {
        console.log(error)
      }
    });
  },
  getSingleBannerData: (bannerId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const bannerData = await db
          .get()
          .collection(collection.BANNER_COLLECTION)
          .findOne({ _id: new ObjectId(bannerId) });
        resolve(bannerData);
      } catch (error) {
        console.log(error)
      }
    });
  },
  ///sales report
  getSalesReport: (query) => {
   
    return new Promise(async (resolve, reject) => {
      try {
        if (query.date) {
          let salesReport = await db
            .get()
            .collection(collection.ORDER_COLLECTION)
            .find({ $and: [query.orderStatus, { "orderObj.data": query.date }] })
            .toArray();
          resolve(salesReport);
        } else {
          let salesReport = await db
            .get()
            .collection(collection.ORDER_COLLECTION)
            .find(query.orderStatus)
            .toArray();
          resolve(salesReport);
        }
      } catch (error) {
        console.log(error)
      }
    });
  },

  //get product graph
  categoryForGraph: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const category = await db
          .get()
          .collection(collection.CATEGORY_COLLECTION)
          .find()
          .toArray();
        const categoryArray = category.map((category) => category.categoryName);
        let totalProductArray = [];
        let productActiveTrue = [];
        let productActiveFalse = [];
        let totalProduct = 0;
        for (let i = 0; i < categoryArray.length; i++) {
          let count = await db
            .get()
            .collection(collection.PRODUCTS_COLLECTION)
            .find({ productCategory: categoryArray[i] })
            .count();
          totalProductArray.push(count);
          totalProduct = totalProduct + count;
        }
        for (let i = 0; i < categoryArray.length; i++) {
          let count = await db
            .get()
            .collection(collection.PRODUCTS_COLLECTION)
            .find({
              $and: [
                { productCategory: categoryArray[i] },
                { productActiveStatus: true },
              ],
            })
            .count();
          productActiveTrue.push(count);
        }
        for (let i = 0; i < categoryArray.length; i++) {
          let count = await db
            .get()
            .collection(collection.PRODUCTS_COLLECTION)
            .find({
              $and: [
                { productCategory: categoryArray[i] },
                { productActiveStatus: false },
              ],
            })
            .count();
          productActiveFalse.push(count);
        }
  
        let categoryGraph = {
          categoryArray,
          totalProductArray,
          productActiveTrue,
          productActiveFalse,
          totalProduct,
        };
        resolve(categoryGraph);
      } catch (error) {
        console.log(error)
      }
    });
  },
  orderGraph: () => {
    return new Promise(async (resolve, reject) => {
        try {
          let cancel = [0]
          let success = [0]
          let base = [0]
          let total = [0]
          let successOrder = await db.get().collection(collection.ORDER_COLLECTION).find({"orderObj.status": "Placed"}).toArray()
          for (let index = 0; index < successOrder.length; index++) {
              success.push(successOrder[index].orderObj.totalAmount);
          }
          let cancelOrder = await db.get().collection(collection.ORDER_COLLECTION).find({"orderObj.status": "Cancelled"}).toArray()
          for (let index = 0; index < cancelOrder.length; index++) {
              cancel.push(cancelOrder[index].orderObj.totalAmount);
          }
          let totalOrder = await db.get().collection(collection.ORDER_COLLECTION).find().toArray()
          for (let index = 0; index < totalOrder.length; index++) {
              total.push(totalOrder[index].orderObj.totalAmount);
          }
          for (let index = 0; index < totalOrder.length; index++) {
              base.push(index);
          }
  
          if(cancel.length ==1){
  
                  cancel.push(0);
                  cancel.push(5000);
          }
          if(success.length ==1){
    
                  success.push(0);
                  success.push(5000);
  
          }
          let orderGraph={
              cancel,
              success,
              base,
              total
          }
          resolve(orderGraph)
        } catch (error) {
          console.log(error)
        }
    
    });
  },

  getAdminDashboard: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const totalProduct = await db
          .get()
          .collection(collection.PRODUCTS_COLLECTION)
          .find()
          .count();
        const totalOrders = await db
          .get()
          .collection(collection.ORDER_COLLECTION)
          .find()
          .count();
        const totalUsers = await db
          .get()
          .collection(collection.USER_COLLECTION)
          .find()
          .count();
        let totalRevenue = 0;
        totalRevenue = await db
          .get()
          .collection(collection.ORDER_COLLECTION)
          .aggregate([
            {
              $match: {
                "orderObj.status": "Placed",
              },
            },
            {
              $group: {
                _id: null,
                totalAmountSum: { $sum: "$orderObj.totalAmount" },
              },
            },
          ])
          .toArray();
          if(totalRevenue.length==0){
            totalRevenue=0
          }else{
            totalRevenue = totalRevenue[0].totalAmountSum;
          }
        
        const adminDashboard = {
          totalProduct,
          totalOrders,
          totalRevenue,
          totalUsers,
        };
        resolve(adminDashboard);
      } catch (error) {
        console.log(error)
      }
    });
  },

};