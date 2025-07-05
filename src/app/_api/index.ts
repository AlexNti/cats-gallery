import { http, buildUrl } from "@/utils/http";
import { CatImage } from "@/types";

export interface CatImagesParams {
  page?: number;
  limit?: number;
  mime_types?: string;
}

export const getCatsImagesList = async (params?: CatImagesParams) => {
  const url = buildUrl(
    "/images/search",
    params as Record<string, string | number | boolean>
  );
  return http.get<CatImage[]>(url);
};
