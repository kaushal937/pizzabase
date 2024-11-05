const {pool} = require('../connections/database')
const queries = require('../models/queries')

function getuserdata(username, cb){
    pool.query(queries.getuser, [username], (err, res) =>{
        if(err){
            return false
        }else{
            if(JSON.stringify(res) != "[]"){
                var objectuser = {
                    naam : res[0]["name"],
                    add1 : res[0]["address_a"],
                    add2 : res[0]["address_b"]
                }
                
                cb(objectuser) 
            }else{
                return false
            }
        }
    })
}

module.exports = {
    getuserdata
}