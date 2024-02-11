import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { isMobile } from "react-device-detect";

const LoginScreen = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="login-screen">
      <h1 className={isMobile ? "mobile-main-text-title" : "main-text-title"}>
        WeatherWise
      </h1>
      <h3
        className={
          isMobile ? "mobile-main-text-subtitle" : "main-text-subtitle"
        }
      >
        Stay Ahead of the Elements. Your Weather Wisdom Begins Here!
      </h3>

      <button
        className="login-button"
        onClick={() =>
          loginWithRedirect({
            scope: "openid profile email user:read",
          })
        }
      >
        LOGIN
      </button>
    </div>
  );
};

export default LoginScreen;
