"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

const SidebarContext = createContext<null | {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  isExpanded: boolean;
  setIsExpanded: Dispatch<SetStateAction<boolean>>;
  isUserDropdownOpen: boolean;
  setIsUserDropdownOpen: Dispatch<SetStateAction<boolean>>;
}>(null);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isVisible, setIsVisible] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  return (
    <SidebarContext.Provider
      value={{
        isVisible,
        setIsVisible,
        isExpanded,
        setIsExpanded,
        isUserDropdownOpen,
        setIsUserDropdownOpen,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }

  return context;
}
