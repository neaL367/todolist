"use client";

import { useEffect } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";

import type { ThemeModel } from "@/models/theme";

export function useTheme() {
  const [currentTheme, setCurrentTheme] = useLocalStorage<ThemeModel>("theme", "dark");
  
  useEffect(() => {
    const theme: ThemeModel = currentTheme === "dark" ? "dark" : "light";
    document.body.classList.toggle("dark", theme === "dark");
    document.body.style.colorScheme = theme;
  }, [currentTheme]); 
  
  const toggleTheme = () =>
    setCurrentTheme((prev) => (prev === "dark" ? "light" : "dark"));
    
  return {
    theme: currentTheme,
    toggleTheme,
  };
}