const MongoClient=require('mongodb-legacy').MongoClient

const state={db:null}

module.exports.connect=(done)=>{

//   const url='mongodb://127.0.0.1:27017'
    const url =  process.env.MONGO_DB_ID
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

