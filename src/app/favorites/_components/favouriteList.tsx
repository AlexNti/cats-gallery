"use client";

import { useFavourite } from "@/app/favorites/_hooks/useFavourite";
import { IconButton } from "@/components/iconButton";
import { Card } from "@/components/card";
import { CatFavorites } from "@/types";
import { useCallback, useState } from "react";
import { getFavouriteImages } from "@/app/_api";
import { GET_FAVOURITE_IMAGES_LIMIT } from "@/app/favorites/_constants";
import { useFetch } from "@/hooks/useFetch";
import { Alert } from "@/components/alert";
import { Button } from "@/components/button";
import { NotFound } from "@/components/notFound";
import { getUserId } from "@/app/user/_utils";

const Favorite = ({
  imageId,
  favouriteId,
}: {
  imageId: string;
  favouriteId: string;
}) => {
  const userId = getUserId();
  const { isFavourited, isLoading, debouncedToggleFavorite } = useFavourite({
    imageId,
    subId: userId,
    autoFetchOnMount: false,
    id: favouriteId,
  });

  return (
    <IconButton
      loading={isLoading}
      disabled={isLoading}
      icon="heart"
      onClick={debouncedToggleFavorite}
      aria-label={isFavourited ? "Unfavorite cat" : "Favorite cat"}
      variant="ghost"
      color={isFavourited ? "neo-pink" : "neo-gray-400"}
    />
  );
};

export const FavouritesList = ({
  favourites,
}: {
  favourites: CatFavorites[];
}) => {
  const userId = getUserId();
  const [cards, setCards] = useState<CatFavorites[]>(favourites);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(
    favourites.length >= GET_FAVOURITE_IMAGES_LIMIT
  );

  const memoGetCatsImageList = useCallback(
    () =>
      getFavouriteImages({
        page: page + 1,
        limit: GET_FAVOURITE_IMAGES_LIMIT,
        sub_id: userId,
      }),
    [page]
  );
  const { loading, execute, error } = useFetch(memoGetCatsImageList);

  const loadMore = async () => {
    const { data } = await execute();
    if (data) {
      const newItems = data.slice(0, GET_FAVOURITE_IMAGES_LIMIT);
      setCards([...cards, ...newItems]);
      setPage(page + 1);
      if (data.length < GET_FAVOURITE_IMAGES_LIMIT) {
        setHasMore(false);
      }
    }
  };

  if (cards.length === 0) {
    return (
      <NotFound
        title="No favorites yet"
        message="Start browsing cats and add some to your favorites!"
      />
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-neo-lg mb-neo-xl">
        {cards.map((favourite) => (
          /**
           * Because the cat api return randomly cats there is a change that the same cat will be returned again
           * for that reason we are adding the index to the key as duplicate cats will have the same id. Since this list is "static" (just adding new items,
           * no reordering, filtering, or searching)  using index in the key is fine.
           *
           */
          <Card.Root key={favourite.id}>
            <Card.Image
              src={favourite.image.url}
              alt={`Cat ${favourite.image.id}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover"
            />
            <Card.Content className="p-neo-lg">
              <Favorite
                imageId={favourite.image.id}
                favouriteId={favourite.id}
              />
            </Card.Content>
          </Card.Root>
        ))}
        {loading &&
          Array.from({ length: GET_FAVOURITE_IMAGES_LIMIT }).map((_, index) => (
            <CardItemSkeleton key={index} />
          ))}
      </div>

      {error && <Alert type="error" message={error} />}

      {hasMore && (
        <div className="text-center">
          <Button variant="primary" onClick={loadMore} disabled={loading}>
            {loading ? "Loading..." : "Load More Cats"}
          </Button>
        </div>
      )}
    </div>
  );
};

const CardItemSkeleton = () => {
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

export const CardListSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-neo-lg mb-neo-xl">
      {Array.from({ length: GET_FAVOURITE_IMAGES_LIMIT }).map((_, index) => (
        <CardItemSkeleton key={index} />
      ))}
    </div>
  );
};
