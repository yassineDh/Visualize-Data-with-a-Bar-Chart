let w = 1000;
let h = 700;

let svg = d3.select("body")
            .append("svg")
            .attr("width",w)
            .attr("height",h)
            .style("background-color", 'F7F5F6');


svg.append("text")
   .attr("x",w/3)
   .attr("y",40)
   .attr("id","title")
   .style("font-size",40)
   .text("United States GDP")

let gx = svg.append("g")
    .attr("transform", "translate(0," + (h - 50) + ")")
    .attr("id","x-axis")

let gy = svg.append("g")
    .attr("transform", "translate(" + 50 + "," +0+")")
    .attr("id","y-axis")