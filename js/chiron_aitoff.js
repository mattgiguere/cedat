//A script to produce an aitoff projection with the CHIRON data:

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

var table = d3.select(".aside").append("table"),
thead = table.append("thead"),//.append("tr"),
    tbody = table.append("tbody");

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


var path = d3.geo.path()
    .projection(projection);

var svg = d3.select(".starmap").append("svg")
    .attr("width", width)
    .attr("height", height);

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

/// color and radius depend on data
var color = d3.scale.linear()
    .domain([-0.5,1.5])
    .range(['rgb(0,0,255)', 'rgb(255,0,0)']);

//////////// LEGEND //////////////
var q=40;   
var step=0.125;
var legdata=[-0.25, 0.00, 0.25, 0.50, 0.75, 1.00, 1.25, 1.50];
var legend =d3.select('.starmap').selectAll('svg')
    .data(legdata)
    .enter()
    .append('svg')
    .attr('height',q)
    .attr('width',q)
    .style('background-color',function(d){return color(d)})
    .on('mouseover', mouserange)
    .on('mouseout', mouseout)

legend.append('text')
    .text(function (d){return d})
    .attr('x',20)
    .attr('y',26)
    .attr('text-anchor','middle')
    .attr('fill','white')
    .attr('stroke','none')

