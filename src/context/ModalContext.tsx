import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ModalContextType {
  isBookDemoOpen: boolean;
  openBookDemo: () => void;
  closeBookDemo: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isBookDemoOpen, setIsBookDemoOpen] = useState(false);

  const openBookDemo = () => setIsBookDemoOpen(true);
  const closeBookDemo = () => setIsBookDemoOpen(false);

  return (
    <ModalContext.Provider value={{ isBookDemoOpen, openBookDemo, closeBookDemo }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}
