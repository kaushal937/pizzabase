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
router.post("/place-order", (req, res) =>{
    if(req.auth == true){
        var user = req.cookies["nsid"]
        var product_to_order = req.body.a
        var order_qnty = req.body.b
        var product_addons = req.body.c //addons(extratoppings, extra cheese, extra spicy, less spicy, none)
        var product_size = req.body.d
        var payment_method = req.body.e
        var payment_id = req.body.f
        var order_code = req.body.g

        if(user){
            console.log("kosal")
        }else{
            console.log("sdf")
        }
    }else{
        res.json(errors.not_logged_in)
    }
})

router.post("/getproducts", (req, res)=>{
    if(req.auth == true){
        getprods.getprods((result) =>{
            if(result == "Error"){
                res.json(errors.error_occured)
            }else{
                res.json(result)
            }
        })
    }else{
        return
    }
})
//cart
// router.get("/usercart", (req, res) =>{
//     if(req.auth == true){
//         res.render("cart")
//     }else{
//         res.render("error")
//     }
// })

//add-to-cart
// router.post("/addtocart", (req, res)=>{
//     if(req.auth == true){
        
//     }else{
//         res.json(errors.not_logged_in)
//     }
// })

module.exports = router