import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";

import LegalPageService from "../services/LegalPageService";

const QUERY_KEY = ["legal-pages"];

//
// GET ALL
//

export const useGetLegalPages = () => {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: LegalPageService.getAllPages,
  });
};

//
// GET SINGLE
//

export const useGetLegalPage = (slug) => {
  return useQuery({
    queryKey: [...QUERY_KEY, slug],
    queryFn: () => LegalPageService.getPage(slug),
    enabled: !!slug,
  });
};

//
// CREATE
//

export const useCreateLegalPage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: LegalPageService.createPage,

    onSuccess: (data) => {
      toast.success(data.message || "Page created successfully");

      queryClient.invalidateQueries({
        queryKey: QUERY_KEY,
      });
    },

    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to create page");
    },
  });
};

//
// UPDATE
//

export const useUpdateLegalPage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: LegalPageService.updatePage,

    onSuccess: (data) => {
      toast.success(data.message || "Page updated successfully");

      queryClient.invalidateQueries({
        queryKey: QUERY_KEY,
      });
    },

    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to update page");
    },
  });
};

//
// DELETE
//

export const useDeleteLegalPage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: LegalPageService.deletePage,

    onSuccess: (data) => {
      toast.success(data.message || "Page deleted");

      queryClient.invalidateQueries({
        queryKey: QUERY_KEY,
      });
    },

    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to delete page");
    },
  });
};
