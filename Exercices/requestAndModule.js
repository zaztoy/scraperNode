const request = require('request');
var email_checker = require("./Exercices/email_checker.js");

request('https://api.deezer.com/user/2529', { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  console.log(body.name);
});

// request.get("https://api.deezer.com/user/2529", (error, response, body) => {
//     console.log(JSON.parse(body).name);
// })


var result_of_email_checking = email_checker.check_that_email("john.doe@gmail.com");

	
console.log(result_of_email_checking);
