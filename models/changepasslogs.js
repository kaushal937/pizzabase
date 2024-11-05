const otp = require('otp-generator')
const {main} = require('../controllers/mailer')

var verifies = new Map()

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
module.exports = {
    resolve,
    otpauth
}