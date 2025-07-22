import React from 'react';
import { Link } from 'react-router-dom';

const Navabar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">MyApp</Link>

      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          {/* <li className="nav-item">
            <Link className="nav-link" to="/dashboard">Dashboard</Link>
          </li> */}

          <li className="nav-item">
            <Link className="nav-link" to="/admin-login">Admin</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navabar;
