require('dotenv').config();
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');
const {pool} = require('../connections/database')
const errors = require('../models/error_list')
const queries = require('../models/queries')
const session = require('../models/sessions');
const update = require('../controllers/updatecredentials')

const router = express.Router();

router.post("/updatecreds", (req, res) =>{
    const inputcharsuname = /^[A-Za-z.,_0-9- ]+$/
    if(req.auth == true){
        if(req.body.a.match(inputcharsuname)){
            let type = JSON.stringify(req.headers["x-typeofmodification"])
            if(type == '"name"'){
                if(update.updateusername(req.cookies["nsid"], req.body.a)){
                    res.json(errors.succesfully_updated_creds)
                }else{
                    res.json(errors.error_occured)
                }
            }else if(type == '"addr1"'){
                if(update.updateuseradd1(req.cookies["nsid"], req.body.a)){
                    res.json(errors.succesfully_updated_creds)
                }else{
                    res.json(errors.error_occured)
                }
            }else if(type == '"addr2"'){
                if(update.updateuseradd2(req.cookies["nsid"], req.body.a)){
                    res.json(errors.succesfully_updated_creds)
                }else{
                    res.json(errors.error_occured)
                }
            }
        }else{
            res.json(errors.input_validation)
        }
    }else{
        res.json(errors.not_logged_in)
    }
})

module.exports = router;

//set cookie in headers from frontend[username], and server will get the username cookies and session id, and send it to the browser