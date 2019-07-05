//Get the data
var data = d3.csvParse(iris, d3.autotype)
console.log(data)

var w = 800;
var h = 800;
var margin = 40;
var width = w - 2 * margin;
var height = h - 2 * margin;

//Select the element and create an svg in it
let svg = d3.select("#vis")
            .append("svg")
            .attr("width",w)
            .attr("height",h);

//Map the scales for data
/*var x_scale = d3.scaleLinear()
                .domain([d3.min(data, d => d.sepal_length),20])
                .range([margin,width]);

var y_scale = d3.scaleLinear()
                .domain([d3.min(data,d => d.sepal_width),20])
                .range([height,margin]);

 var x_scale1 = d3.scaleLinear()
                .domain([d3.min(data, d => d.petal_length),20])
                .range([width,margin]);

var y_scale1 = d3.scaleLinear()
                .domain([d3.min(data,d => d.petal_width),20])
                .range([margin,height]);                
*/

var x_scale = d3.scaleLinear()
                .domain([0,20])
                .range([margin,width]);

var y_scale = d3.scaleLinear()
                .domain([0,20])
                .range([height,margin]);

 var x_scale1 = d3.scaleLinear()
                .domain([0,20])
                .range([width,margin]);

var y_scale1 = d3.scaleLinear()
                .domain([0,20])
                .range([margin,height]);  
console.log(x_scale(3.5))

var main = svg.append("g")
              .attr("transform",`translate(${margin},${margin})`)


var colors = d3.scaleOrdinal(d3.schemeCategory10)
               .domain(data.map(d => d.species)) 
                           
//Draw the mark


var chart = main.selectAll("circle")
   .data(data)
   .enter()
   
   chart.append("circle")
   .attr("cx",d => x_scale1(d.petal_length))
   .attr("cy",d => y_scale1(d.petal_width))
   .attr("r",3)
   .attr("stroke",d => colors(d.species))
   .attr("fill","white");


   chart.append("circle")
   .attr("cx",d => x_scale(d.sepal_length))
   .attr("cy",d => y_scale(d.sepal_width))
   .attr("r",3)
   .attr("fill",d => colors(d.species));

   chart.append("line")
        .style("stroke", d => colors(d.species))  // colour the line
        .attr("x1", d => x_scale1(d.petal_length))     // x position of the first end of the line
        .attr("y1", d => y_scale1(d.petal_width))      // y position of the first end of the line
        .attr("x2", d => x_scale(d.sepal_length))     // x position of the second end of the line
        .attr("y2", d => y_scale(d.sepal_width));

main.append("g")
    .call(d3.axisLeft(y_scale))

main.append("g")
    .attr("transform",`translate(0,${height})`)
    .call(d3.axisBottom(x_scale))

main.append("g")
    .attr("transform",`translate(${width},0)`)
    .call(d3.axisLeft(y_scale1))

main.append("g")
    .call(d3.axisBottom(x_scale1))
    