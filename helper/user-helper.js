const db = require('../config/connection')
var collection = require('../config/collection');
var bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');

const Razorpay = require('razorpay');
const zHelper = require('./z-helper');

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY_ID,
    key_secret: process.env.RAZORPAY_API_SECRET,
  });   

module.exports={ 

    //get products for user home page
    getUserHomeProducts: () =>{
        return new  Promise(async(resolve,rej) => {
            try {
                let products = {}
                products.MacBook = await db.get().collection(collection.PRODUCTS_COLLECTION).find({$and:[{ productCategory:'MacBook'},{ productActiveStatus: true},{ProductStock:{$gt: 0 }}]}).limit(7).toArray()
                products.iPhone = await db.get().collection(collection.PRODUCTS_COLLECTION).find({$and:[{ productCategory:'iPhone'},{ productActiveStatus: true},{ProductStock:{$gt: 0 }}]}).limit(7).toArray()
                products.iPad = await db.get().collection(collection.PRODUCTS_COLLECTION).find({$and:[{ productCategory:'iPad'},{ productActiveStatus: true},{ProductStock:{$gt: 0 }}]}).limit(7).toArray()
                products.AppleWatch = await db.get().collection(collection.PRODUCTS_COLLECTION).find({$and:[{ productCategory:'Apple Watch'},{ productActiveStatus: true},{ProductStock:{$gt: 0 }}]}).limit(7).toArray()
                products.AirPods =  await db.get().collection(collection.PRODUCTS_COLLECTION).find({$and:[{ productCategory:'AirPods'},{ productActiveStatus: true},{ProductStock:{$gt: 0 }}]}).limit(7).toArray()
                resolve(products)
            } catch (error) {
                console.log(error);
            }
        })
    },
    getActiveBanners: () =>{
        return new Promise(async (resolve, reject) => {
            try {
                const banners =  await  db.get().collection(collection.BANNER_COLLECTION).find({isActive: true}).toArray()
                resolve(banners)
            } catch (error) {
                console.log(error);
            }
        })
    },

    cartCount: (userId) =>{
        return new Promise (async (resolve,reject) =>{
            try {
                let count =0
                let cart = await db.get().collection(collection.CART_COLLECTION).findOne({user:new ObjectId(userId)})
                if(cart){
                    count = cart.products.length
                }
                resolve(count)
            } catch (error) {
                console.log(error);
            }
            
        })
    },

    emailCheck:(Email)=>{
        return new Promise(async(resolve,reject)=>{
            try {
                let response ={}
                let user = await db.get().collection(collection.USER_COLLECTION).findOne({Email:Email})
                if(user){
                    response.status = false
                    response.message = " Sorry! This  Email address alredy exists "
                    resolve(response)
                }
                else{
                    response.status = true
                    resolve(response)
                }
                    
            } catch (error) {
                console.log(error);
            }
            })
    },
    mobileCheck:(Mobile)=>{
        return new Promise(async(resolve,reject)=>{
           try {
             let response ={}
             let mobile_current = await db.get().collection(collection.USER_COLLECTION).findOne({Mobile:Mobile})
             if(mobile_current){
                 response.user = mobile_current
                 response.status = true
                 response.mobileMessage = " Sorry! This Mobile Number alredy exists "
                 resolve(response)
             }
             else{
                 response.status = false;
                 response.mobileMessage = " Sorry! This Mobile Number not exists "
                 resolve(response)
             }
           } catch (error) {
            console.log(error);
           }
            })
    },

    doSignup:(userData)=>{
        return new Promise(async(resolve,reject)=>{
        try {
            let response ={}
            let user = await db.get().collection(collection.USER_COLLECTION).findOne({Email:userData.Email})
            if(user){
                response.status = false
                response.message = "login failed case of email"
                resolve(response)
            }else{
                response.status = true
                userData.Password = await bcrypt.hash(userData.Password,10)
                db.get().collection(collection.USER_COLLECTION).insertOne(userData).then((resp)=>{
                resolve(response)
            })
            }
        } catch (error) {
            console.log(error);
        }
        })
    },
    
    doLogin:(userData)=>{
        return new Promise(async(resolve,reject)=>{
            try {
                let loginStatus =false;
                let response ={}
                let user = await db.get().collection(collection.USER_COLLECTION).findOne({Email:userData.Email})
                if(user){
                    if(user.userStatus == true){
                        bcrypt.compare(userData.Password,user.Password).then((status)=>{
                            if(status){
                                response.user=user
                                response.status=true
                                resolve(response)
                                
                            }else{
                                response.message = "login failed ! case of inValid  password"
                                response.status=false
                                resolve(response)
                            }
                        })
                    }else{
                        response.message = "login failed ! case of User is blocked"
                        response.status=false
                        resolve(response)
                    }
                    
                    
                }else{
                    response.message = "login failed ! case of Email not exist"
                    response.status=false
                    resolve(response)
                }
            } catch (error) {
                console.log(error);
            }
        })
    },
    getLogOut: (userId)=>{
        return new Promise(async(resolve,reject)=>{
            try {
                await db.get().collection(collection.USER_COLLECTION).updateOne({_id: new ObjectId(userId)},{$set:{userActive:false}})
                resolve()
            } catch (error) {
                console.log(error);
            }
        })

    },
    userActive: (userId)=>{
        return new Promise(async(resolve,reject)=>{
            try {
                await db.get().collection(collection.USER_COLLECTION).updateOne({_id: new ObjectId(userId)},{$set:{userActive:true}})
                resolve()
            } catch (error) {
                console.log(error);
            }
        })

    },
    forgotPassword:(userData)=>{
        return new Promise(async(resolve,reject)=>{
            try {
                let response ={}
                let user = await db.get().collection(collection.USER_COLLECTION).findOne({Mobile:userData.Mobile})
                if(user){
                        response.status = true
                        resolve(response)
                }
                else{
                    response.errorMessage = " Sorry!  Mobile Number wrong"
                    response.status = false
                    resolve(response)
                }
            } catch (error) {
                console.log(error);
            }
                
            })
    },
    changePassword:(userMobile,newPassword)=>{
        return new Promise(async(resolve,reject)=>{
            try {
                let response ={}
                let user = await db.get().collection(collection.USER_COLLECTION).findOne({Mobile:userMobile})
                    response.user = user
                    newPassword = await bcrypt.hash(newPassword,10)
                    db.get().collection(collection.USER_COLLECTION).updateOne({_id: user._id},{$set:{Password: newPassword}})
                    response.user = user
                    response.status = true
                    resolve(response) 
            } catch (error) {
                console.log(error);
            }
        })
    },
    viewOneProduct:(productId) =>{
        return new Promise(async(resolve,reject) =>{
           try {
             const product = await db.get().collection(collection.PRODUCTS_COLLECTION).findOne({_id:new ObjectId(productId)})
             resolve(product)
           } catch (error) {
            console.log(error);
           }
        })
    },
    addToCart:(proId,userId) =>{
        return new Promise (async(resolve,reject) =>{
            try {
                let proObj = {
                    item: new ObjectId(proId),
                    quantity: 1
                }
                let userCart = await db.get().collection(collection.CART_COLLECTION).findOne({user: new ObjectId(userId)})
                if(userCart){
                    let proExist = userCart.products.findIndex(product=> product.item ==proId)
                    console.log(proExist);
                    if(proExist!=-1){
                        db.get().collection(collection.CART_COLLECTION)
                        .updateOne({'products.item':new ObjectId(proId)},
                        {
                            $inc:{'products.$.quantity':1}
                        }
                        ).then(()=>{
                            resolve()
                        })
    
                    }else{
                        db.get().collection(collection.CART_COLLECTION)
                        .updateOne({user:new ObjectId(userId)},
                            {
                                    $push:{products : proObj}
    
                            } 
                        ).then((response)=>{
                            resolve()
                        })
    
                    }
                
                }
                else{
                    console.log("new cart");
                    let cartObj ={
                        user:new ObjectId(userId),
                        products:[proObj]
                        // products:[new ObjectId(proId)]
                    }
                    db.get().collection(collection.CART_COLLECTION).insertOne(cartObj).then((response)=>{
                        resolve()
                    })
                }
            } catch (error) {
                console.log(error)
            }
        })
    },
    getCartList:(userId) =>{
        return new Promise (async(resolve,reject) =>{
            try {
                cartItems = await db.get().collection(collection.CART_COLLECTION).aggregate([
                    {
                        $match:{user: new ObjectId(userId)}
    
                    },
                    {
                        $unwind:'$products'
                    },
                    {
                        $project :{
                            item:'$products.item',
                            quantity:'$products.quantity'
                        }
                    },
                    {
                        $lookup:{
                            from:collection.PRODUCTS_COLLECTION,
                            localField:'item',
                            foreignField:'_id',
                            as:'product'
                        }
                    },
                    {
                        $project:{
                            item:1,quantity:1,product:{$arrayElemAt:['$product',0]}
                        }
                    }
                ]).toArray()
                console.log("database");
                if(cartItems.length!=0){
                    resolve(cartItems)
                }
                else{
                    cartItems=null
                    resolve(cartItems)
                }
            } catch (error) {
                console.log(error)
            }
        })

    },
    
    getProductWithID: (productID) =>{
        return new  Promise(async(resolve,reject) => {
            try {
                const product = await db.get().collection(collection.PRODUCTS_COLLECTION).findOne({_id: new ObjectId(productID)})
                resolve(product)
            } catch (error) {
                console.log(error)
            }
        })
    },
    changeCartQuantity: async (cartData) =>{
        
        return new Promise((resolve,reject) =>{
            try {
                cartData.count = parseInt(cartData.count)
            cartData.quantity = parseInt(cartData.quantity)
                if(cartData.count ==-1 && cartData.quantity ==1){
                    console.log("product remove case of 1");
                    db.get().collection(collection.CART_COLLECTION)
                    .updateOne({_id:new ObjectId(cartData.cart)},
                    {
                        $pull:{products:{item:new ObjectId (cartData.product)}}
                    }
                    ).then((response)=>{
                        resolve({removeProduct:true})
                    })
    
                }else{
                    db.get().collection(collection.CART_COLLECTION)
                    .updateOne({_id:new ObjectId(cartData.cart), 'products.item':new ObjectId(cartData.product)},
                    {
                        $inc:{'products.$.quantity':cartData.count}
                    }
                    ).then((response)=>{
                        resolve({status:true})
                    })
                    
                }
            } catch (error) {
                console.log(error)
            }
        })


    },
    removeCart:(cartData) =>{
        return new Promise ((resolve,reject)=>{
            try {
                db.get().collection(collection.CART_COLLECTION)
                    .updateOne({_id:new ObjectId(cartData.cart)},
                    {
                        $pull:{products:{item:new ObjectId (cartData.product)}}
                    }
                    ).then((response)=>{
                        resolve({removeProduct:true})
                    })
            } catch (error) {
                console.log(error)
            }
        })
    },
    getTotalAmount:(userId)=>{
        return new Promise(async (resolve,reject)=>{
            try {
                total = await db.get().collection(collection.CART_COLLECTION).aggregate([
                    {
                        $match:{user: new ObjectId(userId)}
    
                    },
                    {
                        $unwind:'$products'
                    },
                    {
                        $project :{
                            item:'$products.item',
                            quantity:'$products.quantity'
                        }
                    },
                    {
                        $lookup:{
                            from:collection.PRODUCTS_COLLECTION,
                            localField:'item',
                            foreignField:'_id',
                            as:'product'
                        }
                    },
                    {
                        $project:{
                            item:1,quantity:1,product:{$arrayElemAt:['$product',0]}
                        }
                    },
                    {
                        $group:{
                            _id:null,
                            total:{$sum:{$multiply:['$quantity','$product.productLastPrice']}}
    
                        }
                    }
                ]).toArray()
                if(total.length!=0){
                    resolve(total[0].total)
                }
                else{
                    total=null
                    resolve(total)
                }
            } catch (error) {
                console.log(error)
            }
        })
    },
    getTotalProducts:(userId)=>{
        return new Promise(async (resolve,reject)=>{
            try {
                total = await db.get().collection(collection.CART_COLLECTION).aggregate([
                    {
                        $match:{user: new ObjectId(userId)}
    
                    },
                    {
                        $unwind:'$products'
                    },
                    {
                        $project :{
                            item:'$products.item',
                            quantity:'$products.quantity'
                        }
                    },
                    {
                        $lookup:{
                            from:collection.PRODUCT_COLLECTION,
                            localField:'item',
                            foreignField:'_id',
                            as:'product'
                        }
                    },
                    {
                        $project:{
                            item:1,quantity:1,product:{$arrayElemAt:['$product',0]}
                        }
                    },
                    {
                        $group:{
                            _id:null,
                            total:{$sum:'$quantity'}
    
                        }
                    }
                ]).toArray()
                if(total.length!=0){
                    resolve(total[0].total)
                }
                else{
                    total=null
                    resolve(total)
                }
            } catch (error) {
                console.log(error)
            }
        })
    },
    
    getCartProductList: (userId)=>{
        return new Promise(async (resolve,reject)=>{
            try {
                let cart = await db.get().collection(collection.CART_COLLECTION).findOne({user:new ObjectId(userId)})
                resolve(cart.products)
            } catch (error) {
                console.log(error)
            }
        })

    },
    placeOrder:(orderData,orderAddress,userId,products,total,totalPro)=>{
        return new Promise(async (resolve,reject)=>{
            try {
                let status = orderData['payment-method']==='COD'?'Placed':'pending'
                let orderObj = {
                    userId: new ObjectId(userId),
                    paymentMethod:orderData['payment-method'],
                    products:products,
                    totalAmount:total,
                    totalProducts:totalPro,
                    data:new Date(),
                    status:status,
                    orderAddress:orderAddress
                }
                db.get().collection(collection.ORDER_COLLECTION).insertOne({orderObj}).then((response)=>{
                    resolve(response)
                })
            } catch (error) {
                console.log(error)
            }
        })
    },

    removeCartForOrder: (userId) =>{
        return new Promise((resolve, reject) => {
             try {
                db.get().collection(collection.CART_COLLECTION).deleteOne({user: new ObjectId(userId)})
                resolve()
             } catch (error) {
                console.log(error)
             }
        })
    },

    ///razorpay 


    generateRazorpay:(orderId,total)=>{
        return new Promise((resolve, reject) => {
            var options = {
                amount: total*100,  // amount in the smallest currency unit
                currency: "INR",
                receipt: ''+orderId
              };
              instance.orders.create(options, function(err, order) {
                if(err){
                    console.log(err,'razoring not working');   
                }
                console.log('new Order',order);
                resolve(order)
              });
            
        })

    },
    verifyPayment:(paymentData)=>{
        return new Promise((resolve, reject) => {
            try {
                const crypto = require('crypto');
                let hmac = crypto.createHmac('sha256', 'IxCKx12nExBNskZJ4KMGXnHS')
                hmac.update(paymentData['payment[razorpay_order_id]']+'|'+paymentData['payment[razorpay_payment_id]'])
                hmac = hmac.digest('hex')
                if(hmac == paymentData['payment[razorpay_signature]']){
                    resolve()
                }
                else{
                    reject()
                }
            } catch (error) {
                
            }
           
        })

    },
    changeProductQuantity:(productData)=>{
        return new Promise(async (resolve, reject) => {
            console.log('productData');
            console.log(productData);
            for (let index = 0; index < productData.length; index++) {
                let currentProductId = productData[index].item
                let currentProductQuantity = - productData[index].quantity
                await db.get().collection(collection.PRODUCTS_COLLECTION).updateOne({_id:new ObjectId(currentProductId)},{ $inc:{ProductStock:currentProductQuantity}})
            }
            resolve()
        })
    },

    changeOrderStatus:(orderId)=>{
        return new Promise(async (resolve, reject) => {
            try {
                await  db.get().collection(collection.ORDER_COLLECTION).updateOne({_id:new ObjectId(orderId)},{ $set:{'orderObj.status': 'Placed'}})
                resolve()
            } catch (error) {
                console.log(error)
            }
        })
    },
    getOrderProducts:async(orderId)=>{
        return new Promise(async (resolve,reject)=>{
          try {
            let orderProducts = await db.get().collection(collection.ORDER_COLLECTION).aggregate([
              {
                  $match:{_id:new ObjectId(orderId)}
              },
              {
                  $unwind:'$orderObj.products'
              },
              {
                  $project:{
                      item:'$orderObj.products.item',
                      quantity:'$orderObj.products.quantity'
                  }
              },
              {
                  $lookup:{
                      from:collection.PRODUCTS_COLLECTION,
                      localField:'item',
                      foreignField:'_id',
                      as:'product'
                  }
              },
              {
                  $project:{
                      item:1,quantity:1,product:{$arrayElemAt:['$product',0]}
                  }
              }
            ]).toArray()
            resolve(orderProducts)
          } catch (error) {
            console.log(error)
          }
        })
    },

    cancelOrder:async(orderId)=>{
        return new Promise(async (resolve,reject)=>{
            try {
                await  db.get().collection(collection.ORDER_COLLECTION).updateOne({_id:new ObjectId(orderId)},{ $set:{'orderObj.status': 'Cancelled'}})
                resolve()
            } catch (error) {
                console.log(error)
            }
        })
    },

    returnOrder:async(orderId)=>{
        return new Promise(async (resolve,reject)=>{
            try {
                await  db.get().collection(collection.ORDER_COLLECTION).updateOne({_id:new ObjectId(orderId)},{ $set:{'orderObj.status': 'Return'}})
                resolve()
            } catch (error) {
                console.log(error)
            }
        })
    },



    getMyOrders:async(userId)=>{
        return new Promise(async (resolve,reject)=>{
            try {
                let myOrders = await db.get().collection(collection.ORDER_COLLECTION).find({'orderObj.userId': new ObjectId(userId)}).toArray()
                resolve()
            } catch (error) {
                console.log(error)
            }
        })
    },
    myOrders:(userId)=>{
        return new Promise(async (resolve,reject)=>{
          try {
            let  myOrders = await db.get().collection(collection.ORDER_COLLECTION).find({"orderObj.userId": { $eq:new ObjectId(userId)}}).sort({"orderObj.data":-1}).toArray()
              resolve(myOrders)
          } catch (error) {
            console.log(error)
          }
        })
    },
    
    
    getDynamicCategory:async(category)=>{
        return new Promise(async (resolve,reject)=>{
            try {
                let products = await db.get().collection(collection.PRODUCTS_COLLECTION).find({$and:[{productCategory: category},{ productActiveStatus: true},{ProductStock:{ $gt: 0 }}]}).toArray()
                resolve(products)
            } catch (error) {
                console.log(error)
            }
        })
    },
    getAllProducts:async()=>{
        return new Promise(async (resolve,reject)=>{
           try {
             let products = await db.get().collection(collection.PRODUCTS_COLLECTION).find({}).toArray()
             resolve(products)
           } catch (error) {
            console.log(error)
           }
        })
    },
    
    ////address

    getUserAddress:async(userId)=>{
        return new Promise(async (resolve,reject)=>{
             try {
                const userAddress = await db.get().collection(collection.ADDRESS_COLLECTION).find({userId: new ObjectId(userId)}).toArray()
                resolve(userAddress)      
             } catch (error) {
                console.log(error)
             }
        })
    },
    postAddAddress:async(userId,userAddress)=>{
        return new Promise(async (resolve,reject)=>{
                try {
                    await db.get().collection(collection.ADDRESS_COLLECTION).insertMany([{userId: new ObjectId(userId),userAddress:userAddress}])
                    resolve()
                } catch (error) {
                    console.log(error)
                }
               
        })
    },
    getSingleAddress:async(addressId)=>{
        return new Promise(async (resolve,reject)=>{
            try {
                const AddressData = await db.get().collection(collection.ADDRESS_COLLECTION).findOne({_id: new ObjectId(addressId)})
                resolve(AddressData)
            } catch (error) {
                console.log(error)
            }      
       })
    },
    postEditAddress:async(addressId,updateData)=>{
        return new Promise(async (resolve,reject)=>{
           try {
             const AddressData = await db.get().collection(collection.ADDRESS_COLLECTION).updateOne({_id: new ObjectId(addressId)},{$set:{userAddress:updateData}})
             resolve()     
           } catch (error) {
            console.log(error)
           } 
       })
    },

    ///coupon
    getActiveCoupons:()=>{
        return new Promise(async (resolve, reject) => {
            try {
                const coupons = await db.get().collection(collection.COUPON_COLLECTION).find().toArray()
                if(coupons == null){
                    resolve(coupons)
                }else{
                const isActiveCoupons = await zHelper.isActiveCoupons(coupons)
                resolve(isActiveCoupons)
                }
            } catch (error) {
                console.log(error)
            }
            
        
        })
    },

    couponCode:async(couponCode)=>{
        return new Promise(async (resolve,reject)=>{
            try {
                let response ={}
                const result =  await db.get().collection(collection.COUPON_COLLECTION).findOne({couponCode:couponCode})
                if(result ==null){
                    response.errorMessage = 'coupon Code is not valid'
                    response.status = false
                    resolve(response)
                }else{
                    const startDate = new Date(result.couponStartingDate)
                    const expiryDate = new Date( result.couponExpiryDate)
                    const currentDate =new Date() 
                    if(!result.isCouponActive){
                        response.errorMessage = 'coupon Code is not Active'
                        response.status = false
                        resolve( response)
                    }else{
                        if(currentDate >= startDate && currentDate <= expiryDate ){
                            response.status = true
                            response.discountPrice = 1000
                            response.couponData = result
                            console.log('coupon valid');
                            resolve( response)
                            
        
                        }else{
                            console.log('not valid');
                            response.errorMessage = 'coupon Code Date is not valid'
                            response.status = false
                            resolve(response)
                        }
    
                    }
    
                    
                }
            } catch (error) {
                
            }
           
       })
    },
    //wallet
    getWallet: (userId)=>{
        return new Promise(async (resolve, reject) => {
            try {
                let walletTotal = 0
                const wallet = await  db.get().collection(collection.WALLET_COLLECTION).findOne({userId:new ObjectId(userId)})
                if(wallet==null){
                    resolve(walletTotal)
                }else{
                    walletTotal =wallet.walletAmount
                    resolve(walletTotal)
                }
    
            } catch (error) {
                
            }
        })

    },


    //search
    getSearch: async(search,productCategory,sortBy,page,limit)=>{
        return new Promise(async (resolve, reject) => {
            try {
                const result = {}
                const resultProducts = await db.get().collection(collection.PRODUCTS_COLLECTION).find({$or:[{ productName: { $regex: search, $options: "i" } },{ productCategory: { $regex: search, $options: "i" } }]})
                    .sort(sortBy)
                    .skip(page * limit)
                    .limit(limit)
                    .toArray()
    
                const resultCount = await db.get().collection(collection.PRODUCTS_COLLECTION).countDocuments({
                    productCategory: { $in: [...productCategory] },
                    productName: { $regex: search, $options: "i" }
    
                })
                result.resultProducts = resultProducts
                result.resultCount = resultCount
                result.page = page + 1
                result.pageCount = Math.ceil(resultCount/limit)
                result.limit = limit
                result.productCategory= productCategory
                resolve(result)
            } catch (error) {
                
            }
        })
    },
    

}