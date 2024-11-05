const fs = require("fs");

function stamp(filename){
    let t = new Date();
    var date = t.getDate()
    var time = t.toLocaleTimeString();
  
    var d = new Date();
      var da = d.toLocaleDateString();
  
    var stamp = da+" | "+time+": Presisun started"
  
    fs.appendFile(filename, stamp.toString()+"\n", (err, res)=>{})
  
    return stamp
}
  
module.exports = {
    stamp
}
