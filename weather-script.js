const weatherContainer = document.getElementById("weather-container");


const apiUrl = "https://api.open-meteo.com/v1/forecast?latitude=40.7128&longitude=-74.0060&daily=temperature_2m_max,temperature_2m_min,uv_index_max,precipitation_sum&current_weather=true&temperature_unit=fahrenheit&timezone=auto";

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    const dates = data.daily.time;
    const maxTemps = data.daily.temperature_2m_max;
    const minTemps = data.daily.temperature_2m_min;
    const uvIndices = data.daily.uv_index_max;
    const precipSums = data.daily.precipitation_sum;
    const currentTemp = data.current_weather.temperature;

    for (let i = 0; i < 7; i++) {
      const card = document.createElement("div");
      card.classList.add("card");

      
      const dateObj = new Date(dates[i]);
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const formattedDate = dateObj.toLocaleDateString('en-US', options);
      
      const date = document.createElement("h2");
      date.textContent = formattedDate;

      const maxTemp = document.createElement("p");
      maxTemp.textContent = "High: " + maxTemps[i] + "°F";

      const minTemp = document.createElement("p");
      minTemp.textContent = "Low: " + minTemps[i] + "°F";

      
      const currentWeatherTemp = document.createElement("p");
      currentWeatherTemp.textContent = "Current Temp: " + currentTemp + "°F";


      const uvIndex = document.createElement("p");
      uvIndex.textContent = "UV Index: " + uvIndices[i];

      
      const precipitation = document.createElement("p");
      precipitation.textContent = "Precipitation: " + precipSums[i] + " mm";

      card.appendChild(date);
      card.appendChild(currentWeatherTemp);
      card.appendChild(maxTemp);
      card.appendChild(minTemp);
      card.appendChild(uvIndex);
      card.appendChild(precipitation);

      weatherContainer.appendChild(card);
    }
  })
  .catch(error => {
    weatherContainer.innerHTML = "<p>Sorry, weather data could not be loaded.</p>";
    console.error("Error fetching weather data:", error);
  });
