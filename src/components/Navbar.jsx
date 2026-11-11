import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Rocket, Compass, BarChart3, Info, LogIn, UserPlus, User, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="brand-group" style={{ textDecoration: "none", color: "inherit" }}>
          <div className="brand-icon-wrapper">
            <Rocket className="brand-icon" size={26} />
          </div>
          <div>
            <h1 className="brand-title">COSMODEX</h1>
            <p className="brand-subtitle">Астрофизический каталог экзопланет</p>
          </div>
        </Link>

        <nav className="nav-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            Главная
          </NavLink>

          <NavLink
            to="/planets"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            <Compass size={16} className="icon-inline" />
            Планеты
          </NavLink>

          <NavLink
            to="/dashboard"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            <BarChart3 size={16} className="icon-inline" />
            Дашборд
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            <Info size={16} className="icon-inline" />
            О проекте
          </NavLink>

          {user ? (
            <>
              <NavLink
                to="/profile"
                className={({ isActive }) => `nav-link profile-nav-link ${isActive ? "active" : ""}`}
              >
                <User size={16} className="icon-inline" />
                Профиль
              </NavLink>

              <button
                onClick={handleLogout}
                className="nav-link logout-nav-link"
                title="Выйти из аккаунта"
              >
                <LogOut size={16} className="icon-inline" />
                Выход
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) => `nav-link login-nav-link ${isActive ? "active" : ""}`}
              >
                <LogIn size={16} className="icon-inline" />
                Вход
              </NavLink>

              <NavLink
                to="/signup"
                className={({ isActive }) => `nav-link signup-nav-link ${isActive ? "active" : ""}`}
              >
                <UserPlus size={16} className="icon-inline" />
                Регистрация
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
