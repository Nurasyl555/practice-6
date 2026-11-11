import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { User, Mail, Fingerprint, LogOut, ShieldCheck } from "lucide-react";

export const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [error, setError] = useState(null);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      setError(null);
      await logout();
      navigate("/login");
    } catch (err) {
      setError("Не удалось выйти из системы. Попробуйте еще раз.");
      setIsLoggingOut(false);
    }
  };

  return (
    <div style={{
      maxWidth: 560,
      margin: "4rem auto",
      padding: "0 1.5rem"
    }}>
      <div style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-color)",
        borderRadius: "24px",
        padding: "2.5rem",
        boxShadow: "0 20px 50px rgba(0, 0, 0, 0.4)"
      }}>
        {/* Аватарка профиля с красивым градиентом */}
        <div style={{
          background: "linear-gradient(135deg, var(--accent-indigo), var(--accent-cyan))",
          width: 64,
          height: 64,
          borderRadius: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          margin: "0 auto 1.5rem auto",
          boxShadow: "0 8px 24px rgba(99, 102, 241, 0.4)"
        }}>
          <User size={32} />
        </div>

        <h1 style={{ fontSize: "1.8rem", fontWeight: 800, textAlign: "center", marginBottom: "0.5rem" }}>
          Профиль исследователя
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", textAlign: "center", marginBottom: "2rem" }}>
          Учетная запись исследовательской системы CosmoDex
        </p>

        {/* Вывод ошибки, если что-то пошло не так */}
        {error && (
          <div style={{
            background: "rgba(239, 68, 68, 0.1)",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            color: "#f87171",
            padding: "0.75rem 1rem",
            borderRadius: 12,
            marginBottom: "1.5rem",
            fontSize: "0.9rem"
          }}>
            {error}
          </div>
        )}

        {/* Информационные карточки: Email и UID (требование задания) */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}>
          {/* Email */}
          <div style={{
            background: "rgba(255, 255, 255, 0.03)",
            border: "1px solid var(--border-color)",
            borderRadius: 14,
            padding: "1rem 1.25rem"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--text-secondary)", fontSize: "0.8rem", marginBottom: "0.25rem" }}>
              <Mail size={14} />
              <span>Электронная почта (Email)</span>
            </div>
            <div style={{ fontSize: "1rem", fontWeight: 600, color: "var(--text-primary)", wordBreak: "break-all" }}>
              {user?.email || "Email не указан"}
            </div>
          </div>

          {/* UID */}
          <div style={{
            background: "rgba(255, 255, 255, 0.03)",
            border: "1px solid var(--border-color)",
            borderRadius: 14,
            padding: "1rem 1.25rem"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--text-secondary)", fontSize: "0.8rem", marginBottom: "0.25rem" }}>
              <Fingerprint size={14} />
              <span>Уникальный ID пользователя (UID)</span>
            </div>
            <div style={{
              fontSize: "0.9rem",
              fontFamily: "monospace",
              color: "var(--accent-cyan)",
              wordBreak: "break-all",
              background: "rgba(6, 182, 212, 0.08)",
              padding: "0.35rem 0.6rem",
              borderRadius: 8,
              marginTop: "0.25rem"
            }}>
              {user?.uid}
            </div>
          </div>

          {/* Статус сессии */}
          <div style={{
            background: "rgba(255, 255, 255, 0.03)",
            border: "1px solid var(--border-color)",
            borderRadius: 14,
            padding: "1rem 1.25rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--text-secondary)", fontSize: "0.85rem" }}>
              <ShieldCheck size={16} color="var(--accent-cyan)" />
              <span>Статус авторизации</span>
            </div>
            <span style={{
              background: "rgba(16, 185, 129, 0.15)",
              color: "#34d399",
              padding: "0.25rem 0.75rem",
              borderRadius: 20,
              fontSize: "0.8rem",
              fontWeight: 600
            }}>
              Авторизован
            </span>
          </div>
        </div>

        {/* Кнопка Logout */}
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          style={{
            width: "100%",
            padding: "0.9rem",
            background: "rgba(239, 68, 68, 0.12)",
            color: "#f87171",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            borderRadius: 14,
            fontSize: "1rem",
            fontWeight: 600,
            cursor: isLoggingOut ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            transition: "all 0.2s ease"
          }}
        >
          <LogOut size={18} />
          {isLoggingOut ? "Выход из системы..." : "Выйти из аккаунта"}
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;