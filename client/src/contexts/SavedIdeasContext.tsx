import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { Idea } from "@shared/schema";

interface SavedIdeasContextType {
  savedIdeas: Idea[];
  addIdea: (idea: Idea) => void;
  removeIdea: (title: string) => void;
  isIdeaSaved: (title: string) => boolean;
  clearAll: () => void;
}

const SavedIdeasContext = createContext<SavedIdeasContextType | undefined>(undefined);

export function SavedIdeasProvider({ children }: { children: ReactNode }) {
  const [savedIdeas, setSavedIdeas] = useState<Idea[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("savedIdeas");
    if (stored) {
      try {
        setSavedIdeas(JSON.parse(stored));
      } catch (error) {
        console.error("Failed to parse saved ideas:", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("savedIdeas", JSON.stringify(savedIdeas));
  }, [savedIdeas]);

  const addIdea = (idea: Idea) => {
    setSavedIdeas((prev) => {
      if (prev.some((i) => i.title === idea.title)) {
        return prev;
      }
      return [...prev, idea];
    });
  };

  const removeIdea = (title: string) => {
    setSavedIdeas((prev) => prev.filter((i) => i.title !== title));
  };

  const isIdeaSaved = (title: string) => {
    return savedIdeas.some((i) => i.title === title);
  };

  const clearAll = () => {
    setSavedIdeas([]);
  };

  return (
    <SavedIdeasContext.Provider value={{ savedIdeas, addIdea, removeIdea, isIdeaSaved, clearAll }}>
      {children}
    </SavedIdeasContext.Provider>
  );
}

export function useSavedIdeas() {
  const context = useContext(SavedIdeasContext);
  if (!context) {
    throw new Error("useSavedIdeas must be used within SavedIdeasProvider");
  }
  return context;
}
