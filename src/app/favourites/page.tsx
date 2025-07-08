import { getFavouriteImages } from "@/app/_api";
import { redirect } from "next/navigation";
import { Error, ErrorAction } from "@/components/server.error";
import { PageContainer } from "@/components/pageContainer";
import {
  FavouritesList,
  FavouritesListSkeleton,
} from "@/app/favourites/_components/favouriteList";
import {
  GET_FAVOURITE_IMAGES_LIMIT,
  GET_FAVOURITE_IMAGES_ORDER,
} from "@/app/favourites/_constants";
import { cookies } from "next/headers";
import { USER_ID_STORAGE_KEY } from "@/app/favourites/_constants";
import { Suspense } from "react";

async function retryAction() {
  "use server";
  redirect("/favourites");
}

export default async function FavouritesPage() {
  return (
    <PageContainer
      title="Favourites"
      description="A list of your favourite cats"
    >
      <Suspense fallback={<FavouritesListSkeleton />}>
        <FavouritesLoader />
      </Suspense>
    </PageContainer>
  );
}

async function FavouritesLoader() {
  const cookieStore = await cookies();
  const userId = cookieStore.get(USER_ID_STORAGE_KEY)?.value || "user";
  const response = await getFavouriteImages({
    limit: GET_FAVOURITE_IMAGES_LIMIT,
    sub_id: userId,
    order: GET_FAVOURITE_IMAGES_ORDER,
  });

  if (response.error) {
    return (
      <Error
        title="There was an error fetching your favourites"
        message={response.error.message}
      >
        <ErrorAction action={retryAction} label="Please try again" />
      </Error>
    );
  }
  return <FavouritesList favourites={response.data} />;
}
