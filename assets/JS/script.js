// fetch ("api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=21a340cdde7edefb7027c127cf3273cf");
var city = $("#city");
var historyid = $("#history");
var searchButton = $("#search-button");
var results = $("#right");
var cities = JSON.parse(localStorage.getItem("cities")) || []

searchButton.click(function () {
    getCity()
})

city.on('keyup', function (event) {
    let key = event.which;
    switch (key) {
        case 13: // enter

            getCity()

            break;
        default:
            break;
    }
});

function getCity() {

    var cityValue = city.val();
    // console.log("cityValue",cityValue);
    city.val("")
    renderHistory(cityValue, true)

    getCoord(cityValue)

}

function getCoord(city) {
    fetch("https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=21a340cdde7edefb7027c127cf3273cf")
        .then(function (response) {
            return response.json()
            // console.log (response[0].name)
        })
        .then(function (data) {
            // console.log("city data",data)
            // console.log(data[0].name)
            fetch("https://api.openweathermap.org/data/2.5/forecast?lat=" + data[0].lat + "&lon=" + data[0].lon + "&units=imperial&appid=21a340cdde7edefb7027c127cf3273cf")
                .then(function (response) {
                    return response.json()

                })
                .then(function (data) {
                    let arr = []
                    // console.log("city",data.city.name)
                    console.log("date",data.list[0])
                    for (const key in data.list) {

                        if ((Number(key) + 1) % 8 === 0) {
                            // console.log("key=",data.list[Number(key)]) 

                            var currentCityDate = data.list[key].dt;
                            let currentDate = moment.unix(currentCityDate).format("MM/DD/YYYY");

                            forecastData = {
                                city: data.city.name,
                                date: currentDate,
                                icon: data.list[key].weather[0].icon,
                                temperature: data.list[key].main.temp,
                                windspeed: data.list[key].wind.speed,
                                humidity: data.list[key].main.humidity,
                            }
                            arr.push(forecastData)

                        }
                    }
                    // console.log(arr)
                    return arr
                    // console.log("city",data.city.name)
                
                    // console.log("icon",data.list[0].weather[0].icon)
                    // console.log("temperature",data.list[0].main.temp)
                    // console.log("windspeed",data.list[0].wind.speed)
                    // console.log("humidity",data.list[0].main.humidity)


                    //    I need to call the function and pass the data
                    // functionName(data)
                })
                .then(function (forecast) {
                    // console.log(forecast)
                    fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + data[0].lat + "&lon=" + data[0].lon + "&units=imperial&appid=21a340cdde7edefb7027c127cf3273cf")
                        .then(function (response) {


                            return response.json()

                        }).then(function (current) {

                            var currentCityDate = current.dt;
                            let currentDate = moment.unix(currentCityDate).format("MM/DD/YYYY");
                            currentData = {
                                city: current.name,
                                date: currentDate,
                                icon: current.weather[0].icon,
                                temperature: current.main.temp,
                                windspeed: current.wind.speed,
                                humidity: current.main.humidity,
                            }
                            forecast.push(currentData)
                            return forecast
                        })
                        .then(function (finalData) {


                            render(finalData)

                        })
                })
                .catch(function (err) {
                    console.log(err)
                })

        })
        .catch(function (err) {
            console.log(err)
        })
}
function render(finalData) {
    results.empty("")
    let currentWeather = finalData[5]
    let resultsCon = $('<div class="today col-lg-12 col-sm-12">')
    results.append(resultsCon)

    let cityName_current = $('<h2>').text(currentWeather.city)
    resultsCon.append(cityName_current)

    let date_current = $('<h2>').text(currentWeather.date)
    resultsCon.append(date_current)

    let icon_current = $('<img id="current_image">').attr('src', 'http://openweathermap.org/img/wn/' + currentWeather.icon + '@2x.png')
    resultsCon.append(icon_current)

    // console.log(resultsCon)

    let temp_current = $('<div class="temp">').html('Temp:<span>' + currentWeather.temperature + '</span>')
    resultsCon.append(temp_current)

    let wind_current = $('<div class="wind">').html('Wind:<span>' + currentWeather.windspeed + '</span>')
    resultsCon.append(wind_current)

    let humidity_current = $('<div class="humidity">').html('Humidity:<span>' + currentWeather.humidity + '</span>')
    resultsCon.append(humidity_current)

    // Start of 5-day Forecast
    let resultsCon2 = $('<div class="forecast col-d-flex-12 col-d-sm-flex-12">')
    results.append(resultsCon2)

    for (const i in finalData) {
        if (i < 5) {
            let weatherCard = $('<div class="weathercard col-12 col-sm-2 ">')
            resultsCon2.append(weatherCard)

            let dateFormat = finalData[i].date
            let dateFormat_ = dateFormat.substring(0, 11)
            let date_forecast = $('<h2>').text(dateFormat_)
            weatherCard.append(date_forecast)


            let icon_forecast = $('<img id="forecast_image">').attr('src', 'http://openweathermap.org/img/wn/' + finalData[i].icon + '@2x.png')
            weatherCard.append(icon_forecast)


            let temp_forecast = $('<div class="forecast_temp">').html('Temp:<span>' + finalData[i].temperature + '</span>')
            weatherCard.append(temp_forecast)

            let wind_forecast = $('<div class="forecast_wind">').html('Wind:<span>' + finalData[i].windspeed + '</span>')
            weatherCard.append(wind_forecast)

            let humidity_forecast = $('<div class="forecast_humidity">').html('Humidity:<span>' + finalData[i].humidity + '</span>')
            weatherCard.append(humidity_forecast)


        }
    }
}
function renderHistory(cityValue, clicked) {
    historyid.empty()
    console.log(cities.length)

    if (cities.length > 10) {
        cities = [];

    }

    if (clicked && !cities.includes(cityValue)) {

        // console.log("RenderHistory",cityValue)
        // let newCities = JSON.stringify(cities)
        cities.push(cityValue)
        // console.log("cities",cities)

        localStorage.setItem("cities", JSON.stringify(cities))

    }

    // print corresponding button for each city we search for
    $.each(cities, function (i, city) {
        // console.log("checkcity",city)
        let cityButton = $('<button class="city">')
        cityButton.text(city)
        cityButton.on("click", function () {
            getCoord(city)
        })
        historyid.append(cityButton)
    })
}
// globalvariables
// document.querySelector target the values of HTML objects


// functionName(data)
// google: how to target the DOM; how to get the DOMs value; how to append; for loops

renderHistory("", false)