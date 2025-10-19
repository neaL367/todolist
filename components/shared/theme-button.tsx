import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";

export function ThemeButton() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme}>
      {darkMode ? "☀️" : "🌙"}
    </Button>
  );
}