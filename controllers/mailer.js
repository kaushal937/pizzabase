const nodemailer = require('nodemailer')
require('dotenv').config()

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS
  }
});
  
async function main(un, otp) {
  const info = await transporter.sendMail({
    from: '"Pizza Mania" <duelmakes@gmail.com>',
    to: [un],
    subject: "Verification",
    text: "",
    html: `<body style="height: 100%;
        width: 100%;">
<span id="a" style="font-size: 25px;
        font-family: Calibri; color: #000;">
    Hey! Your OTP for registration on <a id="p" style="color: #000;" href="https://google.co.in">Pizzamania</a> is:
</span>
<div id="otpbox" style="display: flex;
        width: 100%;
        height: 100%;
        justify-content: center;
        align-items: center;">
    <span id="otp" style="font-family: Calibri;
        font-size: 80px;
        color: #000;
        letter-spacing: 10px;
        padding: 30px;
        border-radius: 30px;">`+
        otp+
    `</span>
</div>
<span id="info" style="font-size: 20px;
        font-family: Calibri;
        position: fixed;
        bottom: 10px;
        left: 10px;">
    DO NOT SHARE THIS OTP TO ANYONE! 
    This OTP is valid for 15 minutes
    <br><br>
    If you didnt request this otp, ignore this msg
</span>
</body>`,
  }, (err) =>{
    if(err){
      return "error"
    }else{
      return "s"
    }
  })
}
module.exports = {
  main
}