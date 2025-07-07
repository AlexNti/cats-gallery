import { useState, useCallback, useEffect } from "react";
import { useFetch } from "@/hooks/useFetch";
import { useDebounce } from "@/hooks/useDebounce";
import {
  getFavouriteImages,
  addCatToFavorites,
  deleteCatFromFavorites,
} from "@/app/_api";

type UseFavouriteOptions = {
  imageId: string;
  initialState?: boolean;
  autoFetchOnMount?: boolean;
  subId: string;
  id?: string | null;
};

export const useFavourite = ({
  imageId,
  id = null,
  autoFetchOnMount = true,
  subId,
}: UseFavouriteOptions) => {
  const [favouriteId, setFavouriteId] = useState<string | null>(id);
  const [isPerformingMutation, setIsPerformingMutation] = useState(false);

  const _getFavouriteImages = useCallback(() => {
    return getFavouriteImages({
      image_id: imageId,
      sub_id: subId,
      limit: 1,
    });
  }, [imageId, subId]);

  const { data: isFavoritedResponse, loading: isFavoritedLoading } = useFetch(
    _getFavouriteImages,
    {
      fetchOnMount: autoFetchOnMount,
    }
  );

  const isLoading = isFavoritedLoading || isPerformingMutation;

  useEffect(() => {
    if (isFavoritedResponse && isFavoritedResponse[0]?.id) {
      setFavouriteId(isFavoritedResponse[0].id);
    } else if (isFavoritedResponse && isFavoritedResponse.length === 0) {
      setFavouriteId(null);
    }
  }, [isFavoritedResponse]);

  const executeFavorite = useCallback(async () => {
    setIsPerformingMutation(true);
    try {
      if (favouriteId) {
        const res = await deleteCatFromFavorites({
          favourite_id: favouriteId,
        });

        if (res.data?.message === "SUCCESS") {
          setFavouriteId(null);
        }
        return {
          success: res.data?.message === "SUCCESS",
          error: null,
        };
      }

      const res = await addCatToFavorites({
        image_id: imageId,
        sub_id: subId,
      });

      if (res.data?.message === "SUCCESS") {
        setFavouriteId(res.data.id);
        return {
          success: res.data?.message === "SUCCESS",
          error: null,
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    } finally {
      setIsPerformingMutation(false);
    }
  }, [imageId, favouriteId, subId]);

  const debouncedToggleFavorite = useDebounce(executeFavorite, 300);

  return {
    favouriteId,
    isFavourited: !!favouriteId,
    isLoading,
    debouncedToggleFavorite,
  };
};
