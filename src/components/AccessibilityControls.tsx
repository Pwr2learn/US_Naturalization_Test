"use client";

import { useEffect, useState } from "react";

type ThemeMode = "light" | "dark";
type FontSizeMode = "small" | "medium" | "large";

const STORAGE_KEYS = {
  theme: "uscis-theme-mode",
  fontSize: "uscis-font-size",
};

export function AccessibilityControls() {
  const [theme, setTheme] = useState<ThemeMode>("light");
  const [fontSize, setFontSize] = useState<FontSizeMode>("medium");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const savedTheme =
      (window.localStorage.getItem(STORAGE_KEYS.theme) as ThemeMode | null) ?? "light";
    const savedFontSize =
      (window.localStorage.getItem(STORAGE_KEYS.fontSize) as FontSizeMode | null) ?? "medium";

    setTheme(savedTheme);
    setFontSize(savedFontSize);
    document.documentElement.dataset.theme = savedTheme;
    document.documentElement.dataset.fontSize = savedFontSize;
    setIsReady(true);
  }, []);

  const updateTheme = (value: ThemeMode) => {
    setTheme(value);
    document.documentElement.dataset.theme = value;
    window.localStorage.setItem(STORAGE_KEYS.theme, value);
  };

  const updateFontSize = (value: FontSizeMode) => {
    setFontSize(value);
    document.documentElement.dataset.fontSize = value;
    window.localStorage.setItem(STORAGE_KEYS.fontSize, value);
  };

  if (!isReady) {
    return null;
  }

  return (
    <div className="accessibility-bar" aria-label="Display settings">
      <div className="accessibility-group">
        <span className="accessibility-label">Mode</span>
        <div className="accessibility-buttons">
          <button
            type="button"
            className={theme === "light" ? "active" : ""}
            onClick={() => updateTheme("light")}
          >
            Light
          </button>
          <button
            type="button"
            className={theme === "dark" ? "active" : ""}
            onClick={() => updateTheme("dark")}
          >
            Dark
          </button>
        </div>
      </div>

      <div className="accessibility-group">
        <span className="accessibility-label">Text size</span>
        <div className="accessibility-buttons">
          <button
            type="button"
            className={fontSize === "small" ? "active" : ""}
            onClick={() => updateFontSize("small")}
          >
            Small
          </button>
          <button
            type="button"
            className={fontSize === "medium" ? "active" : ""}
            onClick={() => updateFontSize("medium")}
          >
            Medium
          </button>
          <button
            type="button"
            className={fontSize === "large" ? "active" : ""}
            onClick={() => updateFontSize("large")}
          >
            Large
          </button>
        </div>
      </div>
    </div>
  );
}
