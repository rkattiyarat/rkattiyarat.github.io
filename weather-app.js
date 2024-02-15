
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
    let city_icon = document.getElementById('city_icon');
    city_temp.innerHTML = Math.ceil(data.main.temp) + '°C' + ' feels like ' + Math.ceil(data.main.feels_like) + '°C';
    city_name.innerHTML = data.name + ', ' + data.sys.country;
    city_desc.innerHTML = data.weather[0].description;
    city_icon.src = 'http://openweathermap.org/img/wn/' + data.weather[0].icon + '.png';
    console.log(data.weather[0].description);
}

// search input
let search = document.getElementById('searchInput');
// search button
let searchBtn = document.getElementById('search-btn');

async function fetchCitySuggestions(query){
    let response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${api_key}`);
    let data = await response.json();
    return data.map(city => city.name);
}

async function updateAutoComplete(inputValue){
    autocomplete.innerHTML = '';
    if (!inputValue)
        return;
    let cities = await fetchCitySuggestions(inputValue);
    cities.forEach(city => {
        let option = document.createElement('div');
        option.classList.add('autocomplete-option');
        option.textContent = city;
        option.addEventListener('click', function(){
            searchInput.value = city;
            autocomplete.innerHTML = '';
            loadCityWeather(city);
        });
        autocomplete.appendChild(option);
    });

}
// Event listener for input changes
searchInput.addEventListener('input', function(event) {
    const inputValue = event.target.value;
    updateAutoComplete(inputValue);
});


document.getElementById('search-btn').addEventListener('click', function() {
    const inputValue = searchInput.value;
    if (inputValue) {
        loadCityWeather(inputValue);
        autocomplete.innerHTML = '';
        searchInput.value = '';
    }
});

// Event listener for enter key
searchInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        const inputValue = searchInput.value;
        if (inputValue) {
            loadCityWeather(inputValue);
            autocomplete.innerHTML = '';
            searchInput.value = '';
        }
    }
});

// // search button event listener
// searchBtn.addEventListener('click', function() {
//     loadCityWeather(search.value);
//     // clear the input field
//     search.value = '';
// });

// // enter key event listener
// search.addEventListener('keyup', function(event) {
//     if (event.key === 'Enter') {
//         loadCityWeather(search.value);
//         // clear the input field
//         search.value = '';
//     }
    
// });
