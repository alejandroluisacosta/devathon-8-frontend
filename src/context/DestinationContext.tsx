import React, { createContext, useState, useContext, ReactNode } from 'react';

interface DestinationContextType {
  destination: string;
  setDestination: React.Dispatch<React.SetStateAction<string>>;
}

interface DestinationProviderProps {
    children: ReactNode;
  }

const DestinationContext = createContext<DestinationContextType | null>(null);

export const useDestination = () => {
  const context = useContext(DestinationContext);
  if (!context) {
    throw new Error('useDestination must be used within a DestinationProvider');
  }
  return context;
};

export const DestinationProvider = ({ children }: DestinationProviderProps) => {
  const [destination, setDestination] = useState<string>('');

  return (
    <DestinationContext.Provider value={{ destination, setDestination }}>
      {children}
    </DestinationContext.Provider>
  );
};
