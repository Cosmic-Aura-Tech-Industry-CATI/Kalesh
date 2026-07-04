import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CMSService } from "../services/cms.service";

//======================================
// GET ALL PAGES
//======================================

export const useGetAllPages = () => {
  return useQuery({
    queryKey: ["cms-pages"],

    queryFn: () => CMSService.getAllPages(),
  });
};

//======================================
// GET PAGE BY CATEGORY
//======================================

export const useGetPageByCategory = (category) => {
  return useQuery({
    queryKey: ["cms-page", category],

    queryFn: () => CMSService.getPageByCategory(category),

    enabled: !!category,
  });
};

//======================================
// CREATE PAGE
//======================================

export const useCreatePage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => CMSService.createPage(payload),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["cms-pages"],
      });

      queryClient.invalidateQueries({
        queryKey: ["cms-page", variables.category],
      });
    },
  });
};

//======================================
// UPDATE PAGE
//======================================

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
    },
  });
};

//======================================
// DELETE PAGE
//======================================

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
