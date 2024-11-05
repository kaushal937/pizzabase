//modules
require('dotenv').config();
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');
const {pool} = require('../connections/database')
const errors = require('../models/error_list')
const queries = require('../models/queries')
const session = require('../models/sessions');

const router = express.Router();

//login
router.post("/authenticate", (req, res) =>{
  function logger(){
    var math = Math.floor(Math.random() * 1000000000000000)+""
    var key = req.body.a+""

    res.cookie('sessUid', math.toString())
    res.cookie('nsid', key.toString())
    // res.setHeader("username", key)
    session.login(key, math)
  }

  const inputcharsuname = /^[A-Za-z._0-9]+$/
  
  if(req.body.a != "" && req.body.b != ""){
    if(req.body.a.match(inputcharsuname)){
      pool.query(queries.getuser, [req.body.a], (err, results) => {
        var rows = JSON.stringify(results)
        if(rows != "[]"){
          var passV = results[0]["password"]
          if(req.body.b == passV){
            if(session.checkLoggedIn(req.body.a) == true){
              res.json(errors.already_logged_in)
            }else{
              logger()
              res.json(errors.authenticated)
            }
          }else{
            res.json(errors.incorrect_pass)
          }
        }else{    
          res.json(errors.user_not_found)
        }
      })
    }else{
      res.json(errors.input_validation)
    }
  }else{
    res.json(errors.fields_cannot_be_empty)
  }
})

//logout
router.get("/logout", (req, res) =>{
  if(req.auth == true){
    session.logout(req.cookies["nsid"])
    res.clearCookie("nsid", "sessUid")
    res.redirect("/")
  }
})


//logout --all
// router.get("/logout-everywhere", (req, res) =>{
//   session.logout(req.cookies["nsid"])
// })

module.exports = router;