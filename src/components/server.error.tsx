"server-only";

import { Button } from "@/components/button";

type ErrorProps = {
  title?: string;
  message?: string;
  children?: React.ReactNode;
};

export const ErrorAction = ({
  action,
  label,
  variant = "primary",
}: {
  action: () => void;
  label: string;
  variant?: "primary" | "secondary";
}) => {
  return (
    <form action={action}>
      <Button type="submit" variant={variant} className="w-full">
        {label}
      </Button>
    </form>
  );
};

export const Error = ({ title, message, children }: ErrorProps) => {
  return (
    <div className="text-center py-neo-xl">
      <div className="card-neo bg-neo-red max-w-md mx-auto">
        <div className="mb-neo-lg">
          <div className="text-6xl mb-neo">😿</div>
          <h2 className="text-neo-heading mb-neo break-words whitespace-normal text-neo-black">
            {title}
          </h2>
        </div>

        <div className="text-base mb-neo-lg">
          <p className="mb-neo text-neo-black break-words whitespace-normal">
            {message}
          </p>
        </div>

        {children && <div className="space-y-neo">{children}</div>}
      </div>
    </div>
  );
};
