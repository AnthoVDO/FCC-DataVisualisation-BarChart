//initialisation
const URL = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";
const CHART_HEIGHT = 500;
const CHART_WIDTH = 900;
let dataset = null;
const xScale = d3.scaleBand().rangeRound([50, CHART_WIDTH - 20]);
const yScale = d3.scaleLinear().range([CHART_HEIGHT, 50]);

//calling API

const getData = async APIUrl => {
    const response = await fetch(APIUrl)

    if (response.ok) {
        const dataUSA = await response.json();
        const abscissaScale = d3.scaleLinear().domain([1947, 2015]).range([50, CHART_WIDTH - 26]);
        const ordinateScale = yScale.domain([0, d3.max(dataUSA.data, d => d[1]) + 1000]);
        const abscissa = d3.axisBottom().scale(abscissaScale);
        const ordinate = d3.axisLeft().scale(ordinateScale);
        const chartContainer = d3.select(".container__chart")
            .append("svg")
            .attr("height", CHART_HEIGHT)
            .attr("width", CHART_WIDTH)
            .style("background-color", "red")

        xScale.domain(dataUSA.data.map(e => e[0]))
        yScale.domain([0, d3.max(dataUSA.data, d => d[1]) + 1000])

        //CHART with data

        const chart = chartContainer.append("g");

        chart.selectAll(".bar")
            .data(dataUSA.data)
            .enter()
            .append("rect")
            .classed("bar", true)
            .attr("width", xScale.bandwidth())
            .attr("height", d => CHART_HEIGHT - yScale(d[1]))
            .attr("x", d => xScale(d[0]))
            .attr('y', d => yScale(d[1]) - 50);



        //x-axis

        const xAxis = chartContainer.append("g");

        xAxis.call(abscissa)
            .attr("transform", `translate(3,${CHART_HEIGHT-50})`)

        //y-axis

        const yAxis = chartContainer.append('g');

        yAxis.call(ordinate)
            .attr("transform", "translate(53, -50)");


        console.log(dataUSA)



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