import { getBreeds } from "@/app/_api";
import { Error, ErrorAction } from "@/components/server.error";
import { redirect } from "next/navigation";
import { PageContainer } from "@/components/pageContainer";
import { Suspense } from "react";
import {
  BreedsList,
  BreedsListSkeleton,
} from "@/app/breeds/_components/breedsList";
import { GET_BREEDS_LIMIT } from "@/app/breeds/_constants";

async function retryAction() {
  "use server";
  redirect("/breeds");
}

export default async function BreedsPage() {
  return (
    <PageContainer
      title="CAT BREEDS"
      description="Discover all the amazing cat breeds from around the world"
    >
      <Suspense fallback={<BreedsListSkeleton />}>
        <BreedLoader />
      </Suspense>
    </PageContainer>
  );
}

async function BreedLoader() {
  const breeds = await getBreeds({ limit: GET_BREEDS_LIMIT });

  if (breeds.error) {
    return (
      <Error title="MEOW! SOMETHING WENT WRONG" message={breeds.error.message}>
        <ErrorAction action={retryAction} label="Try again" />
      </Error>
    );
  }

  return (
    <>
      <BreedsList breeds={breeds.data} />

      <div className="mt-neo-xl text-center">
        <p className="text-base text-neo-gray-500">
          Found {breeds.data.length} amazing cat breeds
        </p>
      </div>
    </>
  );
}
