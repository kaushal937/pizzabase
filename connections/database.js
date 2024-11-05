const mysql = require('mysql2');

const pool = mysql.createConnection({
    host      :`${process.env.CPHOST}`,
    user      :`${process.env.CPUSER}`,
    password  :`${process.env.CPPASS}`,
    database  :`${process.env.CPDB}`
  })
  
  function conn(){
  pool.connect((err) => {
    if(err){
      console.log("database connection status: "+"false" + err)
      return
    }
    console.log("database connection status: "+"true")
  })
  }

module.exports = {
    conn,
    pool
}