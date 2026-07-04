import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CMSService } from "../services/cms.service";

/* ==========================================
   GET ALL PAGES
========================================== */

export const useGetAllPages = (params = {}) => {
  return useQuery({
    queryKey: ["cms-pages", params],

    queryFn: () => CMSService.getAllPages(params),

    staleTime: 1000 * 60 * 5,
  });
};

/* ==========================================
   GET PAGE BY CATEGORY
========================================== */

export const useGetPageByCategory = (category) => {
  return useQuery({
    queryKey: ["cms-page", category],

    queryFn: () => CMSService.getPageByCategory(category),

    enabled: !!category,
  });
};

/* ==========================================
   GET PAGE BY ID
========================================== */

export const useGetPageById = (id) => {
  return useQuery({
    queryKey: ["cms-page-id", id],

    queryFn: () => CMSService.getPageById(id),

    enabled: !!id,
  });
};

/* ==========================================
   CREATE PAGE
========================================== */

export const useCreatePage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => CMSService.createPage(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cms-pages"],
      });
    },
  });
};

/* ==========================================
   UPDATE PAGE
========================================== */

export const useUpdatePage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => CMSService.updatePage(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["cms-pages"],
      });

      queryClient.invalidateQueries({
        queryKey: ["cms-page", variables.data.category],
      });

      queryClient.invalidateQueries({
        queryKey: ["cms-page-id", variables.id],
      });
    },
  });
};

/* ==========================================
   DELETE PAGE
========================================== */

export const useDeletePage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => CMSService.deletePage(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cms-pages"],
      });
    },
  });
};
