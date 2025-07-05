import { http, buildUrl } from "@/utils/http";
import { CatFavorites, CatImage } from "@/types";

type CatImagesParams = {
  page?: number;
  limit?: number;
  mime_types?: string;
};

export const getCatsImagesList = async (params?: CatImagesParams) => {
  const url = buildUrl(
    "/images/search",
    params as Record<string, string | number | boolean>
  );
  return http.get<CatImage[]>(url);
};

export const getCatById = async (id: string) => {
  const url = buildUrl("/images/" + id);
  return http.get<CatImage>(url);
};

type CatAddFavoritesParams = {
  sub_id: string;
  image_id: string;
};

export const addCatToFavorites = async (params: CatAddFavoritesParams) => {
  const url = buildUrl("/favourites");
  return http.post<{ id: string; message: "SUCCESS" }>(url, params);
};

type CatDeleteFavoritesParams = {
  favourite_id: string;
};

export const deleteCatFromFavorites = async (
  params: CatDeleteFavoritesParams
) => {
  const url = buildUrl(`/favourites/${params.favourite_id}`);
  return http.delete<{ message: "SUCCESS" }>(url);
};

type CatFavoritesCheckParams = {
  limit: number;
  page?: number;
  sub_id: string;
  image_id: string;
};

export const getIsCatFavorited = async (params: CatFavoritesCheckParams) => {
  const url = buildUrl("/favourites", params);
  return http.get<CatFavorites[]>(url);
};
