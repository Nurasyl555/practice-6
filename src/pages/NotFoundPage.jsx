import React from "react";
import { Link } from "react-router-dom";
import { Home, Compass, AlertTriangle } from "lucide-react";

export const NotFoundPage = () => {
  return (
    <div style={{
      maxWidth: 600,
      margin: "5rem auto",
      padding: "0 1.5rem",
      textAlign: "center"
    }}>
      <div style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-color)",
        borderRadius: "24px",
        padding: "3.5rem 2rem",
        boxShadow: "0 20px 50px rgba(0,0,0,0.4)"
      }}>
        <div style={{
          width: 70,
          height: 70,
          borderRadius: 20,
          background: "rgba(244, 63, 94, 0.15)",
          color: "var(--accent-rose)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 1.5rem auto"
        }}>
          <AlertTriangle size={36} />
        </div>

        <h1 style={{
          fontSize: "5rem",
          fontWeight: 900,
          lineHeight: 1,
          letterSpacing: 4,
          background: "linear-gradient(135deg, var(--accent-rose), var(--accent-amber))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          marginBottom: "1rem"
        }}>
          404
        </h1>

        <h2 style={{ fontSize: "1.6rem", fontWeight: 700, marginBottom: "0.8rem" }}>
          Координаты не найдены
        </h2>

        <p style={{ color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "2rem" }}>
          Запрашиваемый сектор космоса или страница не существует. Возможно, адрес был введен неверно или звездная система сместилась с орбиты.
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
          <Link to="/" className="btn btn-primary" style={{ textDecoration: "none", padding: "0.75rem 1.4rem" }}>
            <Home size={18} /> На главную
          </Link>
          <Link to="/planets" className="btn btn-secondary" style={{ textDecoration: "none", padding: "0.75rem 1.4rem" }}>
            <Compass size={18} /> В каталог планет
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
