"use client";

import { CatImage } from "@/types";
import { useCallback, useState } from "react";
import { getCatsImagesList } from "@/app/_api";
import { Button } from "@/components/button";
import { useFetch } from "@/hooks/useFetch";
import { Alert } from "@/components/alert";
import { GET_CATS_IMAGES_LIST_LIMIT } from "@/app/(cat-list)/_constants";
import { Card } from "@/components/card";

export const CardList = ({ cats }: { cats: CatImage[] }) => {
  const [cards, setCards] = useState<CatImage[]>(cats);
  const [page, setPage] = useState(1);

  const memoGetCatsImageList = useCallback(
    () =>
      getCatsImagesList({
        page: page + 1, // To be honest it looks like the page prop is not used properly in the free version of the api
        limit: GET_CATS_IMAGES_LIST_LIMIT,
        mime_types: "jpg,png",
      }),
    [page]
  );
  const { loading, execute, error } = useFetch(memoGetCatsImageList);

  const loadMore = async () => {
    const { data } = await execute();
    if (data) {
      setCards([...cards, ...data]);
      setPage(page + 1);
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
              pathname: "/",
              query: { id: cat.id },
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
              <Card.Title className="font-bold">Cat #{cat.id}</Card.Title>
            </Card.Content>
          </Card.RootLink>
        ))}
        {loading &&
          Array.from({ length: GET_CATS_IMAGES_LIST_LIMIT }).map((_, index) => (
            <CardItemSkeleton key={index} />
          ))}
      </div>

      {error && <Alert type="error" message={error} />}

      <div className="text-center">
        <Button variant="primary" onClick={loadMore} disabled={loading}>
          {loading ? "Loading..." : "Load More Cats"}
        </Button>
      </div>
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
      {Array.from({ length: GET_CATS_IMAGES_LIST_LIMIT }).map((_, index) => (
        <CardItemSkeleton key={index} />
      ))}
    </div>
  );
};

export default CardList;
