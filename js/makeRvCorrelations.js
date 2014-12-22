//Get the object name from the 'Object...' form input field:
var objectNm = '10700';
var param = 'mnvel';


//console.log(objectNm);

/*     ***Begin D3 Global Variables***
These are used for both makeInitTimeSeriesPlot()
and updateTimePlot()
*/

// Set the dimensions of the canvas / graph
var margin = {top: 30, right: 20, bottom: 30, left: 50},
    width = 1000 - margin.left - margin.right,
    height = 370 - margin.top - margin.bottom;

//add padding (in percent) so extrema don't fall on axes:
var padding = 5;
//calculate fractional padding:
var fpad = padding/100.

// Parse the date / time
//This is the line for the CSV
//var parseDate = d3.time.format("%d-%b-%y").parse;
//This is the line for data from the DB
var parseDate = d3.time.format("%Y-%m-%dT%H:%M:%S.%L").parse;

// Set the ranges
var xScale = d3.scale.linear().range([0, width]);
var yScale = d3.scale.linear().range([height - fpad*height, fpad*height]);

//add tool-tip:
var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<p><strong>Object:</strong> <span style='color:#428BCA'>" + d.objectnm + "</span></p>" +
            "<p><strong>Obnm:</strong> <span style='color:#428BCA'>" + d.obnm + "</span></p>";
  })

/*Add the svg canvas to the "d3" class div on the page.
The "d3" div is just a marker location so that I could
put the plot where I wanted it within the HTML.*/
var svg = d3.select(".d3")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");

svg.call(tip);

// Define the axes
var xAxis = d3.svg.axis()
                .scale(xScale)
                .orient("bottom")
                .ticks(5);

var yAxis = d3.svg.axis()
                .scale(yScale)
                .orient("left")
                .ticks(5);


//add observations to table:
var table = d3.select("#table-of-observations")
    .append('table')
    .attr("class", "table table-striped");

var thead = table.append("thead");
thead.append("th").text("Observation Name");
thead.append("th").text("Object Name");
thead.append("th").text("Exposure Time");
thead.append("th").text("SNR");
var newcolhead = thead.append("th").text('Zenith Distance');

var tbody = table.append('tbody');

/* ***End D3 Global Variables*** */
function makeInitTimeSeriesPlot() {

    //A little jQuery to print the data
    //for debugging purposes:
    //$('#newdata').append('<p>' + param + '</p>');

    // Define the line
    var valueline = d3.svg.line()
    //    .interpolate("basis")
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.ydata); });
        
    //Now fill in the area:
    var area = d3.svg.area()
        .x(function(d) { return x(d.date); })
        .y0(height)
        .y1(function(d) { return y(d.ydata); });

    /* append the data as circles to the svg canvas. circles
    are one of the 6 types of SVG elements. The whole list
    being:
    1. circle
    2. rect
    3. ellipse
    4. line
    5. path
    6. polygon
    */
    d3.json("php/getRVCorrelations.php?param=mnvel&tablenm=velocities&objectnm="+objectNm, function(error, data) {
        if (error) {
            console.log("There was an error loading the JSON blob.");
            console.log(error);
        } else {


            data.forEach(function(d) {
                d.xdata = +d.xdata;
                d.ydata = +d.ydata;
            });

            //create the rows that have all the 
            //data in __data__:
            var trs = tbody.selectAll('tr')
                .data(data)
                .enter()
                .append('tr');

            //Insert the columns into the table:
            var tds = trs.selectAll('td')
                        .data(function(d) { return [d.obnm, d.objectnm, d3.round(d.exptime, 2), d3.round(d.snr, 2), d.zd];})
                        .enter()
                        .append('td')
                        .text(function(d) {return d;});

            // Scale the range of the data
            xScale.domain(d3.extent(data, function(d) { return d.xdata; })).nice();
            yScale.domain(d3.extent(data, function(d) { return d.ydata; })).nice();

            svg.selectAll(".dot")
                .data(data)
                .enter()
                .append("circle")
                .attr("class", "dot")
                .attr('r', 3.5)
                .attr('cx', function(d) { return xScale(d.xdata); })
                .attr('cy', function(d) { return yScale(d.ydata); })
                .on('mouseover', tip.show)
                .on('mouseout', tip.hide)

            addAxes();

        }
    });

}

