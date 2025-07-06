import React from "react";

type PageContainerProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
};

const PageContainer: React.FC<PageContainerProps> = ({
  title,
  description,
  children,
}) => {
  return (
    <div className="flex flex-col">
      <div className="mb-neo-lg mt-neo-lg">
        <h2 className="text-neo-heading text-neo-black mb-neo">{title}</h2>
        {description && (
          <p className="text-base text-neo-black">{description}</p>
        )}
      </div>
      {children}
    </div>
  );
};

export { PageContainer };
