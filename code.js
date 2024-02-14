"use strict";

const path = 'https://gist.githubusercontent.com/tdreyno/4278655/raw/7b0762c09b519f40397e4c3e100b097d861f5588/airports.json';
let airportNames = {};

async function loadAirportNames() {
    console.log("fetching")
    let response = await fetch(path);
    let data = await response.json();
    console.log("data is",data.length)
    for (let airport of data) {
        airportNames[airport.code] = airport.name + ", " + airport.state + ", " + airport.country;
    }
    console.log(airportNames["JFK"]);
}

function lookup(event){
    event.preventDefault();
    console.log("Submit Event: ", event);
    let input = document.getElementById("airport-code").value.trim();
    console.log("Input: ", input)
    if(input != ""){
    let lower = input.toUpperCase();
    console.log(lower)
    document.getElementById("output").innerHTML=airportNames[lower] || "Airport not found";
    setTimeout(() => {
        document.getElementById("airport-code").value = "";
        }, 100);
    }
    else {
        document.getElementById("output").innerHTML="Please enter an airport code";
    }
    return false;
}

loadAirportNames();

function main() {
    document.getElementById("inform").addEventListener("submit",lookup);
    document.getElementById("inform").addEventListener("change",lookup);
    document.getElementById("airport-code").value = "";
}