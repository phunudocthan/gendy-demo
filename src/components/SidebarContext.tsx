"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface SidebarContextType {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  selectedCourse: string;
  setSelectedCourse: (course: string) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(
    "Tuổi dậy thì có đáng sợ?"
  );

  return (
    <SidebarContext.Provider
      value={{ sidebarOpen, setSidebarOpen, selectedCourse, setSelectedCourse }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}
