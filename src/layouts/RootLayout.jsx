import React from "react";
import { Outlet, Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Rocket, Heart } from "lucide-react";

export const RootLayout = () => {
  return (
    <div className="app-layout">
      {/* Общая шапка сайта для всех страниц */}
      <Navbar />

      {/* Контейнер контента, куда роутер подставляет текущую страницу */}
      <main className="main-content" style={{ flex: 1 }}>
        <Outlet />
      </main>

      {/* Общий подвал сайта */}
      <footer className="footer" style={{
        marginTop: "auto",
        borderTop: "1px solid var(--border-color)",
        background: "rgba(10, 15, 30, 0.6)",
        padding: "1.5rem",
        textAlign: "center",
        color: "var(--text-secondary)",
        fontSize: "0.85rem"
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Rocket size={16} color="var(--accent-cyan)" />
            <span><strong>CosmoDex</strong> &copy; {new Date().getFullYear()} — Исследовательский каталог экзопланет</span>
          </div>
          <div>
            <span>Разработано на React & React Router v7</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RootLayout;
