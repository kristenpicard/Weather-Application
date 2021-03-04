var apiKey = "c979757ff3364fdbc7788b954c2541a8";

var input = document.querySelector('.input_text');
var main = document.querySelector('#name');
var date = document.querySelector('.date');
var icon = document.querySelector('.icon');
var temp = document.querySelector('.temp');
var humidity = document.querySelector('.humidity');
var wind = document.querySelector('.wind');
var uvIndex = document.querySelector('#uv');
var button= document.querySelector('.submit');


button.addEventListener('click', function(name){
fetch('https://api.openweathermap.org/data/2.5/weather?q='+input.value+'&units=imperial&appid='+apiKey)
.then(response => response.json())
.then(data => {
  
  // These variables grab the correct data from the API
  var nameValue = data.name;
  var dateValue = moment().format('dddd, MMM DD, YYYY');
  var tempValue = data.main.temp;
  var humidValue = data.main.humidity;
  var windValue = data.wind.speed;

  // Adds the correct phrases and values from above to show in HTML
  main.innerHTML = nameValue; 
  date.innerHTML = dateValue;
  icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">`;
  temp.innerHTML = "Temperature: "+tempValue+" °F";
  humidity.innerHTML = "Humidity: "+humidValue+"%";
  wind.innerHTML = "Wind Speed: "+windValue+" MPH";

  // Get the latitude and longitude for the UV search from Open Weather Maps API
  var latitude = data.coord.lat;
  var longitude = data.coord.lon;
  var uvQueryURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey;

  // Fetch the UV information and build the color display for the UV index
  fetch(uvQueryURL)
  .then(response => response.json())
  .then(data => {
      var uvIndexValue = data.value;
      uvIndex.innerHTML = "UV Index: "+uvIndexValue;
      if (uvIndexValue >= 0 && uvIndexValue < 3){
        uvIndex.innerHTML.style.color = "green";
      } else if (uvIndexValue >= 3 && uvIndexValue < 8){
        uvIndex.innerHTML.style.color = "orange";
      } else if (uvIndexValue >= 8){
        uvIndex.innerHTML.style.color = "red";
      }
  });

  input.value ="";
});



// 5-Day Fetch
// fetch('https://api.openweathermap.org/data/2.5/forecase?q='+input.value+'&units=imperial&appid='+apiKey)
//   .then(response => response.json())
//   .then(data => {
    
//     var dateValue = moment().format('dddd, MMM DD, YYYY');
//     var tempValue = data.main.temp;
//     var humidValue = data.main.humidity;
  
//     date.innerHTML = dateValue;
//     icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">`;
//     temp.innerHTML = "Temperature: "+tempValue+" °F";
//     humidity.innerHTML = "Humidity: "+humidValue+"%";
  
//     input.value ="";
//   });

});










