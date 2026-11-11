import React from "react";
import { Link } from "react-router-dom";
import { Info, Code2, Sparkles, Orbit, Layers, ArrowLeft } from "lucide-react";

export const AboutPage = () => {
  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: "2.5rem 1.5rem" }}>
      <div style={{ marginBottom: "2rem" }}>
        <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "var(--accent-cyan)", textDecoration: "none", fontSize: "0.95rem" }}>
          <ArrowLeft size={16} /> На главную
        </Link>
      </div>

      <div style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-color)",
        borderRadius: "20px",
        padding: "2.5rem",
        boxShadow: "0 10px 40px rgba(0,0,0,0.3)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
          <div style={{ background: "rgba(56, 189, 248, 0.15)", width: 50, height: 50, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent-cyan)" }}>
            <Info size={28} />
          </div>
          <div>
            <h1 style={{ fontSize: "2rem", fontWeight: 800 }}>О проекте CosmoDex</h1>
            <p style={{ color: "var(--text-secondary)" }}>Интерактивная научная база экзопланет и телескопических миссий</p>
          </div>
        </div>

        <section style={{ marginBottom: "2.5rem", lineHeight: 1.8, color: "var(--text-secondary)" }}>
          <h2 style={{ color: "var(--text-primary)", fontSize: "1.3rem", marginBottom: "0.8rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Orbit size={20} color="var(--accent-indigo)" /> Миссия проекта
          </h2>
          <p>
            <strong>CosmoDex</strong> создан для популяризации астрономии и демонстрации возможностей современной компонентной архитектуры на <strong>React</strong>. Приложение предоставляет исследователям и энтузиастам космоса удобный интерфейс для поиска, фильтрации и глубокого анализа подтвержденных планет за пределами Солнечной системы.
          </p>
        </section>

        <section style={{ marginBottom: "2.5rem" }}>
          <h2 style={{ color: "var(--text-primary)", fontSize: "1.3rem", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Layers size={20} color="var(--accent-cyan)" /> Архитектура и технологии
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
            <div style={{ padding: "1.2rem", background: "rgba(10, 15, 30, 0.7)", borderRadius: 12, border: "1px solid var(--border-color)" }}>
              <strong style={{ color: "#fff", display: "block", marginBottom: "0.4rem" }}>React 19 & Vite</strong>
              <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)" }}>Быстрая сборка, модульные компоненты и реактивное состояние.</p>
            </div>
            <div style={{ padding: "1.2rem", background: "rgba(10, 15, 30, 0.7)", borderRadius: 12, border: "1px solid var(--border-color)" }}>
              <strong style={{ color: "#fff", display: "block", marginBottom: "0.4rem" }}>React Router v7</strong>
              <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)" }}>Вложенные маршруты, useParams, useSearchParams и ленивая загрузка.</p>
            </div>
            <div style={{ padding: "1.2rem", background: "rgba(10, 15, 30, 0.7)", borderRadius: 12, border: "1px solid var(--border-color)" }}>
              <strong style={{ color: "#fff", display: "block", marginBottom: "0.4rem" }}>Simulated Async API</strong>
              <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)" }}>Имитация сетевых запросов, задержек и сохранение в localStorage.</p>
            </div>
          </div>
        </section>

        <section style={{ borderTop: "1px solid var(--border-color)", paddingTop: "1.5rem" }}>
          <h2 style={{ color: "var(--text-primary)", fontSize: "1.3rem", marginBottom: "0.8rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Code2 size={20} color="var(--accent-emerald)" /> Сведения о разработке
          </h2>
          <p style={{ color: "var(--text-secondary)", lineHeight: 1.7, fontSize: "0.95rem" }}>
            Данный проект разработан в рамках дисциплины Front-End Development (React) для освоения расширенной маршрутизации, динамических URL, синхронизации параметров в строке запроса и архитектурных паттернов SPA.
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
