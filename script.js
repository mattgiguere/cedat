$(document).ready(function() {
    $('.velocities').click(function() {
        //alert("Clicked!");
        update($(this).text());
    });
    $('.velocities').mouseenter(function() {
        $(this).fadeTo('fast', 1.0);
    });
    $('div').mouseleave(function() {
        $('.velocities').fadeTo('fast', 0.85);
    });
});

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