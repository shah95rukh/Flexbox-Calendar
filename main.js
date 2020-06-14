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
var monthColors = [
    "black",
    "goldenrod",
    "cornflowerblue",
    "chocolate",
    "darkolivegreen",
    "darksalmon",
    "steelblue",
    "darkorchid",
    "hotpink",
    "coral",
    "cadetblue",
    "darkgrey",
];
var monthFonts = [
    "Megrim",
    "Montez",
    "Bangers",
    "Nanum Pen Script",
    "Arbutus",
    "Swanky and Moo Moo",
    "Kranky",
    "Amatic SC",
    "Alike Angular",
    "Just Me Again Down Here",
    "Monofett",
    "ABeeZee",
];

// get date
var visibleYear = new Date().getFullYear();
var visibleMonth = new Date().getMonth();
const currentDay = new Date().getDate();
const currentYear = visibleYear;
const currentMonth = visibleMonth;
var currentDaysInMonth = daysInMonth(visibleMonth, visibleYear);
var currentDayOffset = dayOffset(visibleMonth, visibleYear);
var eventDate;
let myMap = new Map();
let easterEgg = false;
var x;

function daysInMonth(month, year) {
    return new Date(year, month + 1, 0).getDate();
}
function dayOffset(month, year) {
    return new Date(year, month, 1).getDay();
}
function truncateString(str, num) {
    if (str.length <= num) {
        return str;
    }
    return str.slice(0, num) + "...";
}
function adjustHeight() {
    var rect = $("#dayNames")[0].getBoundingClientRect();
    winHeight = $(window).height() - rect.bottom;
    // change styles depending on the device type
    if ($(".flex-container > div").css("flex-basis") == "13%") {
        $(".flex-container > div").css({
            height: winHeight / x,
        });
        $(".eText").css({ "font-size": "14px" });
    } else {
        $(".flex-container > div").css({
            height: "auto",
        });
        $(".eText").css({ "font-size": "14px" });
    }
}

// add styles and layout rules
function defineStructure() {
    if (visibleMonth == 0 && visibleYear == 2021 && easterEgg == false) {
        on();
        easterEgg = true;
        visibleYear = 2020;
    }
    currentDaysInMonth = daysInMonth(visibleMonth, visibleYear);
    currentDayOffset = dayOffset(visibleMonth, visibleYear);
    $(".monthName").text(months[visibleMonth] + "  " + visibleYear);
    $(".calendar-top").css({ background: monthColors[visibleMonth] });
    $("h1").css({ "font-family": monthFonts[visibleMonth] });
    $("#dayNames").css({ "font-family": monthFonts[visibleMonth] });

    // Week names
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
            `<div onclick="buildCalendar(${i}, ${visibleYear})">` +
            months[i] +
            "</div>";
    }
}
// builds a responsive calendar
function buildCalendar(...change) {
    // switch months
    if (change[0] == "+") {
        if (visibleMonth == 11) {
            visibleYear += 1;
            visibleMonth = 0;
        } else {
            visibleMonth += 1;
        }
    } else if (change[0] == "-") {
        if (visibleMonth == 0) {
            visibleYear -= 1;
            visibleMonth = 11;
        } else {
            visibleMonth -= 1;
        }
    } else {
        if (Number.isInteger(change[0])) {
            visibleMonth = change[0];
            visibleYear = change[1];
        }
    }
    defineStructure();

    var allFlex = $(".flex-container");
    var myCount = 1;
    const copyDaysOffset = currentDayOffset;
    for (var i = 0; i < allFlex.length; i++) {
        allFlex[i].innerHTML = "";
        for (var j = 0; j < 7; j++) {
            if (myCount > currentDaysInMonth || currentDayOffset > 0) {
                allFlex[i].innerHTML +=
                    "<div class='offsetDivs'>" + myCount + "</div>";
                currentDayOffset--;
            } else {
                var div = `<div class="dateDiv" onclick="scheduleEvent(${myCount},${visibleMonth},${visibleYear})">`;
                if (
                    currentDay == myCount &&
                    currentMonth == visibleMonth &&
                    currentYear == visibleYear
                ) {
                    div = `<div class="dateDiv" onclick="scheduleEvent(${myCount},${visibleMonth},${visibleYear})" style='background-color: darkred; color: white'>`;
                }
                // fetch events data
                var strVal = `${myCount},${visibleMonth},${visibleYear}`;
                var eStr = "</div>";
                if (myMap.has(strVal)) {
                    eStr = "";
                    myMap.get(strVal).forEach((eachEvent) => {
                        eStr +=
                            `<div class="eText">` +
                            truncateString(
                                eachEvent.time + " - " + eachEvent.description,
                                20
                            ) +
                            "</div>";
                    });
                    eStr += "</div>";
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
                    eStr;
                myCount++;
            }
        }
    }
    $(".flex-container > div").css({
        border: `1px solid ${monthColors[visibleMonth]}`,
    });
    toggleLastDiv(copyDaysOffset);
    adjustHeight();
}

// adds or removes the last div based upon num of days
function toggleLastDiv(copyDaysOffset) {
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
}

// creates event by storing it in a Map data-structure
function createEvent() {
    var myStr = `${eventDate[0]},${eventDate[1]},${eventDate[2]}`;
    var myEvent = [];
    myEvent.push({
        time: $("#time").val(),
        description: $("#desc").val(),
    });
    if (myMap.has(myStr)) {
        for (var i = 0; i < myMap.get(myStr).length; i++) {
            myEvent.push(myMap.get(myStr)[i]);
        }
        myEvent.sort(function (a, b) {
            return a.time.localeCompare(b.time);
        });
    }
    myMap.set(myStr, myEvent);
    buildCalendar(eventDate[1], eventDate[2]);
}

// checks if the input fields are filled
function inputValidation() {
    $("body input").change(function () {
        var empty = false;
        $("body input").each(function () {
            if ($(this).val() == "") {
                empty = true;
            }
        });
        if (!empty) {
            $("#schedule").removeAttr("disabled");
        }
    });
}

// opens and closes the calendar schedule modal
function scheduleEvent(...eDate) {
    if ($("#myModal").css("display") == "none") {
        eventDate = eDate;
        $("#myModal").css({ display: "block" });
        inputValidation();
    } else {
        // saves when the schedule button is pressed
        if (eDate[0] == -1) {
            createEvent();
        }
        // close the modal & clear all the values
        $("#myModal").css({ display: "none" });
        $("#schedule").attr("disabled", "disabled");
        $("body input").each(function () {
            $(this).val("");
        });
    }
}

function on() {
    document.getElementById("overlay").style.display = "block";
}
function off() {
    buildCalendar(0, 2021);
    document.getElementById("overlay").style.display = "none";
}

$(window).resize(function () {
    adjustHeight();
});
