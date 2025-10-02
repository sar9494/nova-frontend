"use client";

import { useEffect, useState } from "react";
import * as microsoftTeams from "@microsoft/teams-js";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ConfigPage() {
  const [tabName, setTabName] = useState("My Tab");
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Initialize Teams SDK
    microsoftTeams.app.initialize().then(() => {
      setIsInitialized(true);
    });

    // Register save handler
    microsoftTeams.settings.registerOnSaveHandler((saveEvent) => {
      // Set the tab settings
      microsoftTeams.settings.setSettings({
        entityId: "config-tab-001", // unique ID for your tab
        contentUrl: window.location.origin + "/tab",
        suggestedDisplayName: tabName,
      });

      // Notify Teams that save was successful
      saveEvent.notifySuccess();
    });

    // Optionally register on remove handler
    microsoftTeams.settings.registerOnRemoveHandler(() => {
      console.log("Tab removed");
    });
  }, [tabName]);

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading configuration...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Configure Your Tab</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="tabName">Tab Name</Label>
            <Input
              id="tabName"
              value={tabName}
              onChange={(e) => setTabName(e.target.value)}
              placeholder="Enter tab name"
            />
          </div>
          <p className="text-sm text-gray-600">
            Click Save in Teams to apply the configuration
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
