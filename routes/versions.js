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

//main
router.get("/versioning", (req, res) =>{
    res.render("versions")
})

module.exports = router;