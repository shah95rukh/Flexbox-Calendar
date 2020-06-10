var x = 0;

$(document).ready(function() {
    adjustHeight();
    $(window).resize(function() {
        adjustHeight();
    });
});

//Going to see what the bounding rectangle of the day names are
function adjustHeight() {
    var rect = $('#topDiv')[0].getBoundingClientRect();
    winHeight = $(window).height() - rect.bottom;
    $('.flex-container').css({
        'height': winHeight,
    });
}

//Some handy ways to work with the date
var currentYear = new Date().getFullYear();
var currentMonth = new Date().getMonth();
var currentDay = new Date().getDate();

//This function returns the number of days in a month
function daysInMonth(month, year) {
	return new Date(year, (month + 1), 0).getDate();
}

//This function returns the number of days before the 1st of the month
function dayOffset(month, year) {
	return new Date(year, month, 1).getDay();
}

var currentDaysInMonth = daysInMonth(currentMonth, currentYear);
var currentDayOffset = dayOffset(currentMonth, currentYear);

console.log({
	currentDaysInMonth: currentDaysInMonth,
	currentDayOffset: currentDayOffset
});

//A function to truncate a string and add ... to a specific number of characters
var longString = "This is a long string to see where things get cut off";

function truncateString(str, num) {
	if (str.length <= num) {
		return str
	}
	return str.slice(0, num) + '...'
}

console.log(truncateString(longString, 10));
console.log(truncateString(longString, 20));