function updateTimePlot(param) {
    var tblnm = determineTable(param);
    d3.json("php/getRVCorrelations.php?param="+param+"&tablenm="+tblnm+"&objectnm="+objectNm, function(error, data) {
        if (error) {
            console.log("There was an error loading the JSON blob.");
            console.log("The parameter passed to getRVCorrelations.php was:");
            console.log(param);
            console.log("The tblnm was:");
            console.log(tblnm);
            console.log(error);
        } else {


            data.forEach(function(d) {
                d.date = parseDate(d.date);
                d.xdata = +d.xdata;
                d.ydata = +d.ydata;
            });

            //update the column header in the table:
            newcolhead
                .transition()
                .duration(1000)
                .text(param)

            //create the rows that have all the 
            //data in __data__:
            var trs = tbody.selectAll('tr')
                .data(data);

            trs.exit().remove();

            trs.enter().append('tr');

            //Update the columns:
            var tds = trs.selectAll('td')
                        .data(function(d) { return [d.obnm, d.objectnm, d.date, d3.round(d.ydata,2)];});

            //remove old columns:
            tds.exit().remove();

            //add new columns:
            tds.enter().append('td');

            tds.text(function(d) { return d;})

            // Scale the range of the data
            xScale.domain(d3.extent(data, function(d) { return d.xdata; })).nice();
            yScale.domain(d3.extent(data, function(d) { return d.ydata; })).nice();

            //Update all data points:
            var dots = svg.selectAll(".dot")
                .data(data)
                .transition()
                .duration(1000)
                .attr('cx', function(d) { return xScale(d.xdata); })
                .attr('cy', function(d) { return yScale(d.ydata); })

            svg.selectAll(".dot")
                .data(data)
                .enter()
                .append("circle")
                .attr("class", "dot")
                .attr('r', 3.5)
                .attr('cx', function(d) { return xScale(d.xdata); })
                .attr('cy', function(d) { return yScale(d.ydata); })

            svg.selectAll(".dot")
                .data(data)
                .exit()
                .remove();

            /*Now update the axes. */
            // Update the X Axis
            svg.select(".x.axis")
                .transition()
                .duration(1000)
                .call(xAxis);

            // Update the Y Axis
            svg.select(".y.axis")
                .transition()
                .duration(1000)
                .call(yAxis);

            //Update X Axis Label:
            svg.select(".x.label")
                .transition()
                .duration(1000)
                .text(param);
        }

    });
}

function addAxes() {
    /*Now add the axes. Adding them last makes them 
    on top of everything else. */
    // Add the X Axis
    var xAxisSVG = svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (height - fpad*height) + ")")
        .call(xAxis);

    //Add x-label:
    xAxisSVG.append("text")
        .attr("class", "x label")
        .attr("x", (width - fpad*width))
        .attr("y", -6)
        .style("text-anchor", "end")            
        .text(param);


    // Add the Y Axis
    var yAxisSVG = svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + fpad*width + ",0)")
        .call(yAxis);

    //Add y-label:
    yAxisSVG.append("text")
        .attr("class", "y label")
        .attr("transform", "rotate(-90)")
        .attr("x", -15)
        .attr("y", 6)
        .attr("dy", ".71em")
        //.attr("x", width)
        .style("text-anchor", "end")
        .text('RV [m/s]');

}
window.onload = makeInitTimeSeriesPlot();

function changeObject() {
    var objectNmElement = document.getElementById("objectNameInput");
    objectNm = objectNmElement.value;
    console.log('objectNm changed. The new objectNm is: ');
    console.log(objectNm);
    updateTimePlot('mnvel');
}

