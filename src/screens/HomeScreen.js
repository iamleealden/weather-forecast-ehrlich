import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HomeScreen = () => {
  const { isAuthenticated, getAccessTokenSilently, user } = useAuth0();
  const navigate = useNavigate();

  const [userInput, setUserInput] = useState("");
  const [invalidInput, setInvalidInput] = useState(false);
  const [githubLink, setGitHubLink] = useState();

  useEffect(() => {
    if (userInput.trim().length > 0) {
      setInvalidInput(false);
    }
  }, [userInput]);

  useEffect(() => {
    void (async () => {
      if (isAuthenticated && user) {
        try {
          const response = await fetch(
            `https://api.github.com/users/${user.nickname}`
          );
          const userData = await response.json();
          setGitHubLink(userData.html_url);
        } catch (error) {
          setGitHubLink(null);
        }
      }
    })();
  }, [isAuthenticated, user]);

  const onPressButton = () => {
    if (userInput.trim() === "") {
      setInvalidInput(true);
    } else {
      setInvalidInput(false);
      const apiKey = "4b3507481e64ee53998f35cd51a97502";
      const date = new Date();

      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      const year = date.getFullYear();

      // setDate(`${month}/${day}/${year}`);
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${userInput}&units=imperial&appid=${apiKey}`
      )
        .then((response) => response.json())
        .then((data) => {
          navigate("/weather", {
            state: { data: data, date: `${month}/${day}/${year}` },
          });
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  };

  return (
    <div className="home-screen">
      <img
        src={
          user?.picture
            ? user?.picture
            : require("../assets/imageplaceholder.png")
        }
        className="profile-picture"
      />

      <h1 className="home-name-text">{user ? user.name : "User"}</h1>
      {githubLink ? (
        <a className="github-link" href={githubLink} target="_blank">
          {githubLink}
        </a>
      ) : null}

      <input
        value={userInput}
        type="text"
        onChange={(event) => setUserInput(event.target.value)}
        className="input"
        placeholder="City"
      />
      <p className="invalid-input" style={{ color: "red" }}>
        {invalidInput ? "Invalid Input!" : ""}
      </p>
      <button className="button-weather" onClick={onPressButton}>
        Display Weather
      </button>
    </div>
  );
};

export default HomeScreen;
