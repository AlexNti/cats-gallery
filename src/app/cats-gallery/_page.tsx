/**
 * Reusable page component for default.tsx and page.tsx
 * Ensures both routes render identical content with a single source of truth.
 */

import { getCatsImagesList } from "@/app/_api";
import {
  ImagesList,
  ImageListSkeleton,
} from "@/app/cats-gallery/_components/imagesList";
import { redirect } from "next/navigation";

import { GET_CATS_IMAGES_LIST_LIMIT } from "@/app/cats-gallery/_constants";
import { Error, ErrorAction } from "@/components/server.error";
import { PageContainer } from "@/components/pageContainer";
import { Suspense } from "react";

async function retryAction() {
  "use server";
  redirect("/cats-gallery");
}

export default async function CatsGalleryPage() {
  return (
    <PageContainer
      title="CATS GALLERY"
      description="Discover amazing cats from all over the internet"
    >
      <Suspense fallback={<ImageListSkeleton />}>
        <CatsLoader />
      </Suspense>
    </PageContainer>
  );
}

async function CatsLoader() {
  const response = await getCatsImagesList({
    limit: GET_CATS_IMAGES_LIST_LIMIT,
    mime_types: "jpg,png",
  });

  if (response.error) {
    return (
      <Error
        title="MEOW! SOMETHING WENT WRONG"
        message={response.error.message}
      >
        <ErrorAction action={retryAction} label="Try again" />
      </Error>
    );
  }

  return <ImagesList cats={response.data} />;
}
