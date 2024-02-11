import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { isMobile } from "react-device-detect";

const MainScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { data, date } = location.state;

  const displayGif = (weatherIcon) => {
    switch (weatherIcon) {
      case "01d":
        return require("../assets/weather/sun.gif");
      case "01n":
        return require("../assets/weather/night.gif");
      case "02d":
      case "02n":
      case "03d":
      case "03n":
      case "04d":
      case "04n":
        return require("../assets/weather/clouds.gif");
      case "09d":
      case "09n":
      case "10d":
      case "10n":
        return require("../assets/weather/rain.gif");
      case "11d":
      case "11d":
        return require("../assets/weather/storm.gif");
      case "13d":
      case "13n":
        return require("../assets/weather/snow.gif");
      case "50d":
      case "50n":
        return require("../assets/weather/foggy.gif");
      default:
        return require("../assets/weather/clouds.gif");
    }
  };

  return (
    <div className="main-screen-container">
      {data.cod === 200 && (
        <img className="weather-gif" src={displayGif(data.weather[0].icon)} />
      )}
      <h1>{data.cod === 200 ? data.name : data.message.toUpperCase()}</h1>

      <div>
        <table className="weather-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Temp (F)</th>
              {!isMobile && (
                <>
                  <th>Description</th>
                  <th>Main</th>
                  <th>Pressure</th>
                  <th>Humidity</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{data.cod === 200 ? date : "-"}</td>
              <td>{data.cod === 200 ? data?.main?.temp : "-"}</td>
              {!isMobile && (
                <>
                  <td>
                    {data.cod === 200 ? data?.weather[0]?.description : "-"}
                  </td>
                  <td>{data.cod === 200 ? data?.weather[0]?.main : "-"}</td>
                  <td>{data.cod === 200 ? data?.main?.pressure : "-"}</td>
                  <td>{data.cod === 200 ? data?.main?.humidity : "-"}</td>
                </>
              )}
            </tr>
          </tbody>
        </table>
      </div>
      <button className="back-button" onClick={() => navigate("/home")}>
        BACK
      </button>
    </div>
  );
};

export default MainScreen;
