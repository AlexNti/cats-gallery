"use client";

import { Modal } from "@/components/modal";
import { CatImage, Breed, CatFavourites } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { StarRating } from "@/components/starsRating";
import Link from "next/link";
import { Card } from "@/components/card";
import { Favourite } from "@/app/favourites/_components/favouriteList";

const BreedCard = ({ breed }: { breed: Breed }) => {
  const physicalTraits = [
    { key: "weight", label: "Weight", value: `${breed.weight.metric}kg` },
    { key: "life_span", label: "Life Span", value: `${breed.life_span}y` },
    { key: "origin", label: "Origin", value: breed.origin },
  ];

  const personalityHealth = [
    {
      key: "child_friendly",
      label: "Child Friendly",
      value: breed.child_friendly,
      isRating: true,
    },
    {
      key: "health_issues",
      label: "Health Issues",
      value: breed.health_issues,
      isRating: true,
    },
    {
      key: "energy_level",
      label: "Energy Level",
      value: breed.energy_level,
      isRating: true,
    },
    {
      key: "intelligence",
      label: "Intelligence",
      value: breed.intelligence,
      isRating: true,
    },
  ];

  return (
    <Card.Root className="mb-neo-lg p-0">
      <Card.Content className="p-0">
        <div className="bg-neo-blue text-neo-white p-neo-lg border-b-2 border-neo-black">
          <Link href={`/breeds/${breed.id}`}>
            <h4 className="text-neo-heading underline">{breed.name}</h4>
          </Link>
        </div>

        <div className="p-neo-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-neo-xl">
            <div className="space-y-neo">
              <h5 className="text-base font-bold text-neo-black uppercase tracking-wide border-b border-neo-black pb-neo">
                Physical Traits
              </h5>
              <div className="space-y-neo-sm">
                {physicalTraits.map((item) => (
                  <div
                    key={item.key}
                    className="flex justify-between items-center py-neo-sm border-b border-neo-gray-200 last:border-b-0"
                  >
                    <span className="text-sm text-neo-gray-600 font-bold uppercase tracking-wide">
                      {item.label}:
                    </span>
                    <span className="text-base text-neo-black font-medium">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-neo">
              <h5 className="text-base font-bold text-neo-black uppercase tracking-wide border-b border-neo-black pb-neo">
                Personality & Health
              </h5>
              <div className="space-y-neo-sm">
                {personalityHealth.map((item) => (
                  <div
                    key={item.key}
                    className="flex justify-between items-center py-neo-sm border-b border-neo-gray-200 last:border-b-0"
                  >
                    <span className="text-sm text-neo-gray-600 font-bold uppercase tracking-wide">
                      {item.label}:
                    </span>
                    <span className="text-base text-neo-black font-medium">
                      {item.isRating ? (
                        <StarRating value={item.value} />
                      ) : (
                        item.value
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card.Content>
    </Card.Root>
  );
};

export const ImageDetailsModalSkeleton = () => {
  const router = useRouter();

  const onClose = () => {
    router.push("/", { scroll: false });
  };

  return (
    <Modal.Root isOpen={true} onClose={onClose}>
      <Modal.Content>
        <Modal.Header>
          <div className="flex items-center gap-4 w-full">
            <div className="w-8 h-8 bg-neo-gray-200 rounded animate-pulse"></div>
            <div className="h-6 bg-neo-gray-200 rounded w-24 animate-pulse"></div>
            <Modal.Close onClick={onClose} />
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-neo-lg">
            <div className="relative w-full h-80 mb-neo-lg">
              <div className="w-full h-full bg-neo-gray-200 animate-pulse border-neo border-neo-black shadow-neo"></div>
            </div>

            <div>
              <div className="h-6 bg-neo-gray-200 rounded w-48 mb-neo-lg animate-pulse"></div>
            </div>
          </div>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};

export const ImageDetailsModal = ({
  image,
  favourite,
}: {
  image: CatImage;
  favourite: CatFavourites | null;
}) => {
  const router = useRouter();

  const onClose = () => {
    router.push("/", { scroll: false });
  };

  return (
    <Modal.Root isOpen={true} onClose={onClose}>
      <Modal.Content>
        <Modal.Header>
          <div className="flex items-center gap-4 w-full">
            <Favourite imageId={image.id} favourite={favourite} />
            <Modal.Title>Cat #{image.id}</Modal.Title>
            <Modal.Close onClick={onClose} />
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-neo-lg">
            <div className="relative w-full h-80 mb-neo-lg">
              <Image
                src={image.url}
                alt={`Cat ${image.id}`}
                fill
                className="object-contain border-neo border-neo-black shadow-neo"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />
            </div>

            {image.breeds && image.breeds.length > 0 ? (
              <div>
                <h3 className="text-neo-heading text-neo-black mb-neo-lg border-b-2 border-neo-black pb-neo">
                  Breed Information
                </h3>
                {image.breeds.map((breed) => (
                  <BreedCard key={breed.id} breed={breed} />
                ))}
              </div>
            ) : (
              <div className="text-center py-neo-xl">
                <p className="text-base text-neo-gray-500">
                  No breed information available for this cat
                </p>
              </div>
            )}
          </div>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};
