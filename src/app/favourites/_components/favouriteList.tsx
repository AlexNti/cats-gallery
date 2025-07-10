"use client";

import { IconButton } from "@/components/iconButton";
import { Card } from "@/components/card";
import { CatFavourites } from "@/types";
import {
  addCatToFavourites,
  CatAddFavouritesParams,
  CatDeleteFavouritesParams,
  deleteCatFromFavourites,
  getFavouriteImages,
} from "@/app/_api";
import {
  GET_FAVOURITE_IMAGES_LIMIT,
  GET_FAVOURITE_IMAGES_ORDER,
} from "@/app/favourites/_constants";
import { useFetch } from "@/hooks/useFetch";
import { Button } from "@/components/button";
import { NotFound } from "@/components/notFound";
import { getOrCreateUserId } from "@/app/user/_client.utils";
import { useAlert } from "@/components/alert";
import { motion, AnimatePresence } from "framer-motion";

import { revalidateCache } from "@/app/_api";
import { cacheTags } from "@/app/_api/constants";
import { useLoadMore } from "@/hooks/useLoadMore";
import { useActionState } from "react";

export const Favourite = ({
  imageId,
  favourite,
  onFavouriteRemoved,
}: {
  imageId: string;
  favourite: CatFavourites | null;
  onFavouriteRemoved?: () => void;
}) => {
  const { showError } = useAlert();
  const favouriteId = favourite?.id;
  const isFavourite = favouriteId !== undefined;
  const userId = getOrCreateUserId();

  const [state, formAction, isPending] = useActionState(
    async (
      state: { data: boolean; error: string | null },
      payload: CatAddFavouritesParams | CatDeleteFavouritesParams
    ) => {
      try {
        if (state.data && isFavourite && "favourite_id" in payload) {
          const res = await deleteCatFromFavourites(payload);

          if (res.error) {
            showError(res.error.message);
            return { data: state.data, error: res.error.message };
          }
          onFavouriteRemoved?.();
          return { data: false, error: null };
        }

        const res = await addCatToFavourites(payload);
        if (res.error) {
          showError(res.error.message);
          return { data: state.data, error: res.error.message };
        }

        return { data: true, error: null };
      } finally {
        revalidateCache(`${cacheTags.favourites}-${userId}-${imageId}`);
        revalidateCache(`${cacheTags.favourites}-${userId}`);
      }
    },

    { data: isFavourite, error: null }
  );

  return (
    <form>
      <IconButton
        formAction={() =>
          formAction({
            image_id: imageId,
            sub_id: userId,
            favourite_id: favouriteId,
          })
        }
        type="submit"
        loading={isPending}
        disabled={isPending}
        icon="heart"
        aria-label={state.data ? "Unfavourite cat" : "Favourite cat"}
        variant="ghost"
        color={state.data ? "neo-pink" : "neo-gray-400"}
      />
    </form>
  );
};

export const FavouritesList = ({
  favourites,
}: {
  favourites: CatFavourites[];
}) => {
  const { loading, execute } = useFetch(getFavouriteImages);
  const { showError } = useAlert();
  const userId = getOrCreateUserId();

  const {
    items: cards,
    hasMore,
    loadMore,
    setItems,
  } = useLoadMore({
    initialData: favourites,
    pageSize: GET_FAVOURITE_IMAGES_LIMIT,
  });

  const handleLoadMore = async () => {
    const { error } = await loadMore((page) =>
      execute({
        page,
        limit: GET_FAVOURITE_IMAGES_LIMIT,
        sub_id: userId,
        order: GET_FAVOURITE_IMAGES_ORDER,
      })
    );

    if (error) {
      return showError(error.message);
    }
  };

  if (cards.length === 0 && !hasMore) {
    return (
      <NotFound
        title="No favourites yet"
        message="Start browsing cats and add some to your favourites!"
      />
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-neo-lg mb-neo-xl">
        <AnimatePresence>
          {cards.map((favourite) => (
            <motion.div
              key={favourite.id}
              initial={{ opacity: 1, scale: 1 }}
              exit={{
                opacity: 0,
                scale: 0.8,
                y: -20,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
              layout
            >
              <Card.Root>
                <Card.Image
                  src={favourite.image.url}
                  alt={`Cat ${favourite.image.id}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover"
                />
                <Card.Content className="p-neo-lg flex justify-between items-center gap-neo-md">
                  <div className="flex-1 min-w-0">
                    <Card.Title className="font-bold truncate">
                      Cat #{favourite.image_id}
                    </Card.Title>
                  </div>

                  <Favourite
                    onFavouriteRemoved={() =>
                      setItems((prev) =>
                        prev.filter(
                          (item) => item.image.id !== favourite.image.id
                        )
                      )
                    }
                    imageId={favourite.image.id}
                    favourite={favourite}
                  />
                </Card.Content>
              </Card.Root>
            </motion.div>
          ))}
        </AnimatePresence>
        {loading &&
          Array.from({ length: GET_FAVOURITE_IMAGES_LIMIT }).map((_, index) => (
            <FavouriteCardSkeleton key={index} />
          ))}
      </div>

      {hasMore && (
        <div className="text-center">
          <Button variant="primary" onClick={handleLoadMore} disabled={loading}>
            {loading ? "Loading..." : "Load More Cats"}
          </Button>
        </div>
      )}
    </div>
  );
};

const FavouriteCardSkeleton = () => {
  return (
    <Card.Root className="animate-pulse">
      <div className="relative w-full h-48 overflow-hidden border-neo border-neo-black shadow-neo bg-neo-gray-300">
        <div className="w-full h-full bg-neo-gray-200"></div>
      </div>
      <Card.Content className="p-neo-lg">
        <div className="h-4 bg-neo-gray-200 rounded mb-1"></div>
        <div className="h-3 bg-neo-gray-200 rounded w-1/2"></div>
      </Card.Content>
    </Card.Root>
  );
};

export const FavouritesListSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-neo-lg mb-neo-xl">
      {Array.from({ length: GET_FAVOURITE_IMAGES_LIMIT }).map((_, index) => (
        <FavouriteCardSkeleton key={index} />
      ))}
    </div>
  );
};
