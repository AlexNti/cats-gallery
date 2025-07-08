import { ApiSuccessOrError } from "@/types";
import { useState } from "react";

export function useLoadMore<T extends { id: string }>({
  initialData,
  initialPage = 0,
  pageSize,
}: {
  initialData: T[];
  initialPage?: number;
  pageSize: number;
}) {
  const [items, setItems] = useState<T[]>(initialData);

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [hasMore, setHasMore] = useState(initialData.length >= pageSize);

  const loadMore = async (
    fetchPage: (page: number) => Promise<ApiSuccessOrError<T[]>>
  ) => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);

    const { data, error } = await fetchPage(nextPage);

    if (error) {
      return { data: null, error, newData: null, page: nextPage };
    }

    const existingIds = new Set(items.map((item) => item.id));
    const uniqueData = data.filter((item) => !existingIds.has(item.id));

    if (uniqueData.length === 0) {
      setHasMore(false);
      return {
        data: items,
        error: null,
        newData: [],
        page: nextPage,
      };
    }

    const updatedItems = [...items, ...uniqueData];
    setItems(updatedItems);

    if (uniqueData.length < pageSize) {
      setHasMore(false);
    }

    return {
      data: updatedItems,
      error: null,
      newData: uniqueData,
      page: nextPage,
    };
  };

  return {
    items,
    hasMore,
    loadMore,
    setItems,
  };
}
