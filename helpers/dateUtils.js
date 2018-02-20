
exports.removeTimeFromDate = function (date) {
    if (date != null) {
        var newDate = date.toISOString();
        return newDate.substring(0, newDate.indexOf('T'));
    }
    else return date;

}