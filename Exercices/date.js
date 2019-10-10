var moment = require('moment');

var years = moment('2019-01-01');

for (i = 0; i < 365; i++) {
    var day = years.add(1, 'days');
    console.log(day.format('MM/DD')); 
}

