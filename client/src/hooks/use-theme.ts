import { useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    // Use localStorage or default to system
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("dreamcrafter-theme") as Theme | null;
      return storedTheme || "system";
    }
    return "system";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    
    root.classList.remove("light", "dark");
    
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
      return;
    }
    
    root.classList.add(theme);
  }, [theme]);

  const setThemeValue = (newTheme: Theme) => {
    localStorage.setItem("dreamcrafter-theme", newTheme);
    setTheme(newTheme);
  };

  return { theme, setTheme: setThemeValue };
}
