window.onload = function() {
    document.getElementById('fahrenheit').value='';
    document.getElementById('celcius').value='';
    document.getElementById('c-f-btn').addEventListener('click', convertCtoF);
    
    document.getElementById('fahrenheit2').value='';
    document.getElementById('celcius2').value='';
    document.getElementById('f-c-btn').addEventListener('click', convertFtoC);
    }
    
    
function convertCtoF(e) {
    let c = document.getElementById('celcius').value;
    if (c === null || c === '') {
        alert('Please enter a number value');
        return;
    }
    else{
    let f = (c * 9/5) + 32;
    document.getElementById('fahrenheit').value = f;
    }    
    e.preventDefault();
}
    
function convertFtoC(e) {
    
    let fahrenheit = document.getElementById('fahrenheit2').value;
    if (fahrenheit === null || fahrenheit === '') {
        alert('Please enter a number value');
        return;
    }else{
    let celcius = (fahrenheit - 32) * 5/9;
    document.getElementById('celcius2').value = celcius;
    }
    e.preventDefault();
}