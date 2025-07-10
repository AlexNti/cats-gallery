import { getCatById, getFavouriteImages } from "@/app/_api";
import {
  ImageDetailsModal,
  ImageDetailsModalSkeleton,
} from "@/app/cats-gallery/_components/imageDetails";
import { getOrCreateUserId } from "@/app/user/_server.utils";
import { Error, ErrorAction } from "@/components/server.error";
import { redirect } from "next/navigation";
import { Suspense } from "react";

async function retryAction() {
  "use server";
  redirect("/cats-gallery");
}

export default async function ModalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Suspense fallback={<ImageDetailsModalSkeleton />}>
      <ImageDetailsLoader id={id} />
    </Suspense>
  );
}

async function ImageDetailsLoader({ id }: { id: string }) {
  const userId = await getOrCreateUserId();
  const imageDetailsResponse = await getCatById(id);
  const favouritedResponse = await getFavouriteImages({
    image_id: id,
    sub_id: userId,
    limit: 1,
  });
  if (imageDetailsResponse.error || favouritedResponse.error) {
    return (
      <Error title="CAT NOT FOUND" message="Please return to cats-gallery">
        <ErrorAction action={retryAction} label="Go back" />
      </Error>
    );
  }

  const favourite =
    favouritedResponse.data.length > 0 ? favouritedResponse.data[0] : null;

  return (
    <ImageDetailsModal
      image={imageDetailsResponse.data}
      favourite={favourite}
    />
  );
}
