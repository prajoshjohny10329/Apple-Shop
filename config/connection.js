const MongoClient=require('mongodb-legacy').MongoClient

// connection 6
// connection 6
const state={db:null}

module.exports.connect=(done)=>{
   
  const url='mongodb+srv://prajoshjohny10329:9foRxqmu28qJx9bb@cluster0.drxsbfg.mongodb.net/'
    const dbName='Appleshop'

    MongoClient.connect(url,(err,data)=>{
        if(err) return done(err)
        state.db=data.db(dbName)
        done()
    })
}

module.exports.get=function(){
    return  state.db
}

