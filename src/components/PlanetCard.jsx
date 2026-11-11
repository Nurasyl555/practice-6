import React from "react";
import { Link } from "react-router-dom";
import { Thermometer, Orbit, Telescope, Sparkles, ArrowRight } from "lucide-react";

const typeColors = {
  "Terrestrial": "badge-terrestrial",
  "Super-Earth": "badge-super-earth",
  "Gas Giant": "badge-gas-giant",
  "Neptune-like": "badge-neptune"
};

export const PlanetCard = ({ planet }) => {
  const badgeClass = typeColors[planet.type] || "badge-default";
  const tempCelsius = Math.round(planet.surfaceTempKelvin - 273.15);

  return (
    <article className="planet-card">
      <div className="card-header">
        <span className={`badge ${badgeClass}`}>{planet.type}</span>
        {planet.habitable ? (
          <span className="badge badge-habitable" title="Находится в обитаемой зоне">
            <Sparkles size={12} /> Зона жизни
          </span>
        ) : (
          <span className="badge badge-hostile" title="Экстремальные условия">
            Необитаема
          </span>
        )}
      </div>

      <div className="card-body">
        <h3 className="planet-name">{planet.name}</h3>
        <p className="star-name">
          <Orbit size={14} className="icon-inline" /> Звезда: <strong>{planet.hostStar}</strong>
        </p>

        <div className="card-stats">
          <div className="stat-item">
            <span className="stat-label">Расстояние</span>
            <span className="stat-value">{planet.distanceLightYears} св. лет</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Температура</span>
            <span className="stat-value">
              <Thermometer size={13} className="icon-inline" /> {tempCelsius}°C
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Масса</span>
            <span className="stat-value">{planet.massEarths} M⊕</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Год открытия</span>
            <span className="stat-value">{planet.discoveryYear}</span>
          </div>
        </div>

        <p className="card-description">{planet.description}</p>
      </div>

      <div className="card-footer">
        <div className="mission-tag">
          <Telescope size={13} className="icon-inline" />
          <span>{planet.mission.split(" ")[0]}</span>
        </div>

        {/* Переход на отдельную детальную страницу через React Router Link */}
        <Link
          to={`/planets/${planet.id}`}
          className="btn-details"
          style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.3rem" }}
        >
          Подробнее <ArrowRight size={14} />
        </Link>
      </div>
    </article>
  );
};

export default PlanetCard;
