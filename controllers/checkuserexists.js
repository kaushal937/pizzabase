const {pool} = require('../connections/database')
const queries = require('../models/queries')

function checkuserexists(username, cb){
    pool.query(queries.usernamecheck, [username], (err, res) =>{
        if(err){
            cb(false)
        }else{
            var rows = JSON.stringify(res)

            if(rows != "[]"){
                cb(true)
            }else{
                cb(false)
            }
        }
    })
}

module.exports = {
    checkuserexists
}