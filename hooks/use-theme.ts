"use client"

import { useEffect, useState } from "react";
import { getTheme, saveTheme } from "@/services/local-storage";
import type { ThemeModel } from "@/models/theme";

export function useTheme() {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadedTheme = getTheme() === "dark";
    setDarkMode(loadedTheme);
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      const theme: ThemeModel = darkMode ? "dark" : "light";
      document.body.classList.toggle("dark", darkMode);
      document.body.style.colorScheme = theme;
      saveTheme(theme);
    }
  }, [darkMode, isLoaded]);

  const toggleTheme = () => setDarkMode((prev) => !prev);

  return {
    darkMode,
    toggleTheme,
  };
}