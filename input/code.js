"use strict";

const path = 'https://gist.githubusercontent.com/tdreyno/4278655/raw/7b0762c09b519f40397e4c3e100b097d861f5588/airports.json';
let airportNames = {};

async function loadAirportNames() {
    console.log("fetching")
    let response = await fetch(path);
    let data = await response.json();
    console.log("data is",data.length)
    for (let airport of data) {
        airportNames[airport.code] = airport.name;
    }
    console.log(airportNames["JFK"]);
}

function lookup(event){
    event.preventDefault();
    let input = document.getElementById("airport-code").value;
    let lower = input.toUpperCase();
    console.log(lower)
    document.getElementById("output").innerHTML=airportNames[lower];
    return false;
}

loadAirportNames();

function main() {
    document.getElementById("airport-code").value = "";
//document.getElementById("airport-code").addEventListener("submit",lookup);

//document.getElementById("airport-code").addEventListener("change",lookup);

document.getElementById("inform").addEventListener("submit",lookup);

document.getElementById("inform").addEventListener("change",lookup);
}