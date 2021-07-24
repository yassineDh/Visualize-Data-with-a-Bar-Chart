let w = 1000;
let h = 700;

let svg = d3
  .select("body")
  .append("svg")
  .attr("width", w)
  .attr("height", h)
  .style("background-color", "F7F5F6");

svg
  .append("text")
  .attr("x", w / 3)
  .attr("y", 40)
  .attr("id", "title")
  .style("font-size", 40)
  .text("United States GDP");

// let gx = svg
//   .append("g")
//   .attr("transform", "translate(0," + (h - 50) + ")")
//   .attr("id", "x-axis");

// let gy = svg
//   .append("g")
//   .attr("transform", "translate(" + 50 + "," + 0 + ")")
//   .attr("id", "y-axis");

document.addEventListener("DOMContentLoaded", function () {
  fetch(
    "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json"
  )
    .then((response) => response.json())
    .then((vals) => {
      let xScale = d3
        .scaleTime()
        .domain([
          new Date(d3.min(vals.data, (d) => d[0])),
          new Date(d3.max(vals.data, (d) => d[0])),
        ])
        .range([50, w - 50]);

      let yScale = d3
        .scaleLinear()
        .domain([0, d3.max(vals.data, (d) => d[1])])
        .range([h - 50, 50]);

      let x_axis = d3.axisBottom().scale(xScale).ticks(10);
      var y_axis = d3.axisLeft().scale(yScale);

      svg
        .append("g")
        .attr("transform", "translate(0," + (h - 50) + ")")
        .attr("id", "x-axis")
        .call(x_axis);

      svg
        .append("g")
        .attr("transform", "translate(" + 50 + "," + 0 + ")")
        .attr("id", "y-axis")
        .call(y_axis);

      let Tooltip = d3
        .select("body")
        .append("div")
        .attr("id", "tooltip")
        .style("opacity", 0);

      let mo = (d) => {
        Tooltip.style("opacity", 1);
      };

      let mm = (d) => {
        Tooltip.attr("data-date", d.path[0].dataset.date);
        Tooltip.html(
          "Date : " +
            d.path[0].dataset.date +
            "<br/>" +
            "GPP : " +
            d.path[0].dataset.gdp
        )
          .style("left", d.pageX + 20 + "px")
          .style("top", d.pageY + 20 + "px");
      };

      let ml = (d) => {
        Tooltip.style("opacity", 0);
      };

      svg
        .selectAll("rect")
        .data(vals.data)
        .enter()
        .append("rect")
        .attr("x", (element) => xScale(new Date(element[0])))
        .attr("y", (element) => yScale(element[1]))
        .attr("height", (element) => h - yScale(element[1]) - 50)
        .attr("class", "bar")
        .attr("data-date", (element) => element[0])
        .attr("data-gdp", (element) => element[1])
        .on("mouseover", mo)
        .on("mousemove", mm)
        .on("mouseleave", ml);
    });
});
