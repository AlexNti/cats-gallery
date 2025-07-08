"use client";

import { CatImage } from "@/types";
import { getCatsImagesList } from "@/app/_api";
import { Button } from "@/components/button";
import { useFetch } from "@/hooks/useFetch";
import { useAlert } from "@/components/alert";
import {
  GET_CATS_IMAGES_LIST_LIMIT,
  GET_CATS_IMAGES_MIME_TYPES,
} from "@/app/cats-gallery/_constants";
import { Card } from "@/components/card";
import { useLoadMore } from "@/hooks/useLoadMore";

export const ImagesList = ({ cats }: { cats: CatImage[] }) => {
  const { items: cards, loadMore } = useLoadMore({
    initialData: cats,
    pageSize: GET_CATS_IMAGES_LIST_LIMIT,
  });
  const { showError } = useAlert();
  const { loading, execute } = useFetch(getCatsImagesList);

  const handleLoadMore = async () => {
    const { error } = await loadMore((page) =>
      execute({
        page,
        limit: GET_CATS_IMAGES_LIST_LIMIT,
        mime_types: GET_CATS_IMAGES_MIME_TYPES,
      })
    );

    if (error) {
      return showError(error.message);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-neo-lg mb-neo-xl">
        {cards.map((cat, index) => (
          /**
           * Because the cat api return randomly cats there is a change that the same cat will be returned again
           * for that reason we are adding the index to the key as duplicate cats will have the same id. Since this list is "static" (just adding new items,
           * no reordering, filtering, or searching)  using index in the key is fine.
           *
           */
          <Card.RootLink
            href={{
              pathname: `/cats-gallery/${cat.id}`,
            }}
            key={`${cat.id}-${index}`}
          >
            <Card.Image
              src={cat.url}
              alt={`Cat ${cat.id}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover"
            />
            <Card.Content className="p-neo-lg">
              <Card.Title className="font-bold truncate">
                Cat #{cat.id}
              </Card.Title>
            </Card.Content>
          </Card.RootLink>
        ))}
        {loading &&
          Array.from({ length: GET_CATS_IMAGES_LIST_LIMIT }).map((_, index) => (
            <ImageItemSkeleton key={index} />
          ))}
      </div>

      <div className="text-center">
        <Button variant="primary" onClick={handleLoadMore} disabled={loading}>
          {loading ? "Loading..." : "Load More Cats"}
        </Button>
      </div>
    </div>
  );
};

const ImageItemSkeleton = () => {
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

export const ImageListSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-neo-lg mb-neo-xl">
      {Array.from({ length: GET_CATS_IMAGES_LIST_LIMIT }).map((_, index) => (
        <ImageItemSkeleton key={index} />
      ))}
    </div>
  );
};
