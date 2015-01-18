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
    "mnvel" : { "table" : "velocities", "name" : "RV [m/s]", 'description': "Mean RV measurement [m/s]"},
    "mdvel" : { "table" : "velocities", "name" : "Median RV [m/s]", 'description': "Median RV measurement [m/s]"},
    "bc" : { "table" : "velocities", "name" : "Barycentric Correction [m/s]", 'description': "Barycentric correction [m/s]"},
    "z" : { "table" : "velocities", "name" : "Doppler Shift", 'description': "Doppler shift z"},
    "gain" : { "table" : "velocities", "name" : "Gain", 'description': "Gain"},
    "cts" : { "table" : "velocities", "name" : "Counts", 'description': "Counts"},
    "errvel" : { "table" : "velocities", "name" : "Uncertainty [m/s]", 'description': "Uncertainty [m/s]"},
    "mdchi" : { "table" : "velocities", "name" : "Median Chi Squared", 'description': "Median chi squared"},
    "nchunk" : { "table" : "velocities", "name" : "N Chunks", 'description': "Number of chunks"},
    "ccdtemp" : { "table" : "environment", "name" : "CCD Temp", 'description': "CCD temperature"},
    "necktemp" : { "table" : "environment", "name" : "Neck Temp", 'description': "Dewar neck temperature"},
    "tempgrat" : { "table" : "environment", "name" : "Grating Temp", 'description': "Temperature near rchelle grating"},
    "temptlow" : { "table" : "environment", "name" : "Lower Table Temp", 'description': "Temperature below the optical table"},
    "temptcen" : { "table" : "environment", "name" : "Central Table Temp", 'description': "Optical table central temperature"},
    "tempstru" : { "table" : "environment", "name" : "Structure Temp", 'description': "Structural framework temperature"},
    "tempencl" : { "table" : "environment", "name" : "Warm Room Temp", 'description': "Interior room temperature"},
    "tempcoud" : { "table" : "environment", "name" : "Coude Room Temp", 'description': "Coude room temperature"},
    "tempinst" : { "table" : "environment", "name" : "Inst Temp", 'description': "Inst temperature"},
    "tempiodin" : { "table" : "environment", "name" : "Iodine Temp", 'description': "Iodine cell temperature"},
    "dewpress" : { "table" : "environment", "name" : "Dewar Pressure", 'description': "Dewar pressure"},
    "echpress" : { "table" : "environment", "name" : "Echelle Pressure", 'description': "Echelle grating enclosure pressure"},
    "baromete" : { "table" : "environment", "name" : "CHIRON Pressure", 'description': "Pressure transducer pressure on optical table"},
    "mdpar1" : { "table" : "psfs", "name" : "Mean Par 1", 'description': "Mean par from Dopp"},
    "mdpar2" : { "table" : "psfs", "name" : "Mean Par 2", 'description': "Mean par from Dopp"},
    "mdpar3" : { "table" : "psfs", "name" : "Mean Par 3", 'description': "Mean par from Dopp"},
    "mdpar4" : { "table" : "psfs", "name" : "Mean Par 4", 'description': "Mean par from Dopp"},
    "mdpar5" : { "table" : "psfs", "name" : "Mean Par 5", 'description': "Mean par from Dopp"},
    "mdpar6" : { "table" : "psfs", "name" : "Mean Par 6", 'description': "Mean par from Dopp"},
    "mdpar7" : { "table" : "psfs", "name" : "Mean Par 7", 'description': "Mean par from Dopp"},
    "mdpar8" : { "table" : "psfs", "name" : "Mean Par 8", 'description': "Mean par from Dopp"},
    "mdpar9" : { "table" : "psfs", "name" : "Mean Par 9", 'description': "Mean par from Dopp"},
    "mdpar10" : { "table" : "psfs", "name" : "Mean Par 10", 'description': "Mean par from Dopp"},
    "mdpar11" : { "table" : "psfs", "name" : "Mean Par 11", 'description': "Mean par from Dopp"},
    "mdpar12" : { "table" : "psfs", "name" : "Mean Par 12", 'description': "Mean par from Dopp"},
    "mdpar13" : { "table" : "psfs", "name" : "Mean Par 13", 'description': "Mean par from Dopp"},
    "mdpar14" : { "table" : "psfs", "name" : "Mean Par 14", 'description': "Mean par from Dopp"},
    "mdpar15" : { "table" : "psfs", "name" : "Mean Par 15", 'description': "Mean par from Dopp"},
    "mdpar16" : { "table" : "psfs", "name" : "Mean Par 16", 'description': "Mean par from Dopp"},
    "mdpar17" : { "table" : "psfs", "name" : "Mean Par 17", 'description': "Mean par from Dopp"},
    "mdpar18" : { "table" : "psfs", "name" : "Mean Par 18", 'description': "Mean par from Dopp"},
    "mdpar19" : { "table" : "psfs", "name" : "Mean Par 19", 'description': "Mean par from Dopp"},
    "mdpar20" : { "table" : "psfs", "name" : "Mean Par 20", 'description': "Mean par from Dopp"},
    "mnpar1" : { "table" : "psfs", "name" : "Median Par 1", 'description': "Mean par from Dopp"},
    "mnpar2" : { "table" : "psfs", "name" : "Median Par 2", 'description': "Mean par from Dopp"},
    "mnpar3" : { "table" : "psfs", "name" : "Median Par 3", 'description': "Mean par from Dopp"},
    "mnpar4" : { "table" : "psfs", "name" : "Median Par 4", 'description': "Mean par from Dopp"},
    "mnpar5" : { "table" : "psfs", "name" : "Median Par 5", 'description': "Mean par from Dopp"},
    "mnpar6" : { "table" : "psfs", "name" : "Median Par 6", 'description': "Mean par from Dopp"},
    "mnpar7" : { "table" : "psfs", "name" : "Median Par 7", 'description': "Mean par from Dopp"},
    "mnpar8" : { "table" : "psfs", "name" : "Median Par 8", 'description': "Mean par from Dopp"},
    "mnpar9" : { "table" : "psfs", "name" : "Median Par 9", 'description': "Mean par from Dopp"},
    "mnpar10" : { "table" : "psfs", "name" : "Median Par 10", 'description': "Mean par from Dopp"},
    "mnpar11" : { "table" : "psfs", "name" : "Median Par 11", 'description': "Mean par from Dopp"},
    "mnpar12" : { "table" : "psfs", "name" : "Median Par 12", 'description': "Mean par from Dopp"},
    "mnpar13" : { "table" : "psfs", "name" : "Median Par 13", 'description': "Mean par from Dopp"},
    "mnpar14" : { "table" : "psfs", "name" : "Median Par 14", 'description': "Mean par from Dopp"},
    "mnpar15" : { "table" : "psfs", "name" : "Median Par 15", 'description': "Mean par from Dopp"},
    "mnpar16" : { "table" : "psfs", "name" : "Median Par 16", 'description': "Mean par from Dopp"},
    "mnpar17" : { "table" : "psfs", "name" : "Median Par 17", 'description': "Mean par from Dopp"},
    "mnpar18" : { "table" : "psfs", "name" : "Median Par 18", 'description': "Mean par from Dopp"},
    "mnpar19" : { "table" : "psfs", "name" : "Median Par 19", 'description': "Mean par from Dopp"},
    "mnpar20" : { "table" : "psfs", "name" : "Median Par 20", 'description': "Mean par from Dopp"},
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