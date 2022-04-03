var historyEl = document.querySelector("#history");
var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#cityname");
var locationEl = document.querySelector("#currentDay");
var uviEl = document.createElement("span");
var uviSpanEl = document.createElement("span");

var cityEl = document.querySelector("#"+i);

var i = 0;
var historyArray = [];
var targetApi = "";


// use geolocation for current position
var x = document.getElementById("currentDay");
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}
// see and set the coordinates push them to display
function showPosition(position) {
console.log(position);
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude=hourly,minutely&units=metric&appid=5d3247362c5bea55d3c0e663cb0344b0";

  fetch(apiUrl).then(function(response) {
      if (response.ok) {
        response.json().then(function(data) {
          console.log(data);
          var localArea = data.timezone;
          var location = localArea.split("/")[1];
            console.log(location);

          displayLocalWeather(data, location);
          display5Days(data);
        });
      } else {
        // unrecognizable city name
        alert("Error: City not found");
      }
    })
    .catch(function(error) {
      // If no response then report network error
      alert("Unable to connect to OpenWeather API");
    });

}

var displayLocalWeather = function(conditions, searchTerm) {

  var currentDate = moment().format('dddd, MMM Do YYYY');       
  console.log(searchTerm);    console.log(currentDate);
console.log(conditions);
  resetCard();

  
  // var cityEl = document.createElement("h3");
      cityEl.textContent = searchTerm + " " + currentDate;
      locationEl.appendChild(cityEl);

  // var tempEl = document.createElement("p");
      tempEl.textContent = "Temperature :  " + Math.floor(conditions.current.temp) + " C";
      locationEl.appendChild(tempEl);

  // var windEl = document.createElement("p");
      windEl.textContent = "Wind speed :  " + Math.floor(conditions.current.wind_speed) + " km/h";
      locationEl.appendChild(windEl);

  // var humidEl = document.createElement("p");
      humidEl.textContent = "Humidity :  " + conditions.current.humidity + " %";
      locationEl.appendChild(humidEl);

  // var uviEl = document.createElement("p");
      uviEl.textContent = "UV index :  ";

  // var uviSpanEl = document.createElement("span");
      uviSpanEl.textContent = conditions.current.uvi;
      if (conditions.current.uvi <3) {
        uviSpanEl.classList.add("favorable");
      } else if (conditions.current.uvi >5) {
        uviSpanEl.classList.add("severe");
      } else {
        uviSpanEl.classList.add("moderate");
      }

      locationEl.appendChild(uviEl);
      locationEl.appendChild(uviSpanEl);

}





var getUserSearch = function(location) {
    // format the openWeather api url
    var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q="+ location +"&units=metric&APPID=5d3247362c5bea55d3c0e663cb0344b0";
    targetApi = apiUrl;
  console.log(apiUrl);
    // make a request to the url
    fetch(apiUrl).then(function(response) {
      if (response.ok) {
        response.json().then(function(dataU) {
          console.log(dataU);
          displayWeather(dataU, location);
        });
      } else {
        // unrecognizable city name
        alert("Error: City not found");
      }
    })
    .catch(function(error) {
      // If no responce then report network error
      alert("Unable to connect to OpenWeather API");
    });
};



var addHistory = function(name) {
  var cityEl = document.createElement("button");
      cityEl.classList = "btn text-uppercase";
      cityEl.setAttribute("id", i);
      cityEl.setAttribute("type","submit");
      cityEl.textContent = name;
        historyArray.push(name);
      historyEl.appendChild(cityEl);
      i++;
}


var cityEl = document.createElement("h3");
var tempEl = document.createElement("p");
var windEl = document.createElement("p");
var humidEl = document.createElement("p");

var resetCard = function() {
  cityEl.textContent = "";
  tempEl.textContent = "";
  windEl.textContent = "";
  humidEl.textContent = "";
  uviEl.textContent = "";
  uviSpanEl.textContent = "";
  uviSpanEl.classList.remove("favorable","moderate","severe");
}


var displayWeather = function(conditions, searchTerm) {

  var currentDate = moment().format('dddd, MMM Do YYYY');       
  console.log(searchTerm);    console.log(currentDate);

  resetCard();

  
  // var cityEl = document.createElement("h3");
      cityEl.textContent = searchTerm + " " + currentDate;
      locationEl.appendChild(cityEl);

  // var tempEl = document.createElement("p");
      tempEl.textContent = "Temperature :  " + Math.floor(conditions.main.temp) + " C";
      locationEl.appendChild(tempEl);

  // var windEl = document.createElement("p");
      windEl.textContent = "Wind speed :  " + Math.floor(conditions.wind.speed) + " km/h";
      locationEl.appendChild(windEl);

  // var humidEl = document.createElement("p");
      humidEl.textContent = "Humidity :  " + conditions.main.humidity + " %";
      locationEl.appendChild(humidEl);


  //  console.log(conditions);
   
   console.log(conditions.main.temp);
   console.log(conditions.wind.speed);
   console.log(conditions.main.humidity);
   
  
}

var formSubmitHandler = function(event) {

  event.preventDefault();         // prevent to send data to a url
  
  console.log(event);

  // get value from input element
  var cityname = nameInputEl.value.trim();

  if (cityname) {
    getUserSearch(cityname);
    // put city in memory
    localStorage.setItem("history", JSON.stringify(cityname));

    addHistory(cityname);
    
    nameInputEl.value = "";
  } else {
    alert("Please enter a valid City name");
  }
}

var formEl0 = document.querySelector("#n0");
var formEl1 = document.querySelector("#n1");
var formEl2 = document.querySelector("#n2");
var formEl3 = document.querySelector("#n3");
var formEl4 = document.querySelector("#n4");
console.log(formEl0);



var display5Days = function(conditions) {

  for (var i=0; i < 5; i++) {
    var dailyDivEl = document.createElement("div");

    var dailyDate = moment().add(1+i, "days").format('dddd, MMM Do YYYY');
    var humidity = conditions.daily[i].humidity;
    var temp = Math.round(conditions.daily[i].temp.day);
    var wind_speed = conditions.daily[i].wind_speed;
    var icon = conditions.daily[i].weather[0].icon;

    dailyDivEl.innerHTML = 
    `<p>${dailyDate}</p>
      <span><img src="http://openweathermap.org/img/wn/${icon}@2x.png" /></span>
      <p>Temp ${temp} C</p>
      <p>Wind ${wind_speed} kph</p>
      <p>Humidity ${humidity} %</p>`;

      switch(i){
        case 0: formEl0.appendChild(dailyDivEl); break;
        case 1: formEl1.appendChild(dailyDivEl); break;
        case 2: formEl2.appendChild(dailyDivEl); break;
        case 3: formEl3.appendChild(dailyDivEl); break;
        case 4: formEl4.appendChild(dailyDivEl); break;
      }
    
  }
}


var historySubmitHandler = function(event) {
  event.preventDefault();
  console.log("event");
} 

// get current location
getLocation();

// get users city search
userFormEl.addEventListener("submit", formSubmitHandler);
console.log(userFormEl);
historyEl.addEventListener("submit", historySubmitHandler);
console.log(historyEl);
