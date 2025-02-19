import React from "react";
import { NavLink } from "react-router-dom";
import "./styles/Sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-box">
          <div className="logo-rect" />
          <div className="logo-square" />
        </div>
        <span className="sidebar-title">express</span>
      </div>

      <nav className="sidebar-menu">
        <ul>
          <li>
            <NavLink to="/" exact activeClassName="active">
              Машины-рейсы
            </NavLink>
          </li>
          <li>
            <NavLink to="/main" activeClassName="active">
              Главная
            </NavLink>
          </li>
          <li>
            <NavLink to="/history" activeClassName="active">
              История
            </NavLink>
          </li>
        </ul>
        <div className="menu-background"></div> {/* Динамический фон */}
      </nav>

      <div className="admin-button">
        <button>
          <span className="admin-icon">⚫</span> Admin
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
