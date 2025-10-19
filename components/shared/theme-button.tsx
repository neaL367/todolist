import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { getTheme, saveTheme } from "@/services/local-storage";
import type { ThemeModel } from "@/models/theme";

export function ThemeButton() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    setDarkMode(getTheme() === "dark");
  }, []);

  useEffect(() => {
    const theme: ThemeModel = darkMode ? "dark" : "light";
    document.body.classList.toggle("dark", darkMode);
    document.body.style.colorScheme = theme;
    saveTheme(theme);
  }, [darkMode]);

  return (
    <Button variant="outline" size="icon" onClick={() => setDarkMode((prev) => !prev)}>
      {darkMode ? "☀️" : "🌙"}
    </Button>
  );
}
