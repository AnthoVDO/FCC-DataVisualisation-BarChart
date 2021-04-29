//initialisation
const URL = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";
const CHART_HEIGHT = 500;
const CHART_WIDTH = 900;
let dataset = null;
//calling API

const getData = async APIUrl => {
    const response = await fetch(APIUrl)

    if (response.ok) {
        const dataUSA = await response.json();

        const svg = d3.select(".container__chart")
            .append("svg")
            .attr("height", CHART_HEIGHT)
            .attr("width", CHART_WIDTH)
            .style("background-color", "red")

        svg.selectAll("rect")
            .data(dataUSA.data)
            .enter()
            .append("rect")
            .attr("width", CHART_WIDTH / dataUSA.data.length)
            .attr("height", d => CHART_HEIGHT - d[1])
            .attr("x", d => dataUSA.data.indexOf(d))
            .attr("y", d => CHART_HEIGHT - d[1])
            .attr("fill", "navy")
            .attr("class", "bar")




    } else {
        console.log("fetch failed : ", response.status)
    }
}

getData(URL);


//using D3
/*
const svg = d3.select(".container__chart")
    .append("svg")
    .attr("height", CHART_HEIGHT)
    .attr("width", CHART_WIDTH)
    .style("background-color", "red")

svg.selectAll("circle")
    .append()

    */