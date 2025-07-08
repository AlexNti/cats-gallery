"use server";

import { http, buildUrl } from "@/utils/http";
import { Breed, CatFavourites, CatImage } from "@/types";
import { revalidateTag } from "next/cache";
import { cacheTags } from "./constants";

type CatImagesParams = {
  page?: number;
  limit?: number;
  mime_types?: string;
};

export const revalidateCache = async (cacheTag: string) => {
  revalidateTag(cacheTag);
};

export const getCatsImagesList = async (params?: CatImagesParams) => {
  const url = buildUrl(
    "/images/search",
    params as Record<string, string | number | boolean>
  );
  return http.get<CatImage[]>(url, { next: { revalidate: 600 } });
};

export const getCatById = async (id: string) => {
  const url = buildUrl("/images/" + id);
  return http.get<CatImage>(url, { cache: "force-cache" });
};

export type CatAddFavouritesParams = {
  sub_id: string;
  image_id: string;
};

export const addCatToFavourites = async (params: CatAddFavouritesParams) => {
  const url = buildUrl("/favourites");
  return http.post<{ id: string; message: "SUCCESS" }>(url, params);
};

export type CatDeleteFavouritesParams = {
  favourite_id: string;
  image_id: string;
  sub_id: string;
};

export const deleteCatFromFavourites = async (
  params: CatDeleteFavouritesParams
) => {
  const url = buildUrl(`/favourites/${params.favourite_id}`);
  return http.delete<{ message: "SUCCESS" }>(url);
};

type GetFavouriteImagesParams = {
  limit: number;
  page?: number;
  sub_id: string;
  image_id?: string;
  order?: "DESC" | "ASC";
};

export const getFavouriteImages = async (params: GetFavouriteImagesParams) => {
  const url = buildUrl("/favourites", params);
  const baseTag = `${cacheTags.favourites}-${params.sub_id}`;
  const tags = [`${baseTag}${params.image_id ? `-${params.image_id}` : ""}`];
  return http.get<CatFavourites[]>(url, {
    next: {
      tags,
      revalidate: 120,
    },
  });
};

type GetBreedsParams = {
  page?: number;
  limit: number;
};

export const getBreeds = async (params: GetBreedsParams) => {
  const url = buildUrl(`/breeds`, params);
  return http.get<Breed[]>(url, { cache: "force-cache" });
};

type GetImagesByBreedIdParams = {
  breed_id: string;
  limit?: number;
};

export const getImagesByBreedId = async (params: GetImagesByBreedIdParams) => {
  const url = buildUrl(`/images/search`, params);
  return http.get<CatImage[]>(url, { cache: "force-cache" });
};
