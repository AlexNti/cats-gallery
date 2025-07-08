import { Card } from "@/components/card";
import { Breed } from "@/types";

const BreedCardSkeleton = () => {
  return (
    <Card.Root>
      <Card.Content className="text-center p-neo-lg">
        <Card.Title className="mb-neo-sm">
          <div className="h-6 bg-neo-gray-200 rounded"></div>
        </Card.Title>
        <Card.Body>
          <p className="h-4 bg-neo-gray-200 rounded w-2/3 mx-auto mt-neo-xl"></p>
        </Card.Body>
      </Card.Content>
    </Card.Root>
  );
};

export const BreedsListSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-neo-lg">
      {Array.from({ length: 30 }).map((_, index) => (
        <BreedCardSkeleton key={index} />
      ))}
    </div>
  );
};

export const BreedsList = ({ breeds }: { breeds: Breed[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-neo-lg">
      {breeds.map((breed) => {
        return (
          <Card.RootLink
            key={breed.id}
            href={{
              pathname: `/breeds/${breed.id}`,
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
  );
};
