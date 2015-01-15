$(document).ready(function() {
    $('.dbcolumn').click(function() {
        //alert("Clicked!");
        console.log($(this).text()+" clicked.");
        param = $(this).text();
        updateTimePlot(param);
    });
    $('#mindateinp').keydown(function (e){
        if(e.keyCode == 13){
            var input = document.getElementById('#mindateinp')
            mindate = input.value;
            console.log("mindate is");
            console.log(mindate);
        }
    });
    $('#maxdateinp').keydown(function (e){
        if(e.keyCode == 13){
            var input = document.getElementById('#maxdateinp')
            maxdate = input.value;
            console.log("maxdate is");
            console.log(maxdate);
        }
    });
    $('.objectnames').click(function() {
        objectNm = $(this).text();
        updateTimePlot(param);
    });
    $('.dbcolumn').mouseenter(function() {
        $(this).fadeTo('fast', 1.0);
    });
    $('div').mouseleave(function() {
        $('.dbcolumn').fadeTo('fast', 0.85);
    });
});

function determineTable(par) {
    switch(par) {
/* OBSERVATIONS TABLE */

        case 'propid':
            return 'observations';
            break;
        case 'rexptime':
            return 'observations';
            break;
        case 'exptime':
            return 'observations';
            break;
        case 'texptime':
            return 'observations';
            break;
        case 'darktime':
            return 'observations';
            break;
        case 'pixtime':
            return 'observations';
            break;
        case 'powstat':
            return 'observations';
            break;
        case 'deckpos':
            return 'observations';
            break;
        case 'focus':
            return 'observations';
            break;
        case 'maxexp':
            return 'observations';
            break;
        case 'obs_ra':
            return 'observations';
            break;
        case 'obs_dec':
            return 'observations';
            break;
        case 'obs_ra_decdeg':
            return 'observations';
            break;
        case 'obs_dec_decdeg':
            return 'observations';
            break;
        case 'alt':
            return 'observations';
            break;
        case 'ha':
            return 'observations';
            break;
        case 'st':
            return 'observations';
            break;
        case 'zd':
            return 'observations';
            break;
        case 'airmass':
            return 'observations';
            break;

/*VELOCITIES TABLE */

        case 'mnvel':
            return 'velocities';
            break;
        case 'mdvel':
            return 'velocities';
            break;
        case 'bc':
            return 'velocities';
            break;
        case 'z':
            return 'velocities';
            break;
        case 'gain':
            return 'velocities';
            break;
        case 'cts':
            return 'velocities';
            break;
        case 'errvel':
            return 'velocities';
            break;
        case 'mdchi':
            return 'velocities';
            break;
        case 'nchunk':
            return 'velocities';
            break;

/* ENVIRONMENT TABLE */

        case 'ccdtemp':
            return 'environment';
            break;
        case 'necktemp':
            return 'environment';
            break;
        case 'tempgrat':
            return 'environment';
            break;
        case 'temptlow':
            return 'environment';
            break;
        case 'temptcen':
            return 'environment';
            break;
        case 'tempstru':
            return 'environment';
            break;
        case 'tempencl':
            return 'environment';
            break;
        case 'tempcoud':
            return 'environment';
            break;
        case 'tempinst':
            return 'environment';
            break;
        case 'tempiodin':
            return 'environment';
            break;
        case 'dewpress':
            return 'environment';
            break;
        case 'echpress':
            return 'environment';
            break;
        case 'baromete':
            return 'environment';
            break;
    }
}

var tables = {
    "propid" : { "table" : "observations", "name" : "Proposal ID", "description": "Proposal ID"},
    "rexptime" : { "table" : "observations", "name" : "Requested Time", "description": "requested exposure time (seconds)"},
    "exptime" : { "table" : "observations", "name" : "Exposure Time", 'description': "final exposure time in seconds"},
    "texptime" : { "table" : "observations", "name" : "ExpMtr Time", 'description': 'requested exposure meter time (seconds)'},
    "darktime" : { "table" : "observations", "name" : "Dark Time", 'description': 'dark current time (seconds)'},
    "pixtime" : { "table" : "observations", "name" : "Pixel Time", 'description': 'pixel time (microseconds)'},
    "deckpos" : { "table" : "observations", "name" : "Decker Position", 'description': 'decker position (mm)'},
    "focus" : { "table" : "observations", "name" : "Focus", 'description': 'focus position (mm)'},
    "maxexp" : { "table" : "observations", "name" : "Max Exposure", 'description': 'maximum exposure meter exposure time (milliseconds)'},
    "obs_ra_decdeg" : { "table" : "observations", "name" : "Right Ascension", 'description': 'Right Ascension in Decimal Degrees'},
    "obs_dec_decdeg" : { "table" : "observations", "name" : "Declination", 'description': 'Declination in Decimal Degrees'},
    "alt" : { "table" : "observations", "name" : "Altitude", 'description': 'Altitude (deg)'},
    "ha" : { "table" : "observations", "name" : "Hour Angle", 'description': 'Hour angle'},
    "st" : { "table" : "observations", "name" : "Sidereal Time", 'description': 'Sidereal time'},
    "zd" : { "table" : "observations", "name" : "Zenith Distance", 'description': 'Zenith distance'},
    "airmass" : { "table" : "observations", "name" : "Airmass", 'description': 'Airmass'},
}

/*
        $.ajax({
            type: "POST", 
            url: "php/getNewData.php", 
            data: { param: $(this).text(); }
        },
        success: function( data ) {
            console.log(data);
        }
        });
        });


$(function (){
   $("#myimg").click(function() {
      $.ajax({
        type: "POST",
        url: "some.php",
        data: { param: $(this).attr('src'); }
      }).done(function( msg ) {
             alert( "Data Saved: " + msg );
     });
  });
}

    $('button').click(function() {
    });


*/

/*
    $.ajax({
        type: 'GET',
        url: 'getNewData.php',
        data: {
            param: 'mnvel'
        },
        success: function(data) {
            console.log("jQuery ajax success in script.js!!");
            //var newdata = data;
            //makeTimeSeriesPlot(newdata);
            $('#newdata').append('<p>' + newdata + '</p>');
        }
    });
*/