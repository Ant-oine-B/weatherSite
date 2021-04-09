
/* main function : success when user authorize localisation
          -set weather from the API data
          -launch the map and set the first localisation from the user */

function geo_success(position) {
    let latitude = position.coords.latitude
    let longitude =  position.coords.longitude
         window.fetch('http://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid=19ce656d059c9d9b4b3c29a4a3cc734d&units=metric&lang=fr')
            .then(response => response.json())
            .then(json => {
                console.log(json) /*remove it when everything is set*/
                globalTemp.innerHTML = Math.round(json.main.temp)
                cityLocalisation.innerHTML = json.name
                cityCountry.innerHTML = json.sys.country
                weatherText.innerHTML = json.weather[0].description
                feelTemp.innerHTML = Math.round(json.main.feels_like)
                windSpeed.innerHTML = Math.round(json.wind.speed*3.6) /*data in ms/s * 3.6 = km/h */
            })

    let mymap = L.map('mapid').setView([latitude, longitude], 13);

      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoid2l6a2lsbCIsImEiOiJja21rZGxnbjcxMDNmMnZxdm1scWs5MDk3In0.7tLpBCEeCsCnVvW_yM7mfg', { 
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: 'mapbox/streets-v11',
          tileSize: 512,
          zoomOffset: -1,
      }).addTo(mymap);

mymap.addEventListener('click', onMapClick);
  }

  /* if error : localisation is set with the user IP
            -user IP is catch (script in HTML)
            -localisation is set with the IP API
            -weather & map localisation are set with this information */

  function geo_error() {
    window.fetch('http://api.ipstack.com/'+visitorIP+'?access_key=ecefcd22bcd6ddb7a3f75807608d10a1') /*visiorIP is catch in script (HTML doc)*/
    .then (response => response.json())
    .then (json => {
      console.log(json)
      latitude = json.latitude
      longitude =  json.longitude
      window.fetch('http://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid=19ce656d059c9d9b4b3c29a4a3cc734d&units=metric&lang=fr')
      .then(response => response.json())
      .then(json => {
                console.log(json) /*remove it when everything is set*/
                globalTemp.innerHTML = Math.round(json.main.temp)
                cityLocalisation.innerHTML = json.name
                cityCountry.innerHTML = json.sys.country
                weatherText.innerHTML = json.weather[0].description
                feelTemp.innerHTML = Math.round(json.main.feels_like)
                windSpeed.innerHTML = Math.round(json.wind.speed*3.6) /*data in ms/s * 3.6 = km/h */
            })
    let mymap = L.map('mapid').setView([latitude, longitude], 12);

      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoid2l6a2lsbCIsImEiOiJja21rZGxnbjcxMDNmMnZxdm1scWs5MDk3In0.7tLpBCEeCsCnVvW_yM7mfg', {
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: 'mapbox/streets-v11',
          tileSize: 512,
          zoomOffset: -1,
      }).addTo(mymap);

mymap.addEventListener('click', onMapClick);
    })
  }

let userPosition = navigator.geolocation.getCurrentPosition(geo_success, geo_error);

/* set the localisation from event click on the map */

function onMapClick(e) {
  latitude = e.latlng.lat;
  longitude = e.latlng.lng;
    if (mapid.classList.contains("mapIsOpen")) {
      mapid.classList.add("mapIsClose");
    }
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
     e.preventDefault();
     document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
      });
 });
});
  window.fetch('http://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid=19ce656d059c9d9b4b3c29a4a3cc734d&units=metric&lang=fr')
            .then(response => response.json())
            .then(json => {
                console.log(json)
                globalTemp.innerHTML = Math.round(json.main.temp)
                cityLocalisation.innerHTML = json.name
                cityCountry.innerHTML = json.sys.country
                weatherText.innerHTML = json.weather[0].description
                feelTemp.innerHTML = Math.round(json.main.feels_like)
                windSpeed.innerHTML = Math.round(json.wind.speed*3.6) /*data in ms/s * 3.6 = km/h */
            })
}

/* header button : focus on the map for the selection of a new localisation */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
     e.preventDefault();
     document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
      });
 });
});

let mapButton = document.getElementById("header-button");

function openMap () {
 mapid.classList.remove("mapIsClose");
 mapid.classList.add("mapIsOpen");
}

mapButton.addEventListener("click", openMap);


/* research a localisation by name */

function onSubmitClick() {
  let userCityRequest = searchInput.value;
    window.fetch('http://api.openweathermap.org/data/2.5/weather?q='+userCityRequest+'&appid=19ce656d059c9d9b4b3c29a4a3cc734d&units=metric&lang=fr')
    .then(response => response.json())
    .then(json => {
        console.log(json) /*remove it when everything is set*/
        globalTemp.innerHTML = Math.round(json.main.temp)
        cityLocalisation.innerHTML = json.name
        cityCountry.innerHTML = json.sys.country
        weatherText.innerHTML = json.weather[0].description
        feelTemp.innerHTML = Math.round(json.main.feels_like)
        windSpeed.innerHTML = Math.round(json.wind.speed*3.6) /*data in ms/s * 3.6 = km/h */

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
          anchor.addEventListener('click', function (e) {
             e.preventDefault();
             document.querySelector(this.getAttribute('href')).scrollIntoView({
              behavior: 'smooth'
              });
         });
        });
  })


}


submitCity.addEventListener('click', onSubmitClick);

