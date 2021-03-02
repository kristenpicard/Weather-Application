var apiKey = "c979757ff3364fdbc7788b954c2541a8";

// var input = document.querySelector('#search-input');
// var main = document.querySelector('#name');
// var temp = document.querySelector('#temp');
// var desc = document.querySelector('#desc');
// var clouds = document.querySelector('#clouds');
// var button= document.querySelector('#bttn');


// button.addEventListener('click', function(){
// fetch('api.openweathermap.org/data/2.5/weather?q='+input.value+'&appid='+apiKey)
// .then(response => response.json())
// .then(data => {
//   var tempValue = data['main']['temp'];
//   var nameValue = data['name'];
//   var descValue = data['weather'][0]['description'];

//   main.innerHTML = nameValue;
//   desc.innerHTML = "Desc - "+descValue;
//   temp.innerHTML = "Temp - "+tempValue;
//   input.value ="";

// })

// });

  
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
fetch('https://api.openweathermap.org/data/2.5/weather?q='+input.value+'&appid='+apiKey)
.then(response => response.json())
.then(data => {
  
  var nameValue = data.name;
  var dateValue = data.dt;
  // var iconName = data.weather[0].icon;
  // var iconUrl = "http://openweathermap.org/img/w/" + iconName + ".png";  var tempValue = (((data.main.temp-273.15)* 1.8 +32).toFixed(0));
  var tempValue = data.main.temp;
  var humidValue = data.main.humidity;
  var windValue = data.wind.speed;
  // var uvValue = data.;

  main.innerHTML = nameValue; 
  date.innerHTML = dateValue;
  // icon.innerHTML = <img src=' '+ iconURL + ' '>";
  temp.innerHTML = "Temperature: "+tempValue+" °F";
  humidity.innerHTML = "Humidity: "+humidValue+" %";
  wind.innerHTML = "Wind Speed: "+windValue+" MPH";
  // uvIndex.innerHTML = 
  
  input.value ="";

})});

// .catch(err => alert("Wrong city name!"));
// });