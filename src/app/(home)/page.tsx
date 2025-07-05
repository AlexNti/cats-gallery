import { getCatsImagesList } from "@/app/_api";
import CardList, { CardListSkeleton } from "./_components/cardList";
import { redirect } from "next/navigation";
import { GET_CATS_IMAGES_LIST_LIMIT } from "@/app/(home)/_constants";
import { Suspense } from "react";
import { Error, ErrorAction } from "@/components/server.error";

async function retryAction() {
  "use server";
  redirect("/");
}

export default async function Home() {
  return (
    <Suspense fallback={<CardListSkeleton />}>
      <CatsLoader />
    </Suspense>
  );
}

async function CatsLoader() {
  const cats = await getCatsImagesList({
    limit: GET_CATS_IMAGES_LIST_LIMIT,
    mime_types: "jpg,png",
  });

  if (cats.error) {
    return (
      <Error title="MEOW! SOMETHING WENT WRONG" message={cats.error.message}>
        <ErrorAction action={retryAction} label="Try again" />
      </Error>
    );
  }

  return (
    <div className="neo-brutal">
      <div className="mb-neo-xl">
        <h2 className="text-neo-heading text-neo-black mb-neo">CAT GALLERY</h2>
        <p className="text-neo-body text-neo-black">
          Discover amazing cats from all over the internet
        </p>
      </div>

      <CardList cats={cats.data} />
    </div>
  );
}
