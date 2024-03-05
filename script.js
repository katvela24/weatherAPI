// fetch ("api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=21a340cdde7edefb7027c127cf3273cf");
var city = $("#city");

    
var searchButton = $("#search-button");

searchButton.click(function(){
    var cityValue = city.val();
    console.log("cityValue",cityValue);
    city.val("")

    renderHistory(cityValue)    

})
function renderHistory(cityValue){
    console.log("RenderHistory",cityValue)

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