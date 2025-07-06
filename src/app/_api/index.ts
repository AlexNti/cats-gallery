import { http, buildUrl } from "@/utils/http";
import { Breed, CatFavorites, CatImage } from "@/types";

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

type GetBreedsParams = {
  page?: number;
  limit: number;
};

export const getBreeds = async (params: GetBreedsParams) => {
  const url = buildUrl(`/breeds`, params);
  return http.get<Breed[]>(url);
};

type GetImagesByBreedIdParams = {
  breed_id: string;
  limit?: number;
};

export const getImagesByBreedId = async (params: GetImagesByBreedIdParams) => {
  const url = buildUrl(`/images/search`, params);
  return http.get<CatImage[]>(url);
};
