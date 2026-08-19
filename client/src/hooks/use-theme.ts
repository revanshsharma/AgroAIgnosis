import { useState, useEffect, createContext, useContext } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isDark: boolean;
}

const defaultContext: ThemeContextType = {
  theme: "light",
  toggleTheme: () => {},
  isDark: false,
};

export const ThemeContext = createContext<ThemeContextType>(defaultContext);

export function useThemeState(): ThemeContextType {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem("krishimitra_theme") as Theme) || "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("krishimitra_theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");
  };

  return { theme, toggleTheme, isDark: theme === "dark" };
}

export function useTheme() {
  return useContext(ThemeContext);
}
