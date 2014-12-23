//A script to produce an aitoff projection with the CHIRON data:
var mindate = '2014-12-11';
var maxdate = '2014-12-12';

//first define the mousing functions:
function mouseover(d,i){
    var filter1= d3.selectAll('circle').filter(function(e,j) { return i===j });
    var filter2= d3.selectAll('tr').filter(function(e,j) { return i===j });
    filter1.attr('class','mouseover')
    filter2.attr('class','mouseover')
}

function mouseout(d,i){
    var filter1= d3.selectAll('.mouseover');
    filter1.attr('class',null)
}

function mousescroll(d,i){
    mouseover(d,i);
    $('tbody').scrollTop( $('tr[data-index="'+i+'"]').offset().top - $('tbody').offset().top + $('tbody').scrollTop() );
}

function mouserange(d,i){
    var filter1= d3.selectAll('circle').filter(function(e) { return Math.abs((e.B-e.V).toFixed(2)-d) <step  });
    var filter2= d3.selectAll('tr').filter(function(e) {     return Math.abs((e.B-e.V).toFixed(2)-d) < step });
    filter1.attr('class','mouseover')
    filter2.attr('class','mouseover')
}

//add observations to table:
var columns = ["Observation Name", "Object Name", "Image Type", "RA", "Dec", "Observation Date"];
var table = d3.select("#table-of-observations")
    .append('table')
    .attr("class", "table table-striped");

var thead = table.append("thead");
var tbody = table.append("tbody");

//append the header row:
thead.append("tr")
    .selectAll("th")
    .data(columns)
    .enter()
    .append("th")
        .text(function(column) { return column; });


var width = 950, 
    height = 450;

var projection = d3.geo.interrupt(d3.geo.orthographic.raw)
    .lobes([[ // northern hemisphere
        [[-180,   0], [ -90,  90], [   0,   0]],
        [[   0,   0], [  90,  90], [ 180,   0]]
    ], [ // southern hemisphere
        [[-180,   0], [ -90, -90], [   0,   0]],
        [[   0,   0], [  90, -90], [ 180,   0]]
    ]])
    .rotate([90, 0, 90])
    .scale(height/2.1)
    .translate([width / 2, height / 2])
    .precision(.1);

var projection = d3.geo.aitoff()
    .scale(height/4.1)
    .translate([width / 2, height / 2])
    .precision(.1);


//add tool-tip:
var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<p><strong>Object:</strong> <span style='color:#428BCA'>" + d.objectnm + "</span></p>" +
            "<p><strong>Obnm:</strong> <span style='color:#428BCA'>" + d.obnm + "</span></p>";
  })

var path = d3.geo.path()
    .projection(projection);

var svg = d3.select(".starmap").append("svg")
    .attr("width", width)
    .attr("height", height);

svg.call(tip);

var defs = svg.append("defs");

defs.append("path")
    .datum({type: "Sphere"})
    .attr("id", "sphere")
    .attr("d", path);

defs.append("clipPath")
    .attr("id", "clip")
    .append("use")
    .attr("xlink:href", "#sphere");

svg.append("use")
    .attr("class", "background")
    .attr("xlink:href", "#sphere");

var graticule = d3.geo.graticule()
    .extent([[-180, -90], [180, 90]]);

svg.append("g")
    .attr("class", "graticule")
    .selectAll("path")
    .data(graticule.lines)
    .enter().append("path")
    .attr("d", path);

svg.append("use")
    .attr("class", "foreground")
    .attr("xlink:href", "#sphere");

d3.json("php/getCoords.php?mindate=2014-12-11&maxdate=2014-12-12", function(error, data) {
    if (error) {
        console.log("There was an error loading the JSON blob.");
        console.log(error);
    } else {

       //create the rows that have all the 
        //data in __data__:
        var trs = tbody.selectAll('tr')
            .data(data)
            .enter()
            .append('tr');

        //Insert the columns into the table:
        var tds = trs.selectAll('td')
                    .data(function(d) { return [d.obnm, d.objectnm, d.imagetyp, d3.round(d.obs_ra_decdeg, 3), d3.round(d.obs_dec_decdeg, 3), d.date_obs];})
                    .enter()
                    .append('td')
                    .text(function(d) {return d;});

        // add circles to svg
        svg.selectAll(".dot")
            .data(data)
            .enter()
            .append("circle")
            .attr("class", "dot")
            .attr("cx", function (d) { return projection([d.obs_ra_decdeg, d.obs_dec_decdeg])[0]; })
            .attr("cy", function (d) { return projection([d.obs_ra_decdeg, d.obs_dec_decdeg])[1]; })
            .attr("r", 3.5)
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide)

    }
});