"use client";

import React, {
  createContext,
  useState,
  useContext,
  type ReactNode,
  type FC,
} from "react";

interface DragContextProps {
  dragData: string | null;
  setDragItem: (data: string | null) => void;
}

const DragContext = createContext<DragContextProps | undefined>(undefined);

interface DragProviderProps {
  children: ReactNode;
}

const DragProvider: FC<DragProviderProps> = ({ children }) => {
  const [dragData, setDragData] = useState<string | null>(null);

  const setDragItem = (data: string | null) => {
    setDragData(data);
  };

  return (
    <DragContext.Provider value={{ dragData, setDragItem }}>
      {children}
    </DragContext.Provider>
  );
};

const useDragContext = () => {
  const context = useContext(DragContext);
  if (context === undefined) {
    throw new Error("useDragContext must be used within a DragProvider");
  }
  return context;
};

export { DragProvider, useDragContext };
