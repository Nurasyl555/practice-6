import React from "react";
import { Link } from "react-router-dom";
import { Compass, BarChart3, Info, Sparkles, ArrowRight, ShieldCheck, Database, Telescope } from "lucide-react";
import heroImg from "../assets/hero.png";

export const HomePage = () => {
  return (
    <div className="home-page" style={{ maxWidth: 1280, margin: "0 auto", padding: "2.5rem 1.5rem" }}>
      {/* Hero секция с интро, изображением и кнопками */}
      <section style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: "3rem",
        alignItems: "center",
        padding: "3rem 2rem",
        borderRadius: "24px",
        background: "linear-gradient(135deg, rgba(20, 28, 58, 0.7) 0%, rgba(10, 15, 30, 0.9) 100%)",
        border: "1px solid var(--border-color)",
        boxShadow: "0 20px 50px rgba(0, 0, 0, 0.4)",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Левая колонка: Текст и навигация */}
        <div>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "rgba(99, 102, 241, 0.15)",
            border: "1px solid rgba(99, 102, 241, 0.3)",
            color: "var(--accent-cyan)",
            padding: "0.4rem 0.9rem",
            borderRadius: "50px",
            fontSize: "0.85rem",
            fontWeight: 600,
            marginBottom: "1.2rem"
          }}>
            <Sparkles size={16} /> Космическая астрофизическая база
          </div>

          <h1 style={{
            fontSize: "2.8rem",
            fontWeight: 900,
            lineHeight: 1.15,
            marginBottom: "1.2rem",
            background: "linear-gradient(135deg, #ffffff 40%, var(--accent-cyan) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>
            Исследуйте далекие миры и экзопланеты
          </h1>

          <p style={{
            fontSize: "1.1rem",
            color: "var(--text-secondary)",
            lineHeight: 1.7,
            marginBottom: "2rem"
          }}>
            Добро пожаловать в <strong>CosmoDex</strong> — интерактивную платформу для исследования подтвержденных экзопланет, открытых миссиями Kepler, TESS, James Webb и Hubble. Изучайте параметры атмосфер, пригодность для жизни и аналитику звездных систем.
          </p>

          {/* Навигационные ссылки */}
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link to="/planets" className="btn btn-primary" style={{ textDecoration: "none", padding: "0.8rem 1.6rem", fontSize: "1rem" }}>
              <Compass size={20} /> Перейти в каталог <ArrowRight size={18} />
            </Link>

            <Link to="/dashboard" className="btn btn-secondary" style={{ textDecoration: "none", padding: "0.8rem 1.4rem", fontSize: "1rem" }}>
              <BarChart3 size={20} /> Дашборд аналитики
            </Link>

            <Link to="/about" className="btn btn-secondary" style={{ textDecoration: "none", padding: "0.8rem 1.2rem", fontSize: "1rem" }}>
              <Info size={20} /> О проекте
            </Link>
          </div>
        </div>

        {/* Правая колонка: Изображение */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div style={{
            position: "relative",
            width: "100%",
            maxWidth: 420,
            borderRadius: "20px",
            padding: "10px",
            background: "radial-gradient(circle, rgba(56, 189, 248, 0.2) 0%, transparent 70%)"
          }}>
            <img
              src={heroImg}
              alt="CosmoDex Exoplanet Explorer"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "16px",
                boxShadow: "0 10px 30px rgba(99, 102, 241, 0.3)",
                display: "block"
              }}
            />
          </div>
        </div>
      </section>

      {/* Информационные карточки под Hero */}
      <section style={{
        marginTop: "3rem",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: "1.5rem"
      }}>
        <div className="feature-card" style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-color)",
          borderRadius: "16px",
          padding: "1.8rem",
          transition: "transform 0.2s"
        }}>
          <div style={{ background: "rgba(56, 189, 248, 0.15)", width: 44, height: 44, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent-cyan)", marginBottom: "1rem" }}>
            <Database size={24} />
          </div>
          <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>100+ Экзопланет</h3>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", lineHeight: 1.6 }}>
            Детализированные параметры: масса, радиус, температура поверхности, родительская звезда и световые года.
          </p>
        </div>

        <div className="feature-card" style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-color)",
          borderRadius: "16px",
          padding: "1.8rem"
        }}>
          <div style={{ background: "rgba(99, 102, 241, 0.15)", width: 44, height: 44, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent-indigo)", marginBottom: "1rem" }}>
            <Telescope size={24} />
          </div>
          <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>Космические миссии</h3>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", lineHeight: 1.6 }}>
            Фильтрация открытий по космическим обсерваториям NASA и ESA: Kepler, TESS, James Webb.
          </p>
        </div>

        <div className="feature-card" style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-color)",
          borderRadius: "16px",
          padding: "1.8rem"
        }}>
          <div style={{ background: "rgba(16, 185, 129, 0.15)", width: 44, height: 44, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent-emerald)", marginBottom: "1rem" }}>
            <ShieldCheck size={24} />
          </div>
          <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>Обитаемая зона</h3>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", lineHeight: 1.6 }}>
            Отбор потенциально пригодных для жизни миров с жидкой водой на поверхности.
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
