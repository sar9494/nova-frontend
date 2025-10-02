"use client";

import { useEffect, useState } from "react";
import * as microsoftTeams from "@microsoft/teams-js";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function TabPage() {
  const [context, setContext] = useState<microsoftTeams.app.Context>();
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initTeams = async () => {
      try {
        await microsoftTeams.app.initialize();
        const ctx = await microsoftTeams.app.getContext();
        setContext(ctx);
        setIsInitialized(true);

        // Notify Teams
        microsoftTeams.app.notifySuccess();
      } catch (err) {
        console.error("Failed to initialize Teams:", err);
        setError(err instanceof Error ? err.message : "Failed to initialize");
      }
    };

    initTeams();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-red-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-red-600">Error</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600">Initializing Teams...</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">👋 Welcome to Teams!</CardTitle>
            <CardDescription>Next.js Teams Application</CardDescription>
          </CardHeader>
        </Card>

        {/* Context Info */}
        <Card>
          <CardHeader>
            <CardTitle>Teams Context</CardTitle>
            <CardDescription>Information from Microsoft Teams</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-600">User Name</p>
                <p className="text-lg font-semibold">
                  {context?.user?.userPrincipalName || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Theme</p>
                <p className="text-lg font-semibold capitalize">
                  {context?.app?.theme || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Host</p>
                <p className="text-lg font-semibold">
                  {context?.app?.host?.name || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Locale</p>
                <p className="text-lg font-semibold">
                  {context?.app?.locale || "N/A"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href={"/chat"}>
              <Button
                className="w-full"
                onClick={() => alert("Button clicked in Teams!")}
              >
                Test Action
              </Button>
            </Link>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                microsoftTeams.dialog.url.open({
                  url: window.location.origin + "/dialog",
                  title: "Dialog Title",
                  size: { height: 400, width: 600 },
                });
              }}
            >
              Open Dialog
            </Button>
          </CardContent>
        </Card>

        {/* Debug Info */}
        <Card>
          <CardHeader>
            <CardTitle>Debug Information</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-auto text-xs">
              {JSON.stringify(context, null, 2)}
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
