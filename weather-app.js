
const api_key = 'd1381a691fd9d803e38585fb280157d5';


async function loadCityName(cityName) {
    //using metric with temp to get output in celsius
    let response = await fetch('https://api.openweathermap.org/data/2.5/weather?q='+ cityName + '&units=metric' + '&appid=' + api_key);
    let data = await response.json();
    return data;
}
// using the returned data from the loadCityName function
async function loadCityWeather(cityName) {
    let data = await loadCityName(cityName);
    let city_name = document.getElementById('city_name');
    let city_temp = document.getElementById('city_temp');
    let city_desc = document.getElementById('city_desc');
    city_temp.innerHTML = Math.ceil(data.main.temp) + '°C' + ' feels like ' + Math.ceil(data.main.feels_like) + '°C';
    city_name.innerHTML = data.name;
    city_desc.innerHTML = data.weather[0].description;
    console.log(data.weather[0].description);
}

// search input
let search = document.getElementById('searchInput');
// search button
let searchBtn = document.getElementById('search-btn');
// search button event listener
searchBtn.addEventListener('click', function() {
    loadCityWeather(search.value);
    // clear the input field
    search.value = '';
});

// enter key event listener
search.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        loadCityWeather(search.value);
        // clear the input field
        search.value = '';
    }
    
});
