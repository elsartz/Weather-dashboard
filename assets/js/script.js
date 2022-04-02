var historyEl = document.querySelector("#history");
var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#cityname");
var cityEl = document.querySelector("#"+i);

var i = 0;
var historyArray = ["Ottawa"];
var targetApi = "";

var getUserSearch = function(location) {
    // format the openWeather api url
    var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q="+ location +"&units=metric&APPID=5d3247362c5bea55d3c0e663cb0344b0";
    targetApi = apiUrl;
  console.log(apiUrl);
    // make a request to the url
    fetch(apiUrl).then(function(response) {
      if (response.ok) {
        response.json().then(function(data) {
          console.log(data);
          displayWeather(data, location);
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

var locationEl = document.querySelector("#currentDay");

var displayWeather = function(conditions, searchTerm) {

  var currentDate = moment().format('dddd, MMM Do YYYY');       
  console.log(searchTerm);    console.log(currentDate);

  // var cityCardEl = document.querySelector(".card2#currentDay");
  var cityEl = document.createElement("h3");
      cityEl.textContent = searchTerm + " " + currentDate;
      locationEl.appendChild(cityEl);

  var tempEl = document.createElement("p");
      tempEl.textContent = "Temperature :  " + Math.floor(conditions.wind.speed) + " C";
      locationEl.appendChild(tempEl);

  var windEl = document.createElement("p");
      windEl.textContent = "Wind speed :  " + Math.floor(conditions.wind.speed) + " km/h";
      locationEl.appendChild(windEl);

  var humidEl = document.createElement("p");
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

var historySubmitHandler = function(event) {
 
  console.log(event);
} 

// getUserRepos();
userFormEl.addEventListener("submit", formSubmitHandler);
historyEl.addEventListener("submit", historySubmitHandler);

