import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { WallpaperService } from "../services/wallpapers.service";
import { toastError, toastSuccess } from "../lib/toast";

/**
 * A hook that fetches all wallpapers from the API.
 * @returns {UseQueryResult} - The result of the useQuery hook.
 */
export const useGetAllWallpapers = () => {
  return useQuery({
    queryKey: ["wallpaper"],
    queryFn: WallpaperService.getAllWallpapers,
  });
};

/**
 * A hook that wraps the useMutation hook from react-query.
 * It is used to create a new wallpaper.
 * After a successful creation, it sets a success toast message and invalidates the cache for the wallpapers query.
 * If the creation fails, it sets an error toast message.
 *
 * @returns {UseMutationResult} - The result of the useMutation hook.
 */
export const useCreateWallpaper = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (payload) => WallpaperService.createWallpaper(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["wallpaper"],
      });
      toastSuccess("Wallpaper created successfully");
    },
    onError: (err) => {
      toastError(err?.response?.data?.message || "Failed to create wallpaper");
      console.error(err);
    },
  });
};

/**
 * A hook that wraps the useMutation hook from react-query.
 * It is used to update an existing wallpaper.
 *
 * @returns {UseMutationResult} - The result of the useMutation hook.
 */
export const useUpdateWallpaper = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, payload }) => WallpaperService.updateWallpaper(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["wallpaper"],
      });
      toastSuccess("Wallpaper updated successfully");
    },
    onError: (err) => {
      toastError(err?.response?.data?.message || "Failed to update wallpaper");
      console.error(err);
    },
  });
};

/**
 * A hook that deletes a wallpaper by its id from the API.
 * When the mutation is successful, it shows a success toast and invalidates the query cache.
 * When the mutation fails, it shows an error toast.
 */
export const useDeleteWallpaper = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id) => WallpaperService.deleteWallpaper(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["wallpaper"],
      });
      toastSuccess("Wallpaper deleted successfully");
    },
    onError: (err) => {
      toastError(err?.response?.data?.message || "Failed to delete wallpaper");
      console.error(err);
    },
  });
};

/**
 * A hook that wraps the useMutation hook from react-query.
 * It is used to update the price of a wallpaper.
 *
 * @returns {UseMutationResult} - The result of the useMutation hook.
 */
export const useUpdateWallpaperPrice = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, payload }) => WallpaperService.updatePrice(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["wallpaper"],
      });
      toastSuccess("Wallpaper price updated successfully");
    },
    onError: (err) => {
      toastError(err?.response?.data?.message || "Failed to update wallpaper price");
      console.error(err);
    },
  });
};

/**
 * A hook that wraps the useMutation hook from react-query.
 * It is used to set a specific wallpaper as the default.
 *
 * @returns {UseMutationResult} - The result of the useMutation hook.
 */
export const useSetDefaultWallpaper = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id) => WallpaperService.setDefault(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["wallpaper"],
      });
      toastSuccess("Default wallpaper set successfully");
    },
    onError: (err) => {
      toastError(err?.response?.data?.message || "Failed to set default wallpaper");
      console.error(err);
    },
  });
};