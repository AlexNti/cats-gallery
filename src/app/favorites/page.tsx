import { getFavouriteImages } from "@/app/_api";
import { redirect } from "next/navigation";
import { Error, ErrorAction } from "@/components/server.error";
import { PageContainer } from "@/components/pageContainer";
import { FavouritesList } from "@/app/favorites/_components/favouriteList";
import { GET_FAVOURITE_IMAGES_LIMIT } from "@/app/favorites/_constants";
import { cookies } from "next/headers";

async function retryAction() {
  "use server";
  redirect("/");
}

export default async function FavoritesPage() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("__user")?.value || "user";
  const response = await getFavouriteImages({
    limit: GET_FAVOURITE_IMAGES_LIMIT,
    sub_id: userId,
  });

  if (response.error) {
    return (
      <Error
        title="There was an error fetching your favorites"
        message={response.error.message}
      >
        <ErrorAction action={retryAction} label="Please try again" />
      </Error>
    );
  }

  return (
    <PageContainer title="Favorites" description="A list of your favorite cats">
      <FavouritesList favourites={response.data} />
    </PageContainer>
  );
}
