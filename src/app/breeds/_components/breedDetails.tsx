"use client";

import { Modal } from "@/components/modal";
import { CatImage } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const BreedDetailsModalSkeleton = () => {
  const router = useRouter();

  const onClose = () => {
    router.push("/breeds", { scroll: false });
  };

  return (
    <Modal.Root isOpen={true} onClose={onClose}>
      <Modal.Content>
        <Modal.Header>
          <div className="flex items-center gap-4 w-full">
            <div className="h-6 bg-neo-gray-200 rounded w-32 animate-pulse"></div>
            <Modal.Close onClick={onClose} />
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-neo-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-neo-lg justify-items-center">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="relative w-full h-48 overflow-hidden border-neo border-neo-black shadow-neo bg-neo-gray-200 animate-pulse"
                >
                  <div className="w-full h-full bg-neo-gray-300"></div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <div className="h-4 bg-neo-gray-200 rounded w-48 mx-auto animate-pulse"></div>
            </div>
          </div>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};

export const BreedDetailsModal = ({ images }: { images: CatImage[] }) => {
  const router = useRouter();

  const onClose = () => {
    router.push("/breeds", { scroll: false });
  };

  const breedName = images[0]?.breeds?.[0]?.name || "Breed Images";

  return (
    <Modal.Root isOpen={true} onClose={onClose}>
      <Modal.Content>
        <Modal.Header>
          <div className="flex items-center gap-4 w-full">
            <Modal.Title>{breedName}</Modal.Title>
            <Modal.Close onClick={onClose} />
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-neo-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-neo-lg justify-items-center">
              {images.map((image) => (
                <Link
                  href={{
                    pathname: `/cats-gallery/${image.id}`,
                  }}
                  key={image.id}
                  className="relative w-full h-48 overflow-hidden border-neo border-neo-black shadow-neo"
                >
                  <Image
                    src={image.url}
                    alt={image.breeds?.[0]?.name || `Cat ${image.id}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  />
                </Link>
              ))}
            </div>

            <div className="text-center">
              <p className="text-base text-neo-gray-500">
                Showing {images.length} image{images.length !== 1 ? "s" : ""}{" "}
                for this breed
              </p>
            </div>
          </div>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};
