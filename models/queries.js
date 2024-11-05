const errors = require('./error_list')
const {pool} = require('../connections/database')

let usernamecheck = 'SELECT * FROM `accounts` WHERE username = ?;'

let emailcheck = 'SELECT * FROM `accounts` WHERE email = ?;'

let getuser = 'SELECT * FROM `accounts` WHERE username = ?;'

let getuserbyemail = 'SELECT * FROM `accounts` WHERE email = ?;'

let getproducts = 'SELECT * FROM `products`;'

let updatename = 'UPDATE accounts SET name = ? WHERE username = ?;'

let updateaddr1 = 'UPDATE accounts SET address_a = ? WHERE username = ?;'

let updateaddr2 = 'UPDATE accounts SET address_b = ? WHERE username = ?;'

let alterstatement = 'UPDATE accounts SET password = ? WHERE email = ?;'


function inserter(a,b,c,d){
  pool.query("INSERT INTO `accounts` (`username`, `name`, `email`, `password`, `post`) VALUES (?, ?, ?, ?, 'user');", [a,b,c,d])
}

function alterpass(email, pass){
  pool.query(alterstatement, [pass, email], (err)=>{
    if(err){
      console.log("queries.js")
    }
  })
}

module.exports = {
    inserter,
    emailcheck,
    usernamecheck,
    getuser,
    updatename,
    updateaddr1,
    updateaddr2,
    getproducts,
    getuserbyemail,
    alterpass
}