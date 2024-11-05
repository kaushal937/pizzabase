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

//configuration
const router = express.Router();

//get-media
router.get("/getmedia/:media", (req, res)=>{
    res.sendFile("/public_media/"+req.params.media, {root:'.'}, (e)=>{
        return
    })
})


module.exports = router