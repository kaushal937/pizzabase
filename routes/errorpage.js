//node modules
require('dotenv').config();
const express = require('express');
const getdata = require('../controllers/getuserdat')
const sessions = require('../models/sessions')

//configuration
const router = express.Router();

//error page
router.get("*", (req, res)=>{
    res.render("error")
})

module.exports = router