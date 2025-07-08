import { getImagesByBreedId } from "@/app/_api";
import { Error, ErrorAction } from "@/components/server.error";
import { redirect } from "next/navigation";
import {
  BreedDetailsModal,
  BreedDetailsModalSkeleton,
} from "@/app/breeds/_components/breedDetails";
import { Suspense } from "react";

async function retryAction() {
  "use server";
  redirect("/breeds");
}

export default async function BreedsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Suspense fallback={<BreedDetailsModalSkeleton />}>
      <BreedImagesLoader id={id} />
    </Suspense>
  );
}

async function BreedImagesLoader({ id }: { id: string }) {
  const response = await getImagesByBreedId({ breed_id: id, limit: 10 });

  if (response.error) {
    return (
      <Error title="BREED IMAGES NOT FOUND" message={response.error.message}>
        <ErrorAction action={retryAction} label="Go back" />
      </Error>
    );
  }

  return <BreedDetailsModal images={response.data} />;
}
