/**
 * =====================================
 *                                     =
 *      THIS MODEL (UI) FOR THE UI OF  =
 *      THE PAGE                       =
 *                                     =
 * =====================================
 */
const UI = (function() {
  const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };
  const showApp = () => {
    document.querySelector("#loader").classList.add("display-none");
    document.querySelector("main").removeAttribute("hidden");
  };
  const HideApp = () => {
    document.querySelector("main").setAttribute("hidden", "true");
    document.querySelector("#loader").classList.remove("display-none");
  };
  const showMenu = () => {
    document.querySelector("#menuBar").style.right = 0;
  };
  const HideMenu = () => {
    document.querySelector("#menuBar").style.right = "-100%";
  };
  const _toggleWeatherMenus = () => {
    let togller = document.querySelector("#toggle-hourly").children[0],
      dailyPanel = document.querySelector("#daily-panel"),
      hourlyPanel = document.querySelector("#hourly-panel"),
      status = hourlyPanel.dataset.show;
    if (status === "false") {
      hourlyPanel.dataset.show = "true";
      dailyPanel.style.opacity = 0;
      hourlyPanel.style.bottom = 0;
      togller.style.transform = "rotate(180deg)";
    } else if (status === "true") {
      hourlyPanel.dataset.show = "false";
      dailyPanel.style.opacity = 1;
      hourlyPanel.style.bottom = "-100%";
      togller.style.transform = "rotate(0)";
    }
  };
  //Draw The Weather DATA [???]
  const drawWeather = (data, location) => {
    let currentlyData = data.data.currently,
      dailyData = data.data.daily.data,
      hourlyData = data.data.hourly.data,
      weekDays = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wendesday",
        "Thursday",
        "Friday",
        "Satrudy"
      ],
      dailyWeatherWrapper = document.querySelector("#daily-panel"),
      dailyWeatherModel,
      day,
      maxMinTemp,
      dailyIcon,
      HourlyWeatherWrapper = document.querySelector("#hourly-panel"),
      hourlyWeatherModel,
      hour,
      hourlyIcon;

    console.log(hourlyData);
    //console.log(data.data);
    //set the label
    document.querySelectorAll(".location-label").forEach(el => {
      el.textContent = location;
    });
    //set the background
    document.querySelector(
      "main"
    ).style.backgroundImage = `url("/Resources/assets/images/bg-images/${
      currentlyData.icon
    }.jpg")`;
    // set curr icon summary
    document
      .querySelector("#currentlyIcon")
      .setAttribute(
        "src",
        `/Resources/assets/images/summary-icons/${currentlyData.icon}-white.png`
      );
    //set summary
    document.querySelector("#summary-label").textContent =
      currentlyData.summary;
    // degrees label
    document.querySelector("#degrees-label").innerHTML =
      Math.round(((currentlyData.temperature - 32) * 5) / 9) + "&#176;";

    //set humedity
    document.querySelector("#hum_pers").textContent =
      Math.round(currentlyData.humidity * 100) + "%";

    //set wind

    document.querySelector("#wind_speed").textContent =
      (currentlyData.windSpeed * 1.6093).toFixed(1) + "Km/h";

    /// DRAW DAILY WEATHER
    while (dailyWeatherWrapper.children[1]) {
      dailyWeatherWrapper.removeChild(dailyWeatherWrapper.children[1]);
    }
    for (let i = 0; i <= 6; i++) {
      //clone the model
      dailyWeatherModel = dailyWeatherWrapper.children[0].cloneNode(true);
      dailyWeatherModel.classList.remove("display-none");
      //set the day
      day = weekDays[new Date(dailyData[i].time * 1000).getDay()];
      dailyWeatherModel.children[0].children[0].innerHTML = day;
      // set min/max temp
      maxMinTemp =
        Math.round(((dailyData[i].temperatureMax - 32) * 5) / 9) +
        "&#176;" +
        " | " +
        Math.round(((dailyData[i].temperatureMin - 32) * 5) / 9) +
        "&#176;";
      dailyWeatherModel.children[1].children[0].innerHTML = maxMinTemp;
      //set daily icon
      dailyIcon = dailyData[i].icon;
      dailyWeatherModel.children[1].children[1].setAttribute(
        "src",
        `Resources/assets/images/summary-icons/${dailyIcon}-white.png`
      );

      // append model
      dailyWeatherWrapper.appendChild(dailyWeatherModel);
    }
    //DRAW HOURLY WEATHER

    while (HourlyWeatherWrapper.children[1]) {
      HourlyWeatherWrapper.removeChild(HourlyWeatherWrapper.children[1]);
    }
    for (let i = 0; i < 24; i++) {
      hourlyWeatherModel = HourlyWeatherWrapper.children[0].cloneNode(true);
      hourlyWeatherModel.classList.remove("display-none");
      //set hour
      hourlyWeatherModel.children[0].children[0].innerHTML =
        new Date(hourlyData[i].time * 1000).getHours() + ":00";
      //set temp
      hourlyTemp = Math.round(((hourlyData[i].temperature - 32) * 5) / 9);
      hourlyWeatherModel.children[1].children[0].innerHTML =
        hourlyTemp + "&#176;";
      hourlyIcon = hourlyData[i].icon;
      hourlyWeatherModel.children[1].children[1].setAttribute(
        "src",
        `Resources/assets/images/summary-icons/${hourlyIcon}-white.png`
      );
      HourlyWeatherWrapper.appendChild(hourlyWeatherModel);
    }

    UI.showApp();
  };

  document.querySelector("#menu-close").addEventListener("click", HideMenu);
  document.querySelector("#open-menu").addEventListener("click", showMenu);
  document
    .querySelector("#toggle-hourly")
    .addEventListener("click", _toggleWeatherMenus);
  return {
    showApp,
    HideApp,
    drawWeather,
    capitalizeFirstLetter
  };
})();
/**
 * ==========================================
 *                                          =
 *      LOCAL STORAGE API                   =
 *                                          =
 *                                          =
 * ==========================================
 */

const LOCALSTORAGE = (function() {
  let savedCities = [];

  const save = city => {
    if (!getSavedCitites().includes(UI.capitalizeFirstLetter(city))) {
      console.log(getSavedCitites());
      savedCities.push(UI.capitalizeFirstLetter(city));
      localStorage.setItem("savedCities", JSON.stringify(savedCities));
      console.log(getSavedCitites());
    }
  };

  const get = () => {
    if (localStorage.getItem("savedCities") !== null) {
      savedCities = JSON.parse(localStorage.getItem("savedCities"));
    }
  };

  const remove = index => {
    if (index < savedCities.length) {
      savedCities.splice(index, 1);
      localStorage.setItem("savedCities", JSON.stringify(savedCities));
    }
  };
  const getSavedCitites = () => savedCities;

  return {
    save,
    get,
    remove,
    getSavedCitites
  };
})();

/**
 * ==========================================
 *                                          =
 *      THIS MODEL (SAVEDCITIESLOCALLY) TO  =
 *       GET                                =
 *       SAVED LOCATION FROM LOCAL STORAGE  =
 *                                          =
 * ==========================================
 */

const SAVEDCITIESLOCALLY = (function() {
  let container = document.querySelector("#saved_cities");
  const drawCities = city => {
    //Create Elements
    let cityBox = document.createElement("DIV"),
      cityName = document.createElement("SPAN"),
      removeCityButton = document.createElement("BUTTON"),
      minus = document.createElement("SPAN");
    minus.innerHTML = "-";
    //add Classes
    cityBox.classList.add("city", "flex-container", "ripple");
    cityName.classList.add("city_name");
    removeCityButton.classList.add("ripple", "city-remove", "del");
    minus.classList.add("flex-container", "del");
    cityName.innerHTML = UI.capitalizeFirstLetter(city);
    //appending elements
    removeCityButton.appendChild(minus);
    cityBox.appendChild(cityName);
    cityBox.appendChild(removeCityButton);
    container.appendChild(cityBox);
  };

  const delCities = cityHTMLBtn => {
    let nodes = Array.prototype.slice.call(container.children),
      city = cityHTMLBtn.closest(".city"),
      cityIndex = nodes.indexOf(city);

    LOCALSTORAGE.remove(cityIndex);
    city.remove();
  };

  document.addEventListener("click", function(event) {
    if (event.target.classList.contains("del")) {
      console.log(event.target);
      delCities(event.target);
    }
  });
  document.addEventListener("click", function(event) {
    if (event.target.classList.contains("city_name")) {
      let nodes = Array.prototype.slice.call(container.children),
        city = event.target.closest(".city"),
        cityIndex = nodes.indexOf(city),
        savedCities = LOCALSTORAGE.getSavedCitites();
      console.log(city);
      WEATHER.getWeather(savedCities[cityIndex], false);
    }
  });
  return {
    drawCities
  };
})();

/**
 * ==========================================
 *                                          =
 *      THIS MODEL (GETLOCATION) TO GET     =
 *       LOCATION                           =
 *                                          =
 * ==========================================
 */
const getLocation = (function() {
  let inputLocation = document.querySelector("#location-input"),
    addLocation = document.querySelector("#add-location-btn"),
    location;
  //Activate the Button
  function activateAddBtn() {
    let inputLocationText = this.value.trim();
    if (inputLocationText != "") {
      addLocation.classList.remove("btn-disable");
      addLocation.removeAttribute("disabled");
    } else {
      addLocation.classList.add("btn-disable");
      addLocation.setAttribute("disabled", "disabled");
    }
  }

  //Get Location Input
  function getLocationInput() {
    location = inputLocation.value.trim();
    inputLocation.value = "";
    addLocation.classList.add("btn-disable");
    addLocation.setAttribute("disabled", "true");

    WEATHER.getWeather(location, true);
  }

  //Add Events :)
  inputLocation.addEventListener("input", activateAddBtn);
  addLocation.addEventListener("click", getLocationInput);
})();
/**
 * ==========================================
 *                                          =
 *      THIS MODEL (WEATHER)                =
 *      FETCH GEO AND DATA                  =
 *                                          =
 * ==========================================
 */

const WEATHER = (function() {
  const darkSkyKey = "54157591944ff3bdefb10c322cccee87",
    geoCoderKey = "b3b648a4404a47d2af82b881894b3634";

  //make geo url
  const _geoURLMaker = location => {
    return `https://api.opencagedata.com/geocode/v1/json?q=${location}&key=${geoCoderKey}`;
  };
  //make daksky url
  const _darkSkyURLMaker = (lat, lng) => {
    return `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${darkSkyKey}/${lat},${lng}`;
  };

  //Get weather data
  const _getDarkskyData = (url, location) => {
    axios
      .get(url)
      .then(res => {
        UI.drawWeather(res, location);
      })
      .catch(err => {
        console.log(err);
      });
  };

  //#MAIN FUNC =====================
  const getWeather = (location, save) => {
    UI.HideApp();

    let geoCodeURL = _geoURLMaker(location);
    //console.log(geoCodeURL);
    //XHR REQUEST[GET THE GEO]========
    axios
      .get(geoCodeURL)
      .then(res => {
        if (res.data.results.len === 0) {
          console.error("Invalid Locatoion");
          UI.showApp();
          return;
        }

        if (save) {
          LOCALSTORAGE.save(location);
          SAVEDCITIESLOCALLY.drawCities(location);
        }
        let lat = res.data.results[0].geometry.lat,
          lng = res.data.results[0].geometry.lng;

        let darkskyURL = _darkSkyURLMaker(lat, lng);
        //console.log(darkskyURL)
        _getDarkskyData(darkskyURL, location);
      })
      .catch(err => {
        console.log(err);
      });
  };
  return {
    getWeather
  };
})();
/**
 * ==========================================
 *                                          =
 *      INIT                                =
 *                                          =
 * ==========================================
 */
window.onload = function() {
  LOCALSTORAGE.get();
  let cities = LOCALSTORAGE.getSavedCitites();
  if (cities.length !== 0) {
    cities.forEach(city => SAVEDCITIESLOCALLY.drawCities(city));
    WEATHER.getWeather(cities[cities.length - 1], false);
  } else {
    UI.showApp();
  }
};

/**
 * ==========================================
 *                                          =
 *      FirebaseUI config                                =
 *                                          =
 * ==========================================
 */
// Initialize Firebase
var config = {
  apiKey: "AIzaSyBx5DsvJYV0r_h6j31YFYbf09vctXhIU70",
  authDomain: "weatherapp-42eeb.firebaseapp.com",
  databaseURL: "https://weatherapp-42eeb.firebaseio.com",
  projectId: "weatherapp-42eeb",
  storageBucket: "weatherapp-42eeb.appspot.com",
  messagingSenderId: "195273821262"
};
firebase.initializeApp(config);

var uiConfig = {
  signInSuccessUrl: '/index.html',
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  ]
};
// Initialize the FirebaseUI widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
ui.start('#firebaseui-auth-container', uiConfig);