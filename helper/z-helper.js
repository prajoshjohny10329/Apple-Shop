module.exports={ 
    destructingProductData:(productData)=>{
        return new Promise(async(resolve,reject)=>{
                try {
                  productData.productPrice = Number(productData.productPrice);
                  productData.ProductStock = Number(productData.ProductStock);
                  productData.productOffer = Number(productData.productOffer);
                  const totalAmount = productData.productPrice -((productData.productOffer / 100) * productData.productPrice) ;
                  productData.productLastPrice = Math.round(totalAmount)
                  productData.productFreeDelivery = (productData.productFreeDelivery =='true') ? true:false
                  productData.productReplacement = (productData.productReplacement =='true') ? true:false
                  productData.productActiveStatus = true;
                  productData.productCurrentDate = new Date()
                  resolve(productData)
                } catch (error) {
                  
                }
            })
    },
    getCategory:(currentCategory)=>{
        return new Promise(async(resolve,reject)=>{
           try {
             const category = {}
             category.MacBook = false
             category.iPhone = false
             category.iPad = false
             category.AppleWatch = false
             category.AirPods = false
             
                 if(currentCategory == 'MacBook'){
                     category.MacBook = true
                     resolve(category)
                 }
                 if(currentCategory == 'iPhone'){
                     category.iPhone = true
                     resolve(category)
                 }
                 if(currentCategory == 'iPad'){
                     category.iPad = true
                     resolve(category)
                 }
                 if(currentCategory == 'Apple Watch'){
                     category.AppleWatch = true
                     resolve(category)
                 }
                 if(currentCategory == 'AirPods'){
                     category.AirPods = true
                     resolve(category)
                     
                 }
           } catch (error) {
            
           }
                
            })
    },
    Checkers:(productData)=>{
        return new Promise(async(resolve,reject)=>{
            try {
              let checkers={}
              let colorChecker = {}
              let storageChecker = {}
              let sizeChecker = {}
              
              colorChecker.Black = false
              colorChecker.Green = false
              colorChecker.Purple = false
              colorChecker.DeepPurple = false
              colorChecker.Red = false
              colorChecker.Orange = false
              colorChecker.Pink = false
              colorChecker.Yellow = false
              colorChecker.Gold = false
              colorChecker.Blue = false
              colorChecker.Grey = false
              colorChecker.Silver = false
              colorChecker.White = false
              colorChecker.MidNight = false
              //checking color
              storageChecker.GB128= false
              storageChecker.GB256= false
              storageChecker.GB512= false
              storageChecker.TB1= false
              storageChecker.TB2= false
              //size checker
              sizeChecker.mm40= false
              sizeChecker.mm44= false
  
              //checking start
              //checkin end
              if(productData.productAvailableColor){
                if (productData.productAvailableColor.includes('Black')) {
                  colorChecker.Black = true
                }
                if (productData.productAvailableColor.includes('Green')) {
                  colorChecker.Green = true
                } 
                if (productData.productAvailableColor.includes('Purple')) {
                  colorChecker.Purple = true
                }
                if (productData.productAvailableColor.includes('Deep Purple')) {
                  colorChecker.DeepPurple = true
                }
                if (productData.productAvailableColor.includes('Red')) {
                  colorChecker.Red = true
                }
                if (productData.productAvailableColor.includes('Orange')) {
                  colorChecker.Orange = true
                }
                if (productData.productAvailableColor.includes('Pink')) {
                  colorChecker.Pink = true
                }
                if (productData.productAvailableColor.includes('Yellow')) {
                  colorChecker.Yellow = true
                }
                if (productData.productAvailableColor.includes('Gold')) {
                  colorChecker.Gold = true
                }
                if (productData.productAvailableColor.includes('Blue')) {
                  colorChecker.Blue = true
                }
                if (productData.productAvailableColor.includes('Grey')) {
                  colorChecker.Grey = true
                }
                if (productData.productAvailableColor.includes('Silver')) {
                  colorChecker.Silver = true
                }
                if (productData.productAvailableColor.includes('White')) {
                  colorChecker.White = true
                }
                if (productData.productAvailableColor.includes('Mid Night')) {
                  colorChecker.MidNight = true
                }
              }
              if(productData.productInternalStorage){
                  if (productData.productInternalStorage.includes('128 GB')) {
                      storageChecker.GB128= true
                  }
                  if (productData.productInternalStorage.includes('256 GB')) {
                      storageChecker.GB256= true
                  }
                  if (productData.productInternalStorage.includes('512 GB')) {
                      storageChecker.GB512= true
                  }
                  if (productData.productInternalStorage.includes('1 TB')) {
                      storageChecker.TB1= true
                  }
                  if (productData.productInternalStorage.includes('2 TB')) {
                      storageChecker.TB2= true
                  }
              }
              if(productData.productInternalStorage){
                  if (productData.productInternalStorage.includes('128 GB')) {
                      storageChecker.GB128= true
                  }
                  if (productData.productInternalStorage.includes('256 GB')) {
                      storageChecker.GB256= true
                  }
                  if (productData.productInternalStorage.includes('512 GB')) {
                      storageChecker.GB512= true
                  }
                  if (productData.productInternalStorage.includes('1 TB')) {
                      storageChecker.TB1= true
                  }
                  if (productData.productInternalStorage.includes('2 TB')) {
                      storageChecker.TB2= true
                  }
              }
              if(productData.productAvailableSize){
                  if (productData.productAvailableSize.includes('40mm - fits 130 - 200mm wrists')) {
                      sizeChecker.mm40= true
                  }
                  if (productData.productAvailableSize.includes('44mm - fits 140 - 220mm wrists')) {
                      sizeChecker.mm44= true
                  }
  
              }
              //checking end
              checkers.colorChecker = colorChecker
              checkers.storageChecker = storageChecker
              checkers.sizeChecker = sizeChecker
              resolve(checkers)
  
            } catch (error) {
              
            }

            })
    },
    //coupon destructure

    couponDataDestructure:(bodyData,couponBanner)=>{
      return new Promise((resolve, reject) => {
       try {
         const couponData =bodyData
         couponData.couponOffer = parseInt(couponData.couponOffer)
         couponData.couponMaxPrice = parseInt(couponData.couponMaxPrice)
         couponData.isCouponActive = true;
         couponData.couponUsedUsers =[]
         couponData.couponBanner = couponBanner
         resolve(couponData)
       } catch (error) {
        
       }
      })
    },

    ///my orders
    myOrdersDestructure:(myOrders)=>{
      return new Promise((resolve, reject) => {
        try {
          let result = []
          for (let index = 0; index < myOrders.length; index++) {
            
            let  currentOrder = myOrders[index]
            let orderStatus = currentOrder.orderObj.status
            let  currentOrderStatus = {}
            currentOrderStatus.Pending = false
            currentOrderStatus.placed = false
            currentOrderStatus.approved = false
            currentOrderStatus.shipping = false
            currentOrderStatus.delivery = false
            currentOrderStatus.cancelled = false
            currentOrderStatus.delivered = false
            currentOrderStatus.return = false
  
            if(orderStatus =='Pending'){
              currentOrderStatus.Pending = true
            }
            else if(orderStatus =='Placed'){
              currentOrderStatus.placed = true
            }
            else if(orderStatus =='Approved'){
              currentOrderStatus.approved = true
            }
            else if(orderStatus =='Shipping'){
              currentOrderStatus.shipping = true
            }
            else if(orderStatus =='Cancelled'){
              currentOrderStatus.cancelled = true
            }
            else if(orderStatus =='Delivered'){
              currentOrderStatus.delivered = true
            }
            else if(orderStatus =='Return'){
              currentOrderStatus.return = true
            }
            currentOrder.currentOrderStatus = currentOrderStatus
            result.push(currentOrder);
          }
          resolve(result);
        } catch (error) {
          
        }
      })
    },

    //single orderStatus
    oneOrderStatus:(orderData)=>{
      return new Promise((resolve, reject) => {
       try {
         let result = []
           let orderStatus =orderData.orderObj.status
           let  currentOrderStatus = {}
           currentOrderStatus.Pending = false
           currentOrderStatus.placed = false
           currentOrderStatus.approved = false
           currentOrderStatus.shipping = false
           currentOrderStatus.delivery = false
           currentOrderStatus.cancelled = false
           currentOrderStatus.delivered = false
           currentOrderStatus.return = false           
 
           if(orderStatus =='Pending'){
             currentOrderStatus.Pending = true
           }
           else if(orderStatus =='Placed'){
             currentOrderStatus.placed = true
           }
           else if(orderStatus =='Approved'){
             currentOrderStatus.approved = true
           }
           else if(orderStatus =='Shipping'){
             currentOrderStatus.shipping = true
           }
           else if(orderStatus =='Cancelled'){
             currentOrderStatus.cancelled = true
           }
           else if(orderStatus =='Delivered'){
            currentOrderStatus.delivered = true
          }
          else if(orderStatus =='Return'){
            currentOrderStatus.return = true
          }
 
         resolve(currentOrderStatus);
       } catch (error) {
        
       }
      })
    },
    /// check active coupons
    isActiveCoupons:(coupons)=>{
      return new Promise((resolve, reject) => {
        try {
          let resultCoupons = []
          for (let index = 0; index < coupons.length; index++) {
            let currentCoupon = coupons[index];
  
            const startDate = new Date(currentCoupon.couponStartingDate)
                  const expiryDate = new Date( currentCoupon.couponExpiryDate)
                  const currentDate =new Date() 
                  if(currentCoupon.isCouponActive){
                    if(currentDate >= startDate && currentDate <= expiryDate ){
                        resultCoupons.push(currentCoupon)
    
                    }
                  }
          }
          resolve(resultCoupons)
        } catch (error) {
          
        }
      })
      
    },

    //admin
    productGraphDestructuring : (products,category)=>{
      return new Promise((resolve, reject) => {
       try {
         let result = {}
         for (let i = 0; i < category.length; i++) {
           const currentCategory = category[i];
           console.log(currentCategory);
           resolve()
         }
       } catch (error) {
        
       }
      })
    }

 

}