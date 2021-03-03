var apiKey = "c979757ff3364fdbc7788b954c2541a8";

var input = document.querySelector('.input_text');
var main = document.querySelector('#name');
var date = document.querySelector('.date');
var icon = document.querySelector('.icon');
var temp = document.querySelector('.temp');
var humidity = document.querySelector('.humidity');
var wind = document.querySelector('.wind');
var uvIndex = document.querySelector('.uv');
var button= document.querySelector('.submit');


button.addEventListener('click', function(name){
fetch('https://api.openweathermap.org/data/2.5/weather?q='+input.value+'&units=imperial&appid='+apiKey)
.then(response => response.json())
.then(data => {
  
  var nameValue = data.name;
  var dateValue = moment().format('dddd, MMM DD, YYYY');
  var tempValue = data.main.temp;
  var humidValue = data.main.humidity;
  var windValue = data.wind.speed;
  // var uvValue = data.;

  main.innerHTML = nameValue; 
  date.innerHTML = dateValue;


  icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">`;
  temp.innerHTML = "Temperature: "+tempValue+" °F";
  humidity.innerHTML = "Humidity: "+humidValue+"%";
  wind.innerHTML = "Wind Speed: "+windValue+" MPH";
  // uvIndex.innerHTML = 
  
  input.value ="";

})

});

