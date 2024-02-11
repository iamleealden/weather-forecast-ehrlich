import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const Header = () => {
  const { logout, isAuthenticated } = useAuth0();
  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return (
    <header className="header">
      <div className="header-container">
        <img
          src={require("../assets/headericon.png")}
          style={{ width: 50, height: 50 }}
        />
        <span className="header-text">WeatherWise</span>
      </div>
      {isAuthenticated && (
        <div>
          <button onClick={handleLogout} className="header-button">
            LOGOUT
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
