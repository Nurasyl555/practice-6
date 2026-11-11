import { api } from "./api";

// Экспортируем сервис для работы с API планет
export const planetService = {
  getPlanets: (params) => api.getPlanets(params),
  getPlanetById: (id) => api.getPlanetById(id),
  createPlanet: (data) => api.createPlanet(data),
  resetToDefaults: () => api.resetToDefaults(),
  // Метод для получения всех объектов (нужен для полной аналитики и метрик)
  getAllPlanets: async () => {
    const res = await api.getPlanets({ limit: 1000 });
    return res.data;
  }
};

export default planetService;
