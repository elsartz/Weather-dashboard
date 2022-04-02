




var getUserSearch = function(location) {
    // format the openWeather api url
    var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q="+ location +"&units=metric&APPID=5d3247362c5bea55d3c0e663cb0344b0";
  console.log(apiUrl);
    // make a request to the url
    fetch(apiUrl).then(function(response) {
      if (response.ok) {
        response.json().then(function(data) {
          console.log(data);
          // displayRepos(data, user);
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

  var userFormEl = document.querySelector("#user-form");
  var nameInputEl = document.querySelector("#cityname");

  var formSubmitHandler = function(event) {
  
    event.preventDefault();         // prevent to send data to a url
    
    console.log(event);
  
    // get value from input element
    var cityname = nameInputEl.value.trim();
  
    if (cityname) {
      getUserSearch(cityname);
      nameInputEl.value = "";
    } else {
      alert("Please enter a valid City name");
    }
  }


  
// getUserRepos();
userFormEl.addEventListener("submit", formSubmitHandler);


  // getUserSearch("Paris");