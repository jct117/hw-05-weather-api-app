$(function () {

  $("#weather-form").submit((event) => {
    event.preventDefault()

    const cityName = $("#city").val()
    // checks if city or zipcode input
    // zipCode gets created to add US
    // onto the string
    if (isNaN(cityName)) {
      searchCity(cityName)
    } else {
      let zipCode = cityName.toString() + ",us"
      searchCity(zipCode)
    }

    $("#city").val("")
  })

  async function searchCity (cityName) {
      try{
        const url = `https://api.openweathermap.org/data/2.5/weather?`
        const apiKey = "3ec5586cbfd3b18c76a84a642260164b"

        const response = await axios.get(url, {
          params: {
              q: cityName,
              zip: cityName,
              units: "imperial",
              APPID: apiKey
          }
        })


       displayResults(response)
     } catch (error) {
       console.log(error)
       alert("Not A Valid City Or ZipCode, Search Again")
       $("#city").val("")
     }
  }


  function displayResults(citysWeather) {
    const cityName = citysWeather.data.name
    const currentTemp = Math.round(citysWeather.data.main.temp)
    const weatherDescription = citysWeather.data.weather[0].description
    const maxTemp = Math.round(citysWeather.data.main.temp_max)
    const minTemp = Math.round(citysWeather.data.main.temp_min)
    const country = citysWeather.data.sys.country


    $(".currentCity").text(cityName)
    $(".currentTemp").text(`${currentTemp}F`)
    $(".tempMinMax").text(`Min: ${minTemp} F, Max: ${maxTemp} F`)
    $(".currentWeather").text(weatherDescription)

    checkTemp(currentTemp)

  }

  function checkTemp (temp) {
    if (temp <= "50"){
      $(".currentTemp").addClass("cold")

    } else if (temp >= "90") {
      $(".currentTemp").addClass("hot")

    } else {
      $(".currentTemp").removeClass("hot")
      $(".currentTemp").removeClass("cold")
    }
  }


})
