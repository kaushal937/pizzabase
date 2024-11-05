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
const otplogs = require("../models/otplogs")

const router = express.Router();

//ui
router.get("/changepass", (req, res) =>{
    res.render("changepass")
})

router.post("/changemypass", (req, res) =>{
    var id = req.body.a

    const inputcharsuname = /^[A-Za-z._0-9@]+$/

    if(req.body.a != "" && req.body.b != ""){
        if(req.body.c == "email" || req.body.b == "username"){
            if(req.body.a.match(inputcharsuname)){
                if(req.body.c == "email"){
                    pool.query(queries.getuserbyemail, [id], (err, result) =>{
                        var rows = JSON.stringify(result)
                        if(rows == "[]"){
                            res.json(errors.user_not_found)
                        }else{
                            var useremail = result[0]["email"]

                            otplogs.otpauthm2(useremail, (err)=>{
                                if(err == "alreadyhas"){
                                    res.json(errors.error_occured)
                                }else{
                                    res.json(errors.email_sent(useremail))
                                }
                            })
                        }
                    })
                }
            }else{
                res.json(errors.input_validation)
            }
        }else{
            res.json(errors.error_occured)
        }
    }else{
        res.json(errors.fields_cannot_be_empty)
    }
})

router.post("/resolverap", (req, res)=>{
    console.log(req.body.b, req.body.c, req.body.a)
    if(otplogs.resolvem2(req.body.b, req.body.a) == 0){
        queries.alterpass(req.body.b, req.body.c)
        res.json(errors.altered_pass)
    }else{
        res.json(errors.otp_incorrect)
    }
})

module.exports = router;