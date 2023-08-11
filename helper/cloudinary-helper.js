const cloudinary = require('../utils/cloudnary');

module.exports= {

    uploadSingleImage:(uploadImage)=>{
        return new Promise(async (resolve, reject) => {
            try {
                const result = await cloudinary.uploader.upload(uploadImage.tempFilePath,{folder:'Apple Shop/Coupon Banners'});
                resolve(result); 
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
                 await cloudinary.uploader.destroy(bannerId);
                resolve(); 
            }
            catch (error) {
                resolve(); 
            } 
        })
    },
    deleteCloudImages:(imageArray)=>{
        return new Promise(async (resolve, reject) => {
            try {
                for (let i = 0; i < imageArray.length; i++) {
                    let singleImage = imageArray[i];
                    console.log(singleImage);
                    await cloudinary.uploader.destroy(singleImage);    
                }
                console.log('cloudinary succes');
                resolve(); 
            }
            catch (error) {
                console.log("error in single image upload");
                console.log(error);
            } 
        })
    },

    //function for admin to submit upload first images upload
    uploadProductImage:(uploadImage)=>{
        return new Promise(async (resolve, reject) => {
            console.log(uploadImage);
            try {
                let response = {}
                const result = await cloudinary.uploader.upload(uploadImage,{folder:'Apple Shop/Product Images"'});
                response.imageURL = result.secure_url
                response.imageId = result.public_id
                resolve(response); 
            }
            catch (error) {
                
                console.log(error);
            } 
        })
    },

    //function for admin to upload edit sub images upload
    uploadEditImages: (imagePath)=>{
        return new Promise(async (resolve, reject) => {

            try {
                let cloudResponse = {}
                let imagUrl = []
                let imagID = []
                for (let i = 0; i < imagePath.length; i++) {
                  const result = await cloudinary.uploader.upload(
                    imagePath[i],
                      { folder: "Apple Shop/Product Images" }
                   );
                   imagUrl.push(result.secure_url)
                   imagID.push(result.public_id)
                }
                cloudResponse.imageURL = imagUrl
                cloudResponse.imageId = imagID
                resolve(cloudResponse)
            } catch (error) {
                
            }

        })
    },

}