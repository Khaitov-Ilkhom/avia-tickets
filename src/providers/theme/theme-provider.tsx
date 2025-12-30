import {createContext, useContext, useEffect, useState} from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  themeStorageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

const Index = ({children, defaultTheme = "system", themeStorageKey="vite-ui-theme", ...props}: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") {
      return defaultTheme;
    }
    const storedTheme = localStorage.getItem(themeStorageKey) as Theme;
    const validThemes: Theme[] = ["light", "dark", "system"];
    return validThemes.includes(storedTheme) ? storedTheme : defaultTheme;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const systemTheme = mediaQuery.matches ? "dark" : "light";
      root.classList.add(systemTheme);

      const handleChange = (e: MediaQueryListEvent) => {
        const newSystemTheme = e.matches ? "dark" : "light";
        root.classList.remove("light", "dark");
        root.classList.add(newSystemTheme);
      };

      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    } else {
      root.classList.add(theme);
    }
    localStorage.setItem(themeStorageKey, theme);
  }, [theme, themeStorageKey]);

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      if (!newTheme || !["light", "dark", "system"].includes(newTheme)) {
        console.warn(`Attempted to set an invalid theme: ${newTheme}`);
        return;
      }
      setTheme(newTheme);
    }
  };

  return (
      <ThemeProviderContext.Provider {...props} value={value}>
        {children}
      </ThemeProviderContext.Provider>
  );
}
export default Index

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};