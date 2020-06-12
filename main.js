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

var subtractValue;
var i = 0;

//Going to see what the bounding rectangle of the day names are
// hardcoded way: subtract 22 because getBoundingClientRect doesn't
// get the correct value in the first try
function adjustHeight() {
    var rect = $("#dayNames")[0].getBoundingClientRect();
    i == 0 ? (subtractValue = 22) : (subtractValue = 0);
    winHeight = $(window).height() - rect.bottom - subtractValue;
    if ($(".flex-container > div").css("flex-basis") == "13%") {
        $(".flex-container > div").css({
            height: winHeight / x,
        });
    } else {
        $(".flex-container > div").css({
            height: "auto",
        });
    }
    i++;
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
    } else {
        if (Number.isInteger(change)) {
            visibleMonth = change;
        }
    }
    currentDaysInMonth = daysInMonth(visibleMonth, visibleYear);
    currentDayOffset = dayOffset(visibleMonth, visibleYear);
    $(".monthName").text(months[visibleMonth] + "  " + visibleYear);

    //First let's get the dayNames DIV
    var dayNamesDiv = document.getElementById("dayNames");
    dayNamesDiv.innerHTML = "";

    for (var i = 0; i < weekdays.length; i++) {
        dayNamesDiv.innerHTML += "<div>" + weekdays[i] + "</div>";
    }

    // Dropdown months
    var dropdownDiv = document.getElementById("dropdown-c");
    dropdownDiv.innerHTML = "";
    for (var i = 0; i < months.length; i++) {
        dropdownDiv.innerHTML +=
            `<div onclick="buildCalendar(${i})">` + months[i] + "</div>";
    }
    console.log(dropdownDiv);

    var allFlex = $(".flex-container");
    //Now we create a for loop that builds the content
    var myCount = 1;
    const copyDaysOffset = currentDayOffset;

    for (var i = 0; i < allFlex.length; i++) {
        allFlex[i].innerHTML = "";

        //Don't forget to use += to add to the content rather than replace it
        for (var j = 0; j < 7; j++) {
            if (myCount > currentDaysInMonth || currentDayOffset > 0) {
                allFlex[i].innerHTML +=
                    "<div class='offsetDivs'>" + myCount + "</div>";
                currentDayOffset--;
            } else {
                var div = "<div>";
                if (
                    currentDay == myCount &&
                    currentMonth == visibleMonth &&
                    currentYear == visibleYear
                ) {
                    div =
                        "<div style='background-color: orange; color: white'>";
                }
                allFlex[i].innerHTML +=
                    div +
                    "<div class='first-row'>" +
                    "<div>" +
                    myCount +
                    "</div>" +
                    "<div>" +
                    weekdays[j] +
                    "</div>" +
                    "</div>" +
                    "<div>Birthday re..</div>" +
                    "<div>Dancing class</div>" +
                    "</div>";
                myCount++;
            }
        }
    }
    if (
        !(copyDaysOffset == 6 && currentDaysInMonth > 29) &&
        !(copyDaysOffset == 5 && currentDaysInMonth > 30)
    ) {
        $("#lastDiv").css({ display: "none" });
        x = 5.5;
    } else {
        $("#lastDiv").css({ display: "flex" });
        x = 6.7;
    }

    adjustHeight();
}

$(window).resize(function () {
    adjustHeight();
});
