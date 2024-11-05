//DO NOT TOUCH
var logs = new Map()
//DON NOT TOUCH


function checkLoggedIn(a){
  return logs.has(a)
}

function logout(b){
    logs.delete(b)
}

function getSessionUid(c){
    return logs.get(c)
}
  
function login(x, y){
    var a = x+""
    var b = y+""

    logs.set(a.toString(), b.toString())
}

function consoleAll(){
    console.log(logs)
}
  
  module.exports = {
    checkLoggedIn,
    logout,
    getSessionUid,
    login,
    consoleAll
  }
  logs.entries()