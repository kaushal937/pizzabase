let error_occured = {
  error : "Error Occured"
}
let user_exists = {
  error : "A user with same username already exists. Please use a different username"
}
let pass_dont_match = {
  error : "The passwords do not match"
}
let fields_cannot_be_empty = {
  error : "Fields cannot be empty"
}
let emailnotvalid = {
  error : "Email not valid"
}
let email_in_use = {
  error : "Email already in use"
}
let s = {
  error : "otp"
}
let reg_succesful = {
  error : "Registration succesful!"
}
let otp_incorrect = {
  error : "The otp is wrong"
}
let user_not_found = {
  error : "No user found"
}
let authenticated = {
  error : "cango"
}
let incorrect_pass = {
  error : "The password is incorrect"
}
let input_validation = {
  error : "You can use only '.' and '_' as special characters"
}
let not_logged_in = {
  error : "You are not logged in"
}
let invalid_ndwarn = {
  error : "Error occured. Experimenting with the website scripts may cause you account to be deleted"
}
let succesfully_updated_creds = {
  error : "Succesfully updated your credentials"
}
let already_logged_in = {
  error : "You are already logged in"
}
let altered_pass = {
  error : "Changed your password succesfully"
}

function email_sent(email){
  var string = {error : "Authentication E-mail has been sent on "+email, code : 1}

  return string
}

module.exports = {
  user_exists,
  email_in_use,
  s,
  reg_succesful,
  otp_incorrect,
  pass_dont_match,
  fields_cannot_be_empty,
  emailnotvalid,
  user_not_found,
  authenticated,
  incorrect_pass,
  input_validation,
  not_logged_in,
  invalid_ndwarn,
  succesfully_updated_creds,
  error_occured,
  already_logged_in,
  email_sent,
  altered_pass
}