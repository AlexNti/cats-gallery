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

    const { data, error } = await fetchPage(nextPage);

    if (error) {
      return { data: null, error, newData: null, page: nextPage };
    }

    const existingIds = new Set(items.map((item) => item.id));
    const uniqueData = data.filter((item) => !existingIds.has(item.id));

    /**
     * If uniqueData is empty it means that we have reach the end of the available data.
     * Since the pagination api does not provide total number of items, this is the way to know
     * that we have reached the end of the pagination.
     */
    if (uniqueData.length === 0) {
      setHasMore(false);
      return {
        data: items,
        error: null,
        newData: [],
        page: nextPage,
      };
    }

    setCurrentPage(nextPage);
    if (uniqueData.length < pageSize) {
      setHasMore(false);
    }

    const updatedItems = [...items, ...uniqueData];
    setItems(updatedItems);

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
