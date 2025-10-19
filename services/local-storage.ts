import type { ThemeModel } from "@/models/theme";
import type { TodoModel } from "@/models/todo";

const STORAGE_KEY_TODO = "todos";
const STORAGE_KEY_THEME = "theme";

export function getTodos(): TodoModel[] {
  if (typeof window === "undefined") return [];
  const saved = localStorage.getItem(STORAGE_KEY_TODO);
  if (!saved) return [];
  try {
    const todos = JSON.parse(saved);
    return todos.map((t: TodoModel) => ({
      ...t,
      createdAt: new Date(t.createdAt),
    }));
  } catch {
    return [];
  }
}

export function saveTodos(todos: TodoModel[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY_TODO, JSON.stringify(todos));
}

export function getTheme(): ThemeModel {
  if (typeof window === "undefined") return "light";
  const saved = localStorage.getItem(STORAGE_KEY_THEME);
  if (saved === "dark") return "dark";
  return "light";
}

export function saveTheme(theme: ThemeModel) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY_THEME, theme);
}
