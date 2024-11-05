//node modules
require('dotenv').config();
const fs = require('fs');
const cookie = require("cookie-parser");
const bodyParser = require('body-parser');
const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT

//modules
const register = require('./routes/register')
const authenticate = require('./routes/authenticate')
const {conn} = require('./connections/database')
const {stamp} = require('./models/logs')
const session = require('./models/sessions')
const landingpage = require('./routes/landingpage')
const updatecreds = require('./routes/usercredentialmanagement')
const larchusta = require('./routes/supersecretroute')
const publicMeadia = require('./access_media/media')
const checkout = require('./routes/checkout')
const products = require('./routes/products')
const errorpage = require('./routes/errorpage')
const alterpassword = require('./routes/forgotpass')
const versions = require('./routes/versions')

//configurations
const ServerName = process.env.servername

app.set("view engine", "ejs")
app.set("views", path.resolve('./views'))

//node middlewares
// app.use(require('express-status-monitor')());
// app.use(helmet())
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({extended : false}))
app.use(cookie())

//middlewares
app.use(async(req, res, next)=>{
    // try {
    //     let nsid = JSON.stringify(req.headers['uname']);
    //     res.cookie('nsid', nsid);
    //     res.cookie('sessUid', session.getSessionUid(nsid));
    // } catch {
    //     next()
    // }
    next()
})

app.use((req, res, next)=>{
    if(JSON.stringify(req.cookies) != "{}"){
        if(session.checkLoggedIn(req.cookies["nsid"]) == false){
            req.auth = false
        }else{
            if(req.cookies["sessUid"] == session.getSessionUid(req.cookies["nsid"])){
              req.auth = true
              req.username = req.cookies["nsid"]
            }else{
                session.logout(req.cookies["nsid"])
                res.clearCookie()
                req.auth = false
            }
        }
    }else{
        req.auth = false
    }
    next()
})

//database
conn()

//routes
app.use(landingpage)
app.use(register)
app.use(authenticate)
app.use(updatecreds)
app.use(publicMeadia)
app.use(checkout)
app.use(products)
app.use(alterpassword)
app.use(versions)
app.use(errorpage)

app.listen(port, () => {
    console.log(`${ServerName} listening on port: ${port}`)
    console.log(stamp("log.txt"))
})