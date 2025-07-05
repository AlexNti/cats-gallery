"use client";

import { CatImage } from "@/types";
import Image from "next/image";
import { useCallback, useState } from "react";
import { getCatsImagesList } from "@/app/_api";
import { Button } from "@/components/button";
import { useFetch } from "@/hooks/useFetch";
import { Alert } from "@/components/alert";
import { GET_CATS_IMAGES_LIST_LIMIT } from "@/app/(home)/_constants";

const CardItem = ({ cat }: { cat: CatImage }) => {
  return (
    <div className="card-neo">
      <div className="aspect-square overflow-hidden mb-neo relative">
        <Image
          src={cat.url}
          alt={`Cat ${cat.id}`}
          fill
          className="object-cover transition-opacity duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        />
      </div>
      <div className="text-neo-body text-neo-black">
        <p className="font-bold">Cat #{cat.id}</p>
      </div>
    </div>
  );
};

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
           * for that reason we are adding the index to the key. Since this list is "static" just adding new items,
           * no reordering, filtering, or searching  using index in the key is fine.
           *
           */
          <CardItem key={`${cat.id}-${index}`} cat={cat} />
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
    <div className="card-neo animate-pulse">
      <div className="aspect-square overflow-hidden mb-neo relative bg-neo-gray-300">
        <div className="w-full h-full bg-neo-gray-200"></div>
      </div>
      <div className="text-neo-body text-neo-black">
        <div className="h-4 bg-neo-gray-200 rounded mb-1"></div>
        <div className="h-3 bg-neo-gray-200 rounded w-1/2"></div>
      </div>
    </div>
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
