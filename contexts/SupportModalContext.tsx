import React, { createContext, useState, useContext, ReactNode } from 'react';

interface SupportModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const SupportModalContext = createContext<SupportModalContextType | undefined>(undefined);

export const SupportModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <SupportModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </SupportModalContext.Provider>
  );
};

export const useSupportModal = () => {
  const context = useContext(SupportModalContext);
  if (context === undefined) {
    throw new Error('useSupportModal must be used within a SupportModalProvider');
  }
  return context;
};
