//timestamp
//0 -- Jan 1st 1970 00:00:00 am
//1000 -- Jan 1st 1970 00:00:01 am
//10000 -- Jan 1st 1970 00:00:10 am

let moment = require("moment");

let date = new moment();

console.log(date.format("h:mm a"));

let someTimeMoment = new moment().valueOf();

console.log(someTimeMoment);