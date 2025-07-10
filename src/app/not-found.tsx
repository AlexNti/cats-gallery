import { Button } from "@/components/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center py-neo-xl">
      <div className="card-neo bg-neo-red max-w-md mx-auto">
        <div className="mb-neo-lg">
          <div className="text-6xl mb-neo">😿</div>
          <h2 className="text-neo-heading mb-neo break-words whitespace-normal text-neo-black">
            Page not found.
          </h2>
        </div>

        <div className="space-y-neo">
          <Link href="/cats-gallery">
            <Button variant="primary">Return to cats gallery</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
