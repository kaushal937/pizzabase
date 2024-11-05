//node modules
require('dotenv').config();
const express = require('express');

//configuration
const router = express.Router();

//(super secretttt routee!!!!)
router.get("/supersecretrouteee", (req, res)=>{
    res.render("larchusta")
})

router.post("/getty", (req, res)=>{
    res.send("../views/joker.jpeg")
})
module.exports = router