"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

function copyText(text: string) {
  return () => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
    });
  };
}

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
            <p className="text-gray-500">Join <a href="https://discord.gg/s3j5vphByS" className="text-blue-500">Discord</a> to use it</p>
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
              <Button type="button" onClick={copyText(`${window.location}users?id=${discordId}`)}>Copy</Button>
            </div>
          )}
        </div>
      </div>
    );
}