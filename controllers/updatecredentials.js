const mysql = require('mysql2')
const {pool} = require('../connections/database')
const queries = require('../models/queries')
const userexist = require('./checkuserexists')


function updateusername(username, name){
    var exis;
    userexist.checkuserexists(username, (result) =>{
        exis = result
        execute()
    })
    function execute(){
        if(exis == true){
            pool.query(queries.updatename, [name, username], (err, res) =>{
                if(res){
                    return "SUCCESFUL"
                }else{
                    return "ERROR"
                }
            })
        }else{
            return "UDONEXIS"
        }
    }
}

function updateuseradd1(username, name){
    var exis;
    userexist.checkuserexists(username, (result) =>{
        exis = result
        execute()
    })
    function execute(){
        if(exis == true){
            pool.query(queries.updateaddr1, [name, username], (err, res) =>{
                if(res){
                    return "SUCCESFUL"
                }else{
                    return "ERROR"
                }
            })
        }else{
            return "UDONEXIS"
        }
    }
}
function updateuseradd2(username, name){
    var exis;
    userexist.checkuserexists(username, (result) =>{
        exis = result
        execute()
    })
    function execute(){
        if(exis == true){
            pool.query(queries.updateaddr2, [name, username], (err, res) =>{
                if(res){
                    return "SUCCESFUL"
                }else{
                    return "ERROR"
                }
            })
        }else{
            return "UDONEXIS"
        }
    }
}


module.exports = {
    updateusername,
    updateuseradd1,
    updateuseradd2
}