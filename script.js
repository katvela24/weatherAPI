// fetch ("api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=21a340cdde7edefb7027c127cf3273cf");
var city = $("#city");
var historyid = $("#history");
var searchButton = $("#search-button");
var cities = JSON.parse(localStorage.getItem("cities")) || []

searchButton.click(function(){
    var cityValue = city.val();
    console.log("cityValue",cityValue);
    city.val("")
    renderHistory(cityValue,true)    

})
function renderHistory(cityValue,clicked){
    historyid.empty()
    if(clicked){
    
        console.log("RenderHistory",cityValue)
        let newCities = JSON.stringify(cities)
        cities.push(cityValue)
        console.log("cities",cities)
        localStorage.setItem("cities",JSON.stringify(cities))

    }
    
    // print corresponding button for each city we search for
    $.each(cities,function(i,city){
        console.log("checkcity",city)
        let cityButton = $('<button class="city">')
        cityButton.text(city)
        historyid.append(cityButton)
    })
}
// globalvariables
// document.querySelector target the values of HTML objects

fetch ("https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=21a340cdde7edefb7027c127cf3273cf")
    .then(function(response){
        return response.json()
        console.log (response[0].name)
    })
    .then(function(data){
        console.log("city data",data)
        console.log(data[0].name)
        fetch ("http://api.openweathermap.org/data/2.5/forecast?lat=" + data[0].lat + "&lon=" + data[0].lon + "&units=imperial&appid=21a340cdde7edefb7027c127cf3273cf")
            .then(function(response){
                return response.json()

            })
            .then(function(data){
               console.log("I'm looking",data)
            //    I need to call the function and pass the data
            // functionName(data)
            })
            .catch(function(err){
                console.log (err)
            })

    })
    .catch(function(err){
        console.log (err)
    })
    // functionName(data)
    // google: how to target the DOM; how to get the DOMs value; how to append; for loops
    
    renderHistory("",false)