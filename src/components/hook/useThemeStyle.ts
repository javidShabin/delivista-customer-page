// useThemeStyles.ts
import { useState, useEffect } from "react";

type Theme = "light" | "dark";

interface ThemeStyles {
  background: React.CSSProperties;
  card: React.CSSProperties;
  form: React.CSSProperties;
  button: React.CSSProperties;
}

export default function useThemeStyles() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const styles: ThemeStyles = {
    background: {
      backgroundColor: theme === "dark" ? "#121212" : "#f9f9f9",
      color: theme === "dark" ? "#ffffff" : "#000000",
    },
    card: {
      backgroundColor: theme === "dark" ? "#1e1e1e" : "#ffffff",
      color: theme === "dark" ? "#f5f5f5" : "#333333",
      borderRadius: "8px",
      padding: "1rem",
      boxShadow:
        theme === "dark"
          ? "0 2px 6px rgba(0, 0, 0, 0.6)"
          : "0 2px 6px rgba(0, 0, 0, 0.1)",
    },
    form: {
      backgroundColor: theme === "dark" ? "#1c1c1c" : "#ffffff",
      color: theme === "dark" ? "#e5e5e5" : "#333333",
      padding: "1rem",
      borderRadius: "6px",
      boxShadow:
        theme === "dark"
          ? "0 2px 4px rgba(0, 0, 0, 0.5)"
          : "0 2px 4px rgba(0, 0, 0, 0.1)",
    },
    button: {
      backgroundColor: theme === "dark" ? "#333333" : "#007bff",
      color: theme === "dark" ? "#f1f1f1" : "#ffffff",
      padding: "0.5rem 1rem",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
  };

  return { theme, styles, setTheme };
}
