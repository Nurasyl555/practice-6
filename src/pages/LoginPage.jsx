import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import { Lock, Mail, ArrowRight, AlertCircle, LogIn } from "lucide-react";

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loginWithGoogle } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const from = location.state?.from?.pathname || "/profile";

  const formatFirebaseError = (err) => {
    switch (err.code) {
      case "auth/invalid-credential":
      case "auth/user-not-found":
      case "auth/wrong-password":
        return "Неверный адрес электронной почты или пароль.";
      case "auth/invalid-email":
        return "Некорректный формат электронной почты.";
      case "auth/too-many-requests":
        return "Слишком много неудачных попыток. Пожалуйста, подождите немного.";
      case "auth/popup-closed-by-user":
        return "Окно входа Google было закрыто.";
      default:
        return err.message || "Ошибка авторизации. Проверьте данные.";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);   

    try {
      setIsSubmitting(true);
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(formatFirebaseError(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    try {
      setIsSubmitting(true);
      await loginWithGoogle();
      navigate(from, { replace: true });
    } catch (err) {
      setError(formatFirebaseError(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{
      maxWidth: 460,
      margin: "4rem auto",
      padding: "0 1.5rem"
    }}>
      <div style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-color)",
        borderRadius: "24px",
        padding: "2.5rem",
        boxShadow: "0 20px 50px rgba(0, 0, 0, 0.4)",
        textAlign: "center"
      }}>
        {/* Иконка в заголовке */}
        <div style={{
          background: "linear-gradient(135deg, var(--accent-indigo), var(--accent-cyan))",
          width: 56,
          height: 56,
          borderRadius: 16,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          margin: "0 auto 1.5rem auto",
          boxShadow: "0 8px 24px rgba(99, 102, 241, 0.4)"
        }}>
          <LogIn size={26} />
        </div>

        <h1 style={{ fontSize: "1.8rem", fontWeight: 800, marginBottom: "0.5rem" }}>
          Авторизация
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginBottom: "2rem" }}>
          Вход в исследовательскую панель CosmoDex
        </p>

        {/* Вывод ошибки авторизации */}
        {error && (
          <div style={{
            background: "rgba(239, 68, 68, 0.12)",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            color: "#f87171",
            padding: "0.8rem 1rem",
            borderRadius: 12,
            fontSize: "0.88rem",
            marginBottom: "1.5rem",
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            textAlign: "left"
          }}>
            <AlertCircle size={18} style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        {/* Форма входа */}
        <form onSubmit={handleSubmit} style={{ textAlign: "left" }}>
          <div style={{ marginBottom: "1.2rem" }}>
            <label style={{ display: "block", fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "0.4rem" }}>
              Электронная почта
            </label>
            <div style={{ position: "relative" }}>
              <input
                type="email"
                className="input-text"
                placeholder="astronomer@cosmodex.org"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ width: "100%", paddingLeft: "2.4rem" }}
              />
              <Mail size={16} style={{ position: "absolute", left: "0.8rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
            </div>
          </div>

          <div style={{ marginBottom: "1.8rem" }}>
            <label style={{ display: "block", fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "0.4rem" }}>
              Пароль
            </label>
            <div style={{ position: "relative" }}>
              <input
                type="password"
                className="input-text"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ width: "100%", paddingLeft: "2.4rem" }}
              />
              <Lock size={16} style={{ position: "absolute", left: "0.8rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
            style={{ width: "100%", padding: "0.85rem", fontSize: "1rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}
          >
            {isSubmitting ? "Проверка учетных данных..." : "Войти в систему"}
            <ArrowRight size={18} />
          </button>
        </form>

        {/* Разделитель "или" */}
        <div style={{
          display: "flex",
          alignItems: "center",
          margin: "1.5rem 0",
          color: "var(--text-muted)",
          fontSize: "0.85rem"
        }}>
          <div style={{ flex: 1, height: 1, background: "var(--border-color)" }} />
          <span style={{ padding: "0 0.8rem" }}>или</span>
          <div style={{ flex: 1, height: 1, background: "var(--border-color)" }} />
        </div>

        {/* Кнопка входа через Google */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={isSubmitting}
          style={{
            width: "100%",
            padding: "0.8rem",
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid var(--border-color)",
            borderRadius: 12,
            color: "var(--text-primary)",
            fontSize: "0.92rem",
            fontWeight: 500,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.75rem",
            transition: "all 0.2s ease"
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
          </svg>
          Войти через Google
        </button>

        {/* Ссылка на регистрацию */}
        <div style={{ marginTop: "1.8rem", fontSize: "0.88rem", color: "var(--text-muted)" }}>
          Нет исследовательской записи?{" "}
          <Link to="/signup" style={{ color: "var(--accent-cyan)", textDecoration: "none", fontWeight: 600 }}>
            Зарегистрироваться
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;