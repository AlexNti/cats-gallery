"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { IconButton } from "./iconButton";

type ModalRootProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const ModalRoot: React.FC<ModalRootProps> = ({ isOpen, onClose, children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-neo-lg">
      <div
        className="absolute inset-0 bg-black/30"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {children}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

type ModalContentProps = {
  children: React.ReactNode;
};

const ModalContent = ({ children }: ModalContentProps) => {
  return (
    <div
      className="relative bg-neo-white border-neo border-neo-black shadow-neo-lg p-neo-xl w-full"
      role="dialog"
      aria-modal="true"
    >
      {children}
    </div>
  );
};

type ModalHeaderProps = {
  children: React.ReactNode;
};

const ModalHeader = ({ children }: ModalHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-neo-lg">
      {children}
    </div>
  );
};

type ModalTitleProps = {
  children: React.ReactNode;
};

const ModalTitle = ({ children }: ModalTitleProps) => {
  return <h2 className="text-neo-heading text-neo-black">{children}</h2>;
};

type ModalBodyProps = {
  children: React.ReactNode;
};

const ModalBody = ({ children }: ModalBodyProps) => {
  return <div className="text-neo-body text-neo-black">{children}</div>;
};

type ModalCloseProps = {
  onClick: () => void;
};

const ModalClose = ({ onClick }: ModalCloseProps) => {
  return (
    <IconButton
      icon="close"
      onClick={onClick}
      aria-label="Close modal"
      className="ml-auto text-neo-pink"
    />
  );
};

export const Modal = {
  Root: ModalRoot,
  Content: ModalContent,
  Header: ModalHeader,
  Title: ModalTitle,
  Body: ModalBody,
  Close: ModalClose,
};
