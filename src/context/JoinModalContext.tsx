import React, { createContext, useContext, useState, ReactNode } from "react";
import { JoinCommunityDialog } from "@/components/JoinCommunityDialog";

interface JoinModalContextType {
  isOpen: boolean;
  openJoinModal: () => void;
  closeJoinModal: () => void;
  setIsOpen: (open: boolean) => void;
}

const JoinModalContext = createContext<JoinModalContextType>({
  isOpen: false,
  openJoinModal: () => {},
  closeJoinModal: () => {},
  setIsOpen: () => {},
});

export function useJoinModal() {
  return useContext(JoinModalContext);
}

export function JoinModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openJoinModal = () => setIsOpen(true);
  const closeJoinModal = () => setIsOpen(false);

  return (
    <JoinModalContext.Provider
      value={{
        isOpen,
        openJoinModal,
        closeJoinModal,
        setIsOpen,
      }}
    >
      {children}
      <JoinCommunityDialog open={isOpen} onOpenChange={setIsOpen} />
    </JoinModalContext.Provider>
  );
}
