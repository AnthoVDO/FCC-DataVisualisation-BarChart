//initialisation
const URL = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";
const CHART_HEIGHT = 500;
const CHART_WIDTH = 900;

//calling API

fetch(URL)
    .then(res => res.json())
    .then(data => console.log(data))


//using D3

let test = d3.select(".container__chart")
    .append("svg")
    .attr("height", CHART_HEIGHT)
    .attr("width", CHART_WIDTH)
    .style("background-color", "red")