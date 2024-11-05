const {pool} = require('../connections/database')
const queries = require('../models/queries')

function getprods(cb){
    pool.query(queries.getproducts, (err, res) =>{
        if(err){
            cb("Error")
        }else{
            cb(res) 
        }
    })
}

module.exports = {
    getprods
}