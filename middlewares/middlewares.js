const adminHelper = require("../helper/admin-helper");
const userHelpers = require('../helper/user-helper');

module.exports ={

      isLoggedIn : async (req,res,next)=>{
        try {
          if(req.session.loggedIn){
            next()
          }else{
            const products = await userHelpers.getUserHomeProducts()
            const banners = await userHelpers.getActiveBanners()
            res.render('user-home',{userLayout:true,products,loggedIn:false,banners})
          }
        } catch (error) {
          console.log(error);
        }
      },

      //for active user
      userIsLoggedIn:(req,res,next)=>{
        try {
          if(!req.session.loggedIn){
            next()
          }else{
            res.redirect('/')
          }
        } catch (error) {
          console.log(error);
          res.redirect('/error')
        }
      },


      // common user middleware
      userMiddleware :(req,res,next) =>{
        const currentURL = req.header('referer');
        req.session.currentURL = currentURL
        try {
          if(req.session.loggedIn){
            next()
          }
          else{      
            req.session.warningMessage = 'listen ! please login or create new account for Access this page. '
            res.redirect('/login') 
          }
        } catch (error) {
          console.log(error);
          res.redirect('/error') 
        }
      },

      adminIsLogged:(req,res,next) =>{
        try {
          if(req.session.admin){
            next()
          }else{
            let warningMessage = req.session.warningMessage;
            res.render('admin-login',{formLayout:true,warningMessage});
            req.session.warningMessage = "";         
          }
        } catch (error) {
          console.log(error);
          res.redirect('/error')
        }
      },

      adminMiddleware :(req,res,next) =>{
        const currentURL = req.header('referer');
        req.session.currentURL = currentURL
        try {
          if(req.session.admin){
            next()
          }
          else{      
            req.session.warningMessage = 'listen ! please login or create new account for Access this page. '
            res.redirect('/admin/') 
          }
        } catch (error) {
          console.log(error);
          res.redirect('/error') 
        }
      },
}