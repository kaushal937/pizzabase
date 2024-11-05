const otp = require('otp-generator')
const {main} = require('../controllers/mailer')
const { mainap } = require('../controllers/authenticateforap')

//model-1 (registeration)
let verifies = new Map()

function otpauth(un, email){
    var ote = otp.generate(6, {lowerCaseAlphabets : false, upperCaseAlphabets : false, specialChars : false})
    verifies.set(un, ote)
    return main(email, ote)
}

function resolve(uname, otp){
    if(otp == verifies.get(uname)){
        verifies.delete(uname)
        return 0
    }else{
        return 1
    }
}

//model-2 (change pass)
let verifyForAlteringPass = new Map()

function otpauthm2(email, cb){
    if(verifyForAlteringPass.has(email)){
        verifyForAlteringPass.delete(email)
        cb("alreadyhas")
    }else{
        var ote = otp.generate(6, {lowerCaseAlphabets : false, upperCaseAlphabets : false, specialChars : false})
        verifyForAlteringPass.set(email, ote)
        cb("ok")
        mainap(email, ote)
    }
}

function resolvem2(uname, otp){
    if(otp == verifyForAlteringPass.get(uname)){
        verifyForAlteringPass.delete(uname)
        return 0
    }else{
        return 1
    }
}

module.exports = {
    resolve,
    otpauth,
    otpauthm2,
    resolvem2
}