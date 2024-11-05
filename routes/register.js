require('dotenv').config();
const express = require('express');
const fs = require('fs');
const cookie = require("cookie-parser");
const bodyParser = require('body-parser');
const path = require('path');
const {pool} = require('../connections/database')
const {resolve, otpauth} = require('../models/otplogs')
const errors = require('../models/error_list')
const queries = require('../models/queries')

const router = express.Router();

router.get("/register", (err, res) =>{
  res.render("register")
})



router.post("/registeracc", (req, res) => {

  pool.query(queries.usernamecheck, [req.body.a], (err, results) => {
    var rows = JSON.stringify(results)
    if(req.body.a != "" && req.body.b != "" && req.body.c != "" && req.body.d != "" && req.body.e != "" ){
      if(rows != "[]"){
        res.json(errors.user_exists)
      }else{
        if(req.body.d != req.body.e){
          res.json(errors.pass_dont_match)
        }else{
          pool.query(queries.emailcheck, [req.body.c], (err, resulte)=>{
            var resem = JSON.stringify(resulte)
            if(resem != "[]"){
              res.json(errors.email_in_use)
            }else{
              if(otpauth(req.body.a, req.body.c) == "error"){
                res.json(errors.emailnotvalid)
              }else{
                res.json(errors.s)
              }
            }
          })
        }
      }
    }else{
      res.json(errors.fields_cannot_be_empty)
    }
  })

})



router.post("/otp", (req, res) =>{
  if(resolve(req.body.a, req.body.f) == 0){
    queries.inserter(req.body.a, req.body.b, req.body.c, req.body.d)
    res.json(errors.reg_succesful)
  }else{
    res.json(errors.otp_incorrect)
  }
})



module.exports = router;