const cloudinary = require('../utils/cloudnary');

module.exports= {

    uploadSingleImage:(uploadImage)=>{
        return new Promise(async (resolve, reject) => {
            try {
                const result = await cloudinary.uploader.upload(uploadImage.tempFilePath,{folder:'Apple Shop/Coupon Banners'});
                resolve(result.secure_url); 
            }
            catch (error) {
                console.log("error in single image upload");
                console.log(error);
            } 
        })
    },

    //upload Banner Image 
    uploadBannerImage:(uploadImage)=>{
        return new Promise(async (resolve, reject) => {
            try {
                const result = await cloudinary.uploader.upload(uploadImage.tempFilePath,{folder:'Apple Shop/User Banners'});
                resolve(result); 
            }
            catch (error) {
                console.log("error in single image upload");
                console.log(error);
            } 
        })
    },

    //delete url with Image
    deleteCloudImage:(bannerId)=>{
        return new Promise(async (resolve, reject) => {
            try {
                const result = await cloudinary.uploader.destroy(bannerId);
                console.log('bannerImage Delete');
                resolve(); 
            }
            catch (error) {
                console.log("error in single image upload");
                console.log(error);
            } 
        })
    }
    

}