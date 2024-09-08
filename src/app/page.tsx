"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [discordId, setDiscordId] = useState("");
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const handleGenerate = async () => {
    try {
      const response = await fetch(`users?id=${discordId}`);
      const data = await response.text();
      setGeneratedImage(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="items-center text-center">
        <div className="text-lg mt-2">
          <h1 className="text-4xl font-bold">Discord Status Profile</h1>
          <p className="text-gray-500 mb-6">Display your Discord Presence in your GitHub Profile</p>
        </div>
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            type="number"
            placeholder="Discord ID"
            value={discordId}
            onChange={(e) => setDiscordId(e.target.value)}
          />
          <Button type="button" onClick={handleGenerate}>
            Generator
          </Button>
        </div>
        {generatedImage && (
          <div className="border border-gray-500 p-4 mt-4">
            <div
              dangerouslySetInnerHTML={{ __html: generatedImage }}
              className="mt-4"
            />
          </div>
        )}
      </div>
    </div>
  );
}