var data = [
        {
            "name":                     "Cocolo Ramen",
            "hours": [
                {
                    "day":              "Sun",
                    "open":             {'hour': 18, 'minute': 30},
                    "close":            {'hour': 24}
                },
                {
                    "day":              "Mon",
                    "open":             {'hour': 18, 'minute': 30},
                    "close":            {'hour': 24}
                },
                {
                    "day":              "Tue",
                    "open":             {'hour': 18, 'minute': 30},
                    "close":            {'hour': 24}
                },
                {
                    "day":              "Wed",
                    "open":             {'hour': 18, 'minute': 30},
                    "close":            {'hour': 24}
                },
                {
                    "day":              "Thu",
                    "open":             {'hour': 18, 'minute': 30},
                    "close":            {'hour': 24}
                },
                {
                    "day":              "Fri",
                    "open":             {'hour': 18, 'minute': 30},
                    "close":            {'hour': 24}
                },
                {
                    "day":              "Sat",
                    "open":             {'hour': 18, 'minute': 30},
                    "close":            {'hour': 24}
                }
            ]
        },
        {
            "name":                     "Confiserie Melanie",
            "hours": [
                {
                    "day":              "Sun",
                    // "formatted":        "Closed",
                    "open":             null,
                    "close":            null,
                },
                {
                    "day":              "Mon",
                    // "formatted":        "10:00 am - 7:00 pm",
                    "open":             {'hour': 10},
                    "close":            {'hour': 19}
                },
                {
                    "day":              "Tue",
                    // "formatted":        "10:00 am - 7:00 pm",
                    "open":             {'hour': 10},
                    "close":            {'hour': 19}
                },
                {
                    "day":              "Wed",
                    // "formatted":        "10:00 am - 7:00 pm",
                    "open":             {'hour': 10},
                    "close":            {'hour': 19}
                },
                {
                    "day":              "Thu",
                    // "formatted":        "10:00 am - 7:00 pm",
                    "open":             {'hour': 10},
                    "close":            {'hour': 19}
                },
                {
                    "day":              "Fri",
                    // "formatted":        "10:00 am - 7:00 pm",
                    "open":             {'hour': 10},
                    "close":            {'hour': 19}
                },
                {
                    "day":              "Sat",
                    // "formatted":        "10:00 am - 4:00 pm",
                    "open":             {'hour': 10},
                    "close":            {'hour': 16}
                }
            ]
        },
        {
            "name":                     "Da Jia Le",
            "hours": [
                {
                    "day":              "Sun",
                    // "formatted":        "12:00 pm - 11:00 pm",
                    "open":             {'hour': 12},
                    "close":            {'hour': 23}
                },
                {
                    "day":              "Mon",
                    // "formatted":        "12:00 pm - 11:00 pm",
                    "open":             {'hour': 12},
                    "close":            {'hour': 23}
                },
                {
                    "day":              "Tue",
                    // "formatted":        "12:00 pm - 11:00 pm",
                    "open":             {'hour': 12},
                    "close":            {'hour': 23}
                },
                {
                    "day":              "Wed",
                    // "formatted":        "12:00 pm - 11:00 pm",
                    "open":             {'hour': 12},
                    "close":            {'hour': 23}
                },
                {
                    "day":              "Thu",
                    // "formatted":        "12:00 pm - 11:00 pm",
                    "open":             {'hour': 12},
                    "close":            {'hour': 23}
                },
                {
                    "day":              "Fri",
                    // "formatted":        "12:00 pm - 11:00 pm",
                    "open":             {'hour': 12},
                    "close":            {'hour': 23}
                },
                {
                    "day":              "Sat",
                    // "formatted":        "12:00 pm - 11:00 pm",
                    "open":             {'hour': 12},
                    "close":            {'hour': 23}
                }
            ]
        }
    ],
    now = moment(),
    today = now.day(),
    listHTML = '';



// check if current time is within place's open and close time
function checkIfOpen(place) {
    var targetRange = place.hours[today];

    if(targetRange.open === null && targetRange.close === null) {
        return false;
    }
    else {
        // set hours to a short var
        var openHour = targetRange.open.hour;
        var closeHour = targetRange.close.hour;
        // set minutes to a short var, if none specified set to 00
        var openMinute = targetRange.open.minute ? targetRange.open.minute : 00;
        var closeMinute = targetRange.close.minute ? targetRange.close.minute : 00;

        console.log('targetRange.open.minute: ', targetRange.open.minute);
        console.log('targetRange.close.minute: ', targetRange.close.minute);
        console.log('openMinute: ', openMinute);
        console.log('closeMinute: ', closeMinute);

        var todayOpen = moment().set({'day': today, 'hour': openHour, 'minute': openMinute, 'second': 00});
        var todayClose = moment().set({'day': today, 'hour': closeHour, 'minute': closeMinute, 'second': 00});

        console.log('todayOpen: ', todayOpen);
        console.log('todayClose: ', todayClose);
        
        return now.isBetween(todayOpen, todayClose);
    }
}

// loop over list, check status of each location, concat html to listHTML var
_.forEach(data, function(currentObject) {
    currentObject.isOpen = checkIfOpen(currentObject);

    listHTML += '<li class="place"><h2 class="place__name">' + currentObject.name + '</h2><h3 class="place__status">' + 'isOpen: ' + currentObject.isOpen + '</h3></li>';

    console.log('currentObject: ', currentObject);
});

// render to the page
$('.places').append(listHTML);


