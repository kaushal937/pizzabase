//node modules
require('dotenv').config();
const express = require('express');
const getdata = require('../controllers/getuserdat')
const sessions = require('../models/sessions')

//configuration
const router = express.Router();

//landing page
router.get("/", (req, res) =>{
    if(req.auth == true){
        res.render("home")
    }else{
        res.render("login")
    }
})

//access data
router.post("/accessdata", (req, res)=>{
    if(req.auth == true){
        if(req.cookies["sessUid"] == sessions.getSessionUid(req.cookies["nsid"])){
            getdata.getuserdata(req.cookies["nsid"], (result) =>{
                res.json(result)
            })
        }else{
            return
        }
    }else{
        return
    }
})

module.exports = router