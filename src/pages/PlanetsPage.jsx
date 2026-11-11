import React, { useState, useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import {
  usePlanetsQuery,
  useCreatePlanetMutation,
  useResetPlanetsMutation
} from "../hooks/usePlanets";

import { FilterBar } from "../components/FilterBar";
import { PlanetCard } from "../components/PlanetCard";
import { Pagination } from "../components/Pagination";
import { StatusView } from "../components/StatusView";
import { AddPlanetModal } from "../components/AddPlanetModal";
import { Plus, RefreshCw, Sparkles } from "lucide-react";

export const PlanetsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const type = searchParams.get("type") || "ALL";
  const habitable = searchParams.get("habitable") || "ALL";
  const sortBy = searchParams.get("sortBy") || "name";
  const sortOrder = searchParams.get("sortOrder") || "asc";
  const page = parseInt(searchParams.get("page") || "1", 10);

  
  const queryParams = useMemo(() => ({
    search,
    type,
    habitable,
    sortBy,
    sortOrder,
    page,
    limit: 12
  }), [search, type, habitable, sortBy, sortOrder, page]);

  const {
    data: queryResult,
    isLoading,
    isError,
    error: queryError,
    refetch
  } = usePlanetsQuery(queryParams);


  const createPlanetMutation = useCreatePlanetMutation();
  const resetPlanetsMutation = useResetPlanetsMutation();


  const planets = queryResult?.data || [];
  const pagination = queryResult?.pagination || { total: 0, page: 1, totalPages: 1, limit: 12 };
  const errorMessage = isError ? (queryError?.message || "Ошибка загрузки данных из каталога") : null;

 
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [notification, setNotification] = useState(null);


  const updateFilterParam = useCallback((newParams) => {
    setSearchParams((prev) => {
      const updated = new URLSearchParams(prev);
      Object.entries(newParams).forEach(([key, val]) => {
        if (
          val === "" ||
          val === "ALL" ||
          (key === "page" && (val === 1 || val === "1")) ||
          (key === "sortBy" && val === "name") ||
          (key === "sortOrder" && val === "asc")
        ) {
          updated.delete(key);
        } else {
          updated.set(key, String(val));
        }
      });
      return updated;
    });
  }, [setSearchParams]);

  const handleSearchChange = (val) => updateFilterParam({ search: val, page: 1 });
  const handleTypeChange = (val) => updateFilterParam({ type: val, page: 1 });
  const handleHabitableChange = (val) => updateFilterParam({ habitable: val, page: 1 });
  const handleSortByChange = (val) => updateFilterParam({ sortBy: val, page: 1 });
  const handleSortOrderToggle = () =>
    updateFilterParam({ sortOrder: sortOrder === "asc" ? "desc" : "asc", page: 1 });
  const handlePageChange = (newPage) => updateFilterParam({ page: newPage });
  const handleResetFilters = () => setSearchParams({});

  
  const handleCreatePlanet = async (formData) => {
    try {
      const newRecord = await createPlanetMutation.mutateAsync(formData);
      setIsAddModalOpen(false);
      showNotification(`Планета «${newRecord.name}» успешно внесена в каталог!`);
      
    } catch (err) {
      alert(err.message || "Ошибка добавления планеты");
    }
  };

 
  const handleResetToDefaults = async () => {
    if (window.confirm("Восстановить исходные 105 экзопланет? Все добавленные записи будут удалены.")) {
      await resetPlanetsMutation.mutateAsync();
      handleResetFilters();
      showNotification("База данных восстановлена к начальным 105 планетам.");
    }
  };

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  return (
    <div className="planets-page-container" style={{ maxWidth: 1280, margin: "0 auto", padding: "1.5rem" }}>
      {/* Верхний заголовок и кнопки управления */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "1rem",
        marginBottom: "1.5rem"
      }}>
        <div>
          <h1 style={{ fontSize: "2rem", fontWeight: 800 }}>Каталог экзопланет</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
            Поиск, фильтрация по параметрам и спектральным классам (синхронизировано с URL)
          </p>
        </div>

        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <button
            className="btn btn-secondary"
            onClick={handleResetToDefaults}
            disabled={resetPlanetsMutation.isPending}
            title="Восстановить начальные 105 планет"
          >
            <RefreshCw size={15} /> Сбросить БД
          </button>
          <button
            className="btn btn-primary"
            onClick={() => setIsAddModalOpen(true)}
          >
            <Plus size={16} /> Добавить планету
          </button>
        </div>
      </div>

      {/* Уведомление об успешном действии */}
      {notification && (
        <div style={{
          background: "rgba(16, 185, 129, 0.15)",
          border: "1px solid var(--accent-emerald)",
          color: "var(--accent-emerald)",
          padding: "0.85rem 1.2rem",
          borderRadius: 12,
          marginBottom: "1.5rem",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem"
        }}>
          <Sparkles size={18} /> {notification}
        </div>
      )}

      {/* Панель фильтров, поиска и сортировки */}
      <FilterBar
        search={search}
        onSearchChange={handleSearchChange}
        type={type}
        onTypeChange={handleTypeChange}
        habitable={habitable}
        onHabitableChange={handleHabitableChange}
        sortBy={sortBy}
        onSortByChange={handleSortByChange}
        sortOrder={sortOrder}
        onSortOrderToggle={handleSortOrderToggle}
        onReset={handleResetFilters}
        totalResults={pagination.total}
      />

      {/* Обработка 4 состояний: Загрузка, Ошибка, Пусто, Сетка данных */}
      <div style={{ marginTop: "1.5rem" }}>
        {isLoading ? (
          <StatusView type="loading" />
        ) : errorMessage ? (
          <StatusView type="error" message={errorMessage} onRetry={() => refetch()} />
        ) : planets.length === 0 ? (
          <StatusView type="empty" onResetFilters={handleResetFilters} />
        ) : (
          <>
            <div className="planets-grid">
              {planets.map((planet) => (
                <PlanetCard key={planet.id} planet={planet} />
              ))}
            </div>

            {/* Пагинация */}
            <div style={{ marginTop: "2rem" }}>
              <Pagination
                currentPage={pagination.page}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </>
        )}
      </div>

      {/* Модальное окно создания планеты */}
      {isAddModalOpen && (
        <AddPlanetModal
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleCreatePlanet}
        />
      )}
    </div>
  );
};

export default PlanetsPage;