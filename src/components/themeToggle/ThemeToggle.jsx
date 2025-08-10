import React, { useState, useEffect } from "react";

const ThemeToggle = () => {
  // Initialize state with a safe default (dark)
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    // Check localStorage and matchMedia for theme preference
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Determine initial theme with priority: localStorage > system preference > default
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

    setTheme(initialTheme);
    document.documentElement.setAttribute("data-theme", initialTheme);
    localStorage.setItem("theme", initialTheme);
  }, []); // Empty dependency array to run only once on mount

  const handleThemeChange = (event) => {
    const newTheme = event.target.checked ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <div>
      <input
        type="checkbox"
        value="dark"
        className="toggle theme-controller mr-6"
        checked={theme === "dark"}
        onChange={handleThemeChange}
      />
    </div>
  );
};

export default ThemeToggle;