window.onload = function() {
    document.getElementById('fahrenheit').value='';
    document.getElementById('celcius').value='';
    document.getElementById('c-f-btn').addEventListener('click', convertCtoF);
    
    document.getElementById('fahrenheit2').value='';
    document.getElementById('celcius2').value='';
    document.getElementById('f-c-btn').addEventListener('click', convertFtoC);
    document.getElementById('reset-temp').addEventListener('click', resetValues);

    document.getElementById('celcius').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            document.getElementById('c-f-btn').click();
            e.preventDefault();
            }
        });
    document.getElementById('fahrenheit2').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            document.getElementById('f-c-btn').click();
            e.preventDefault();
        }
    });
    }
    
    
function convertCtoF(e) {
    let c = document.getElementById('celcius').value;
    if (c === null || c === '') {
        alert('Please enter a number value');
        document.getElementById('celcius').value='';
        document.getElementById('fahrenheit').value='';
        return;
    }
    else{
    let f = (c * 9/5) + 32;
    document.getElementById('fahrenheit').value = f.toFixed(1);
    }    
    e.preventDefault();
}
    
function convertFtoC(e) {
    
    let fahrenheit = document.getElementById('fahrenheit2').value;
    if (fahrenheit === null || fahrenheit === '') {
        alert('Please enter a number value');
        document.getElementById('fahrenheit2').value='';
        document.getElementById('celcius2').value='';
        return;
    }else{
    let celcius = (fahrenheit - 32) * 5/9;
    document.getElementById('celcius2').value = celcius.toFixed(1);
    }
    e.preventDefault();
}

resetValues = function() {
    document.getElementById('fahrenheit').value='';
    document.getElementById('celcius').value='';
    document.getElementById('fahrenheit2').value='';
    document.getElementById('celcius2').value='';}