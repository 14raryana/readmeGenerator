var date = new Date();
var month = date.getMonth() + 1;
var day = date.getDate();
var year = date.getFullYear();
var fullDate = month + "/" + day + "/" + year;
// console.log(fullDate);

exports.myDate = function() {
    return fullDate;
}

