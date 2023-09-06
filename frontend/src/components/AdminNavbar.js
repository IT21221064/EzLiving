import React from "react";
import { Link, useNavigate } from "react-router-dom";

function AdminNavbar() {
  return (
    <div className="col-md-12 bg-dark py-3">
      <nav className="navbar navbar-dark">
        <a className="navbar-brand">Voice controlled navigation</a>
        <ul className="nav">
          <li className="nav-item">
            <Link className="nav-link text-white" to="/adminItemlist">
              Items
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/addItem">
              Add Item
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/viewItems">
              View Items
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default AdminNavbar;
