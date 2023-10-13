import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faSignOutAlt,
  faMicrophone,
} from "@fortawesome/free-solid-svg-icons";
import { useLogout } from "../hooks/useLogout";

function AdminNavbar() {
  const { logout } = useLogout();
  const navigate = useNavigate();
  const handleClick = () => {
    logout();
    navigate("/");
    console.log("logout");
  };

  return (
    <div className="col-md-12 bg-dark py-3">
      <nav className="navbar navbar-dark">
        <ul className="nav">
          <li className="nav-item">
            <Link className="nav-link text-white" to="/adminItemlist">
              Items
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/adminfeedback">
              Feedback
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/paymentlist">
              Payments
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/login"
              className="nav-link text-white"
              onClick={(e) => {
                e.preventDefault();
                // Handle logout logic here
                // For example, clear user session and navigate to the login page
                handleClick();
              }}
            >
              <FontAwesomeIcon icon={faSignOutAlt} /> Logout
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default AdminNavbar;
