import { getBreeds, getImagesByBreedId } from "@/app/_api";
import { Error, ErrorAction } from "@/components/server.error";
import { redirect } from "next/navigation";
import { BreedDetailsModal } from "./_components/breedDetails";
import { Card } from "@/components/card";
import { PageContainer } from "@/components/pageContainer";

async function retryAction() {
  "use server";
  redirect("/breeds");
}

type SearchParams = {
  [K in "id" | "name" | "limit" | "category"]?: string;
};

export default async function BreedsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { id } = await searchParams;

  return (
    <>
      <BreedLoader />
      {id && <BreedImagesLoader id={id} />}
    </>
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

async function BreedLoader() {
  const breeds = await getBreeds({ limit: 100 });

  if (breeds.error) {
    return (
      <Error title="MEOW! SOMETHING WENT WRONG" message={breeds.error.message}>
        <ErrorAction action={retryAction} label="Try again" />
      </Error>
    );
  }

  return (
    <PageContainer
      title="CAT BREEDS"
      description="Discover all the amazing cat breeds from around the world"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-neo-lg">
        {breeds.data.map((breed) => {
          return (
            <Card.RootLink
              key={breed.id}
              href={{
                pathname: "/breeds",
                query: {
                  id: breed.id.toString(),
                  name: breed.name.toString(),
                },
              }}
              scroll={false}
              className="group"
            >
              <Card.Content className="text-center p-neo-lg">
                <Card.Title className="mb-neo-sm group-hover:text-neo-pink transition-colors duration-200">
                  {breed.name}
                </Card.Title>
                {breed.origin && (
                  <Card.Body>
                    <p className="text-sm text-neo-gray-600 uppercase tracking-wide">
                      {breed.origin}
                    </p>
                  </Card.Body>
                )}
              </Card.Content>
            </Card.RootLink>
          );
        })}
      </div>

      <div className="mt-neo-xl text-center">
        <p className="text-base text-neo-gray-500">
          Found {breeds.data.length} amazing cat breeds
        </p>
      </div>
    </PageContainer>
  );
}
