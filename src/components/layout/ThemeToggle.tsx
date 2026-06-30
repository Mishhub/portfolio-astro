import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

function current(): Theme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

/**
 * Toggles the `.dark` class on <html> and persists the choice. The initial
 * theme is set by an inline head script (see BaseLayout) to avoid any flash;
 * this island only handles user-initiated changes and keeps in sync across
 * view transitions.
 */
export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    setTheme(current());
    const sync = () => setTheme(current());
    document.addEventListener("themechange", sync);
    return () => document.removeEventListener("themechange", sync);
  }, []);

  const toggle = () => {
    const next: Theme = current() === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* storage unavailable — fall back to in-memory only */
    }
    setTheme(next);
    document.dispatchEvent(new CustomEvent("themechange"));
  };

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      aria-pressed={isDark}
      className="inline-grid size-10 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <Sun className="size-[1.15rem] dark:hidden" />
      <Moon className="hidden size-[1.15rem] dark:block" />
    </button>
  );
}
