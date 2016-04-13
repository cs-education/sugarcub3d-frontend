/**
 * Created by an5ra on 3/11/2016.
 */
// GLOBAL VARIABLES
printStatus = {}

/**
 * Function to get URL Parameter
 * Example: http://dummy.com/?technology=jquery&blog=jquerybyexample
 * var tech = getUrlParameter('technology');
 * var blog = getUrlParameter('blog');
 * @param sParam
 * @returns {boolean}
 */
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};
var fileURL = 'http://octopi.local/api/job/'+ getUrlParameter('initials') + '.gcode';
postPrintJob;
var getPrintStatus = function () {
    $.ajax({
        url: 'http://octopi.local/api/job',
        type: 'get',
        //data: {
        //    access_token: 'XXXXXXXXXXXXXXXXXXX'
        //},
        headers: {
            'X-Api-Key': '54F92B0073324CD896365284D79DA7D5'
        },
        dataType: 'application/json',
        success: function (data) {
            console.log(data.state);
            console.log(data.estimatedPrintTime);
        }
    });
}

var getPrintStatus = function () {
    $.ajax({
        url: 'http://octopi.local/api/job/',
        type: 'get',
        //data: {
        //    access_token: 'XXXXXXXXXXXXXXXXXXX'
        //},
        headers: {
            'X-Api-Key': '54F92B0073324CD896365284D79DA7D5'
        },
        dataType: 'application/json',
        success: function (data) {
            $('#printer-status').append(data.state);
            $('#printer-est-time').append(data.estimatedPrintTime);
            $('#printer-avg-time').append(data.job.averagePrintTime);

        }
    });
}

var postPrintJob = function () {
    $.ajax({
        url: fileURL,
        type: 'post',
        //data: {
        //    access_token: 'XXXXXXXXXXXXXXXXXXX'
        //},
        headers: {
            'X-Api-Key': '54F92B0073324CD896365284D79DA7D5'
        },
        data: {
            'command': 'select',
            'print': true
        },
        dataType: 'application/json',
        success: function (data) {
            alert("print job sent!")
        }
    });
}


setInterval(function () {
    getPrintStatus();
}, 2000);