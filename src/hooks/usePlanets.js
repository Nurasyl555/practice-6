import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { planetService } from "../services/service";

export const usePlanetsQuery = (params) => {
  return useQuery({
    queryKey: ["planets", params],
    queryFn: () => planetService.getPlanets(params),
    placeholderData: (previousData) => previousData
  });
};

export const usePlanetDetailQuery = (id) => {
  return useQuery({
    queryKey: ["planet", id],
    queryFn: () => planetService.getPlanetById(id),
    enabled: Boolean(id)
  });
};

export const useAllPlanetsQuery = () => {
  return useQuery({
    queryKey: ["planets", "all"],
    queryFn: () => planetService.getAllPlanets()
  });
};

export const useCreatePlanetMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({

    mutationFn: (newPlanetData) => planetService.createPlanet(newPlanetData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["planets"] });
    }
  });
};


export const useResetPlanetsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => planetService.resetToDefaults(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["planets"] });
    }
  });
};