var apiKey = "c979757ff3364fdbc7788b954c2541a8";
var input = document.querySelector('.input_text');
var main = document.querySelector('#name');
var date = document.querySelector('.date');
var icon = document.querySelector('.icon');
var temp = document.querySelector('.temp');
var humidity = document.querySelector('.humidity');
var wind = document.querySelector('.wind');
var uvIndex = document.querySelector('#uv');
var button = document.querySelector('.submit');
var cityList = document.querySelector('.list-group');

// Fetch, display and stores weather data
function updateCityWeather () {
 fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input.value}&units=imperial&appid=${apiKey}`)
  .then(response => response.json()).then(data => {   
    displayCityWeather(data);
    storeSearchHistory(data);
  });
};

// Displays city weather
function displayCityWeather (data){
  // Calling functions
  displayCurrentWeather(data);
  displayUVIndex(data);
  displayFiveDayForecast(data);
};

// Stores search history
function storeSearchHistory (data) {
  // Put all the data needed into a JSON object 
  var jsonData = {
    nameVal : data.name,
    dateVal : moment().format('dddd, MMM DD, YYYY'),
    tempVal : data.main.temp,
    humidVal : data.main.humidity,
    windVal : data.wind.speed,
    latitude : data.coord.lat,
    longitude : data.coord.lon,
    iconVal : data.weather[0].icon
  };

  // Make the JSON object a string for local storage
  var jsonDataString = JSON.stringify(jsonData);

  // This is storing the data that is affiliated with the city that was inputted.
  localStorage.setItem(input.value, jsonDataString);

  // Make a button and register display functions
  var cityListButton = document.createElement("button");
  cityList.append(cityListButton);
  cityListButton.innerHTML = input.value;
  cityListButton.addEventListener("click", displayCurrentWeather);
  cityListButton.addEventListener("click", displayUVIndex);
  cityListButton.addEventListener("click", displayFiveDayForecast);
};

// Displays current weather 
function displayCurrentWeather (data) {
  // If data coming from a click event, gets data from local storage
  if(data instanceof Event){
    var text = data.target.innerHTML;
    console.log(text);
    // This is getting the data stored in the storeSearchHistory function
    var data = JSON.parse(localStorage.getItem(text));
    var nameVal = data.nameVal;
    var dateVal = data.dateVal;
    var tempVal = data.tempVal;
    var humidVal = data.humidVal;
    var windVal = data.windVal;
    var iconVal = data.iconVal;
  // Else data coming from the argument
  } else {
     // These variables grab the correct data from the API
    var nameVal = data.name;
    var dateVal = moment().format('dddd, MMM DD, YYYY');
    var tempVal = data.main.temp;
    var humidVal = data.main.humidity;
    var windVal = data.wind.speed;
    var iconVal = data.weather[0].icon;
  }

  // Adds the correct phrases and above variables to show in HTML
  main.innerHTML = nameVal; 
  date.innerHTML = dateVal;
  icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${iconVal}@2x.png">`;
  temp.innerHTML = `Temperature: ${tempVal} °F`;
  humidity.innerHTML = `Humidity: ${humidVal}%`;
  wind.innerHTML = `Wind Speed: ${windVal} MPH`;
};

// Fetch the UV information and build the color coordination for the UV index
function displayUVIndex (data) {  
  if(data instanceof Event){
    var text = data.target.innerHTML;
    // This is getting the data stored on line 31.
    var data = JSON.parse(localStorage.getItem(text));
    // Get the latitude and longitude for the UV search from Open Weather Maps API
    var latitude = data.latitude;
    var longitude = data.longitude;
  } else {
    // Get the latitude and longitude for the UV search from Open Weather Maps API
    var latitude = data.coord.lat;
    var longitude = data.coord.lon;
  }

  // Fetches UV url and displays color coded based on current value
  var uvURL = `https://api.openweathermap.org/data/2.5/uvi?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
  fetch(uvURL)
    .then(response => response.json())
    .then(data => {
        var uvIndexVal = data.value;
        if (uvIndexVal >= 0 && uvIndexVal < 3){
          uvIndex.innerHTML = `<span style="color:green">UV Index: ${uvIndexVal}</span>`;
        } else if (uvIndexVal >= 3 && uvIndexVal < 8){
          uvIndex.innerHTML = `<span style="color:orange">UV Index: ${uvIndexVal}</span>`;
        } else if (uvIndexVal >= 8){
          uvIndex.innerHTML = `<span style="color:red">UV Index: ${uvIndexVal}</span>`;
        }
    });
};

// 5-Day forecast function that is called above withint the search event listener
function displayFiveDayForecast (data){
  if(data instanceof Event){
    var text = data.target.innerHTML;
    // This is getting the data stored on line 31.
    var data = JSON.parse(localStorage.getItem(text));
    // Get the latitude and longitude for the UV search from Open Weather Maps API
    var latitude = data.latitude;
    var longitude = data.longitude;
  } else {
    // Get the latitude and longitude for the UV search from Open Weather Maps API
    var latitude = data.coord.lat;
    var longitude = data.coord.lon;
  }

  var cardDate1 = document.querySelector('.day-1-date');
  var cardIcon1 = document.querySelector('.day-1-icon');
  var cardTemp1 = document.querySelector('.day-1-temp');
  var cardHum1 = document.querySelector('.day-1-humidity');

  var cardDate2 = document.querySelector('.day-2-date');
  var cardIcon2 = document.querySelector('.day-2-icon');
  var cardTemp2 = document.querySelector('.day-2-temp');
  var cardHum2 = document.querySelector('.day-2-humidity');

  var cardDate3 = document.querySelector('.day-3-date');
  var cardIcon3 = document.querySelector('.day-3-icon');
  var cardTemp3 = document.querySelector('.day-3-temp');
  var cardHum3 = document.querySelector('.day-3-humidity');

  var cardDate4 = document.querySelector('.day-4-date');
  var cardIcon4 = document.querySelector('.day-4-icon');
  var cardTemp4 = document.querySelector('.day-4-temp');
  var cardHum4 = document.querySelector('.day-4-humidity');

  var cardDate5 = document.querySelector('.day-5-date');
  var cardIcon5 = document.querySelector('.day-5-icon');
  var cardTemp5 = document.querySelector('.day-5-temp');
  var cardHum5 = document.querySelector('.day-5-humidity');

  // Fetches the 7-Day forecast and populates the HTML to the cooresponding cards
  fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,hourly,minutely,alerts&units=imperial&appid=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    
    //Day One
    var tempValue1 = data.daily[1].temp.day;
    var humidValue1 = data.daily[1].humidity;
    cardDate1.innerHTML = moment.unix(data.daily[1].dt).format("M/DD/YYYY");
    cardIcon1.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.daily[1].weather[0].icon}@2x.png">`;
    cardTemp1.innerHTML = `Temperature: ${tempValue1} °F`;
    cardHum1.innerHTML = `Humidity: ${humidValue1}%`;

    //Day Two
    var tempValue2 = data.daily[2].temp.day;
    var humidValue2 = data.daily[2].humidity;
    cardDate2.innerHTML = moment.unix(data.daily[2].dt).format("M/DD/YYYY");
    cardIcon2.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.daily[2].weather[0].icon}@2x.png">`;
    cardTemp2.innerHTML = `Temperature: ${tempValue2} °F`;
    cardHum2.innerHTML = `Humidity: ${humidValue2}%`;

    //Day Three
    var tempValue3 = data.daily[3].temp.day;
    var humidValue3 = data.daily[3].humidity;
    cardDate3.innerHTML = moment.unix(data.daily[3].dt).format("M/DD/YYYY");
    cardIcon3.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.daily[3].weather[0].icon}@2x.png">`;
    cardTemp3.innerHTML = `Temperature: ${tempValue3} °F`;
    cardHum3.innerHTML = `Humidity: ${humidValue3}%`;

    //Day Four
    var tempValue4 = data.daily[4].temp.day;
    var humidValue4 = data.daily[4].humidity;
    cardDate4.innerHTML = moment.unix(data.daily[4].dt).format("M/DD/YYYY");
    cardIcon4.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.daily[4].weather[0].icon}@2x.png">`;
    cardTemp4.innerHTML = `Temperature: ${tempValue4} °F`;
    cardHum4.innerHTML = `Humidity: ${humidValue4}%`;

    //Day Five
    var tempValue5 = data.daily[5].temp.day;
    var humidValue5 = data.daily[5].humidity;
    cardDate5.innerHTML = moment.unix(data.daily[5].dt).format("M/DD/YYYY");
    cardIcon5.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.daily[5].weather[0].icon}@2x.png">`;
    cardTemp5.innerHTML = `Temperature: ${tempValue5} °F`;
    cardHum5.innerHTML = `Humidity: ${humidValue5}%`;
  });
};

// Runs displayCurrentWeather on click
button.addEventListener('click', updateCityWeather);