import Link from "next/link";
import { Button } from "@/components/button";

export const NotFound = ({
  message,
  title,
}: {
  message: string;
  title: string;
}) => {
  return (
    <div className="text-center py-neo-2xl">
      <div className="mb-neo-lg">
        <div className="text-6xl mb-neo-md">🐱</div>
        <h3 className="text-neo-xl font-bold mb-neo-sm">{title}</h3>
        <p className="text-neo-gray-600 mb-neo-lg">{message}</p>
      </div>
      <Link href="/cats-gallery">
        <Button variant="primary">Browse Cats</Button>
      </Link>
    </div>
  );
};
