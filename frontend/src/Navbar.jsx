import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  function handleLogout() {
    localStorage.removeItem("user");
    localStorage.removeItem("resume");
    window.location.reload();
  }

  return (
    <nav class="navbar navbar-expand-lg navbar-light ">
      <div class="container-fluid">
        <h1>
          <Link style={{ textDecoration: "none" }} to="/">
            Resume Builder
          </Link>
        </h1>
        {localStorage.getItem("user") && (
          <button className="btn btn-outline-primary" onClick={handleLogout}>
            <Link style={{ textDecoration: "none" }} to="/">
              Logout
            </Link>
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
