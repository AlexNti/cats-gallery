import { getCatsImagesList, getCatById } from "@/app/_api";
import CardList from "./_components/cardList";
import { redirect } from "next/navigation";
import { GET_CATS_IMAGES_LIST_LIMIT } from "@/app/(cat-list)/_constants";
import { Error, ErrorAction } from "@/components/server.error";
import { ImageDetailsModal } from "@/app/(cat-list)/_components/imageDetails";
import { PageContainer } from "@/components/pageContainer";

async function retryAction() {
  "use server";
  redirect("/");
}

type SearchParams = {
  [K in "id" | "page" | "limit" | "category"]?: string;
};

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { id } = await searchParams;

  return (
    <>
      <CatsLoader />
      {id && <CatLoader id={id} />}
    </>
  );
}

async function CatLoader({ id }: { id: string }) {
  const response = await getCatById(id);

  if (response.error) {
    return (
      <Error title="CAT NOT FOUND" message={response.error.message}>
        <ErrorAction action={retryAction} label="Go back" />
      </Error>
    );
  }

  return <ImageDetailsModal image={response.data} />;
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

  return (
    <PageContainer
      title="CAT GALLERY"
      description="Discover amazing cats from all over the internet"
    >
      <CardList cats={response.data} />
    </PageContainer>
  );
}
