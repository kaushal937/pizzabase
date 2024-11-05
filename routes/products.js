require('dotenv').config();
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');
const {pool} = require('../connections/database')
const errors = require('../models/error_list')
const queries = require('../models/queries')
const session = require('../models/sessions');
const getprods = require('../controllers/getprods')

//configuration
const router = express.Router();

//place-order
router.get("/products", (req, res)=>{
    if(req.auth == true){
        res.render("products", { code : req.query.code, name : req.query.name, price : req.query.price, descreption : req.query.descreption, availability : req.query.availability })
    }else{
        res.redirect("/")
    }
})

module.exports = router