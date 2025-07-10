"use client";

import { Button } from "@/components/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <div className="text-center py-neo-xl">
        <div className="card-neo bg-neo-red max-w-md mx-auto">
          <div className="mb-neo-lg">
            <div className="text-6xl mb-neo">😿</div>
            <h2 className="text-neo-heading mb-neo break-words whitespace-normal text-neo-black">
              Error while trying to load the page
            </h2>
          </div>

          <div className="text-base mb-neo-lg">
            <p className="mb-neo text-neo-black break-words whitespace-normal">
              {error.message || "Unknown error!"}
            </p>
          </div>

          <div className="space-y-neo">
            <Button variant="primary" onClick={() => reset()}>
              Try again
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
