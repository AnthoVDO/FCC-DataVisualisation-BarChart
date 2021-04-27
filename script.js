//initialisation
const URL = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";
const CHART_HEIGHT = 500;
const CHART_WIDTH = 900;

//calling API

const fetchAPI = async(link) => {
    const response = await fetch(link);
    return await response;
}

fetchAPI(URL).then(answer=>console.log(JSON.parse(answer)))


//using D3