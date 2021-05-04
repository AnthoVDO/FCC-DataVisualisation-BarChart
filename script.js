//initialisation
const URL = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";
const CHART_HEIGHT = 600;
const CHART_WIDTH = 940;
let dataset = null;
const xScale = d3.scaleBand().range([100, CHART_WIDTH - 60]).paddingInner(0.8);
const yScale = d3.scaleLinear().range([CHART_HEIGHT - 50, 150]);

//calling API

const getData = async APIUrl => {
    const response = await fetch(APIUrl)

    if (response.ok) {
        const dataUSA = await response.json();



        //CHART shape

        const chartContainer = d3.select(".container__chart")
            .append("svg")
            .attr("height", CHART_HEIGHT)
            .attr("width", CHART_WIDTH)
            .style("background-color", "red")

        xScale.domain(dataUSA.data.map(e => e[0]))
        yScale.domain([0, d3.max(dataUSA.data, d => d[1])])

        //CHART with data

        const chart = chartContainer.append("g");

        chart.selectAll(".bar")
            .data(dataUSA.data)
            .enter()
            .append("rect")
            .classed("bar", true)
            .attr("width", xScale.bandwidth())
            .attr("height", d => CHART_HEIGHT - 50 - yScale(d[1]))
            .attr("x", d => xScale(d[0]))
            .attr('y', d => yScale(d[1]) - 50)
            .attr("data-date", d => d[0])
            .attr("data-gdp", d => d[1])



        //x-axis
        const minDate = new Date("1947-January-01");
        const maxDate = new Date("2015-July-01");
        const parseTime = d3.timeFormat("%Y");
        const abscissaScale = d3.scaleTime().domain([minDate, maxDate]).range([100, CHART_WIDTH - 60]);
        const abscissa = d3.axisBottom().scale(abscissaScale).tickFormat(parseTime).ticks();
        const xAxis = chartContainer.append("g");

        xAxis.call(abscissa)
            .attr("transform", `translate(0,${CHART_HEIGHT-100})`)
            .attr("id", "x-axis")


        //y-axis

        const ordinateScale = yScale.domain([0, d3.max(dataUSA.data, d => d[1])]);
        const ordinate = d3.axisLeft().scale(ordinateScale);
        const yAxis = chartContainer.append('g');

        yAxis.call(ordinate)
            .attr("transform", "translate(99, -50)")
            .attr("id", "y-axis")

        //Title

        chartContainer.append("text")
            .attr("x", CHART_WIDTH / 2)
            .attr("y", 50)
            .attr("text-anchor", "middle")
            .style("font-size", "25px")
            .style("text-decoration", "underline")
            .attr("id", "title")
            .text("United State GDP")

        //Source

        chartContainer.append("text")
            .attr("xlink:href", dataUSA.display_url)
            .attr("x", CHART_WIDTH / 5 * 3)
            .attr("y", CHART_HEIGHT - 35)
            .text(`Source: ${dataUSA.source_name}`)
            .style("font-size", "16px")
            .on("click", () => window.open(dataUSA.display_url))
            .style("cursor", "pointer")


        console.log(dataUSA)



    } else {
        console.log("fetch failed : ", response.status)
    }
}

getData(URL);