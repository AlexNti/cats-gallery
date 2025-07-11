"use server";

import { deleteCatFromFavourites, addCatToFavourites } from "@/app/_api";

export const toggleCatFavourite = async ({
  isFavourite,
  favouriteId,
  imageId,
  userId,
}: {
  imageId: string;
  userId: string;
  isFavourite: boolean;
  favouriteId: string | undefined;
}) => {
  if (isFavourite && favouriteId) {
    const res = await deleteCatFromFavourites({
      image_id: imageId,
      sub_id: userId,
      favourite_id: favouriteId,
    });
    if (res.error) {
      return { isFavourite, error: res.error.message, favouriteId };
    }

    return { isFavourite: false, error: null, favouriteId: undefined };
  }

  const res = await addCatToFavourites({
    image_id: imageId,
    sub_id: userId,
  });

  if (res.error) {
    return {
      isFavourite,
      error: res.error.message,
      favouriteId: undefined,
    };
  }

  return { isFavourite: true, error: null, favouriteId: res.data?.id };
};
