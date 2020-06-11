var weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];
var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
var x = 0;

//Some handy ways to work with the date
var visibleYear = new Date().getFullYear();
var visibleMonth = new Date().getMonth();
const currentDay = new Date().getDate();
const currentYear = visibleYear;
const currentMonth = visibleMonth;

//This function returns the number of days in the NEXT month
function daysInMonth(month, year) {
    return new Date(year, month + 1, 0).getDate();
}

//This function returns the number of days before the 1st of the month
function dayOffset(month, year) {
    return new Date(year, month, 1).getDay();
}

var currentDaysInMonth = daysInMonth(visibleMonth, visibleYear);
var currentDayOffset = dayOffset(visibleMonth, visibleYear);

//A function to truncate a string and add ... to a specific number of characters
var longString = "This is a long string to see where things get cut off";

function truncateString(str, num) {
    if (str.length <= num) {
        return str;
    }
    return str.slice(0, num) + "...";
}

console.log(truncateString(longString, 10));
console.log(truncateString(longString, 20));

//Going to see what the bounding rectangle of the day names are
function adjustHeight() {
    var rect = $("#dayNames")[0].getBoundingClientRect();
    winHeight = $(window).height() - rect.bottom;
    $(".flex-container > div").css({
        height: winHeight / 6,
    });
}

function buildCalendar(change) {
    if (change == "+") {
        if (visibleMonth == 11) {
            visibleYear += 1;
            visibleMonth = 0;
        } else {
            visibleMonth += 1;
        }
    } else if (change == "-") {
        if (visibleMonth == 0) {
            visibleYear -= 1;
            visibleMonth = 11;
        } else {
            visibleMonth -= 1;
        }
    }
    currentDaysInMonth = daysInMonth(visibleMonth, visibleYear);
    currentDayOffset = dayOffset(visibleMonth, visibleYear);

    $(".monthName").text(months[visibleMonth] + "  " + visibleYear);
    //First let's get the dayNames DIV
    var dayNamesDiv = document.getElementById("dayNames");
    dayNamesDiv.innerHTML = "";
    //Now we create a for loop that builds the content
    for (var i = 0; i < weekdays.length; i++) {
        //Don't forget to use += to add to the content rather than replace it
        dayNamesDiv.innerHTML += "<div>" + weekdays[i] + "</div>";
    }

    var allFlex = $(".flex-container");
    //Now we create a for loop that builds the content
    var myCount = 1;
    // var daysOffset = document.getElementById("daysOffset").value;
    // var numberOfDaysToShow = document.getElementById("numDaysToShow").value;
    const copyDaysOffset = currentDayOffset;

    for (var i = 0; i < allFlex.length; i++) {
        allFlex[i].innerHTML = "";

        //Don't forget to use += to add to the content rather than replace it
        for (var j = 0; j < 7; j++) {
            if (myCount > currentDaysInMonth || currentDayOffset > 0) {
                allFlex[i].innerHTML +=
                    "<div style='visibility: hidden'>" + myCount + "</div>";
                currentDayOffset--;
            } else {
                var div = "<div>";
                if (
                    currentDay == myCount &&
                    currentMonth == visibleMonth &&
                    currentYear == visibleYear
                ) {
                    div =
                        '<div style="background-color: orange; color: white">';
                }
                allFlex[i].innerHTML += div + myCount + "</div>";
                myCount++;
            }
        }
    }
    if (
        !(copyDaysOffset == 6 && currentDaysInMonth > 29) &&
        !(copyDaysOffset == 5 && currentDaysInMonth > 30)
    ) {
        $("#lastDiv").css({ display: "none" });
    } else {
        $("#lastDiv").css({ display: "flex" });
    }

    adjustHeight();
    $(window).resize(function () {
        adjustHeight();
    });
}
