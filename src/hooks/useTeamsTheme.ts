// src/hooks/useTeamsTheme.ts
"use client";

import { useEffect, useState } from "react";
import * as microsoftTeams from "@microsoft/teams-js";

export function useTeamsTheme() {
  const [theme, setTheme] = useState<string>("default");

  useEffect(() => {
    microsoftTeams.app.initialize().then(() => {
      microsoftTeams.app.getContext().then((context) => {
        setTheme(context.app?.theme || "default");
      });

      microsoftTeams.app.registerOnThemeChangeHandler((newTheme) => {
        setTheme(newTheme);
      });
    });
  }, []);

  return theme;
}
