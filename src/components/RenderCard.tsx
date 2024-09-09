"use client";
import { IDiscordData } from "@/types";
import { useState, useEffect } from 'react';

export function RenderCard({ user }: { user: IDiscordData }) {
  const [avatarBase64, setAvatarBase64] = useState<string | null>(null);

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const avatarUrl = `https://cdn.discordapp.com/avatars/${user.discord_user.id}/${user.discord_user.avatar}`;
        const response = await fetch(avatarUrl);
        const blob = await response.blob();
        const base64 = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(blob);
        });
        setAvatarBase64(base64 as string);
      } catch (error) {
        console.error('Failed to load avatar:', error);
      }
    };

    fetchAvatar();
  }, [user.discord_user.id, user.discord_user.avatar]);

  function wrapText(text: string, maxWidth: number): string[] {
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = '';
    words.forEach(word => {
      if ((currentLine + word).length <= maxWidth) {
        currentLine += (currentLine ? ' ' : '') + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    });
    lines.push(currentLine);
    return lines;
  }

  const activityText = user.activities[0]?.state || "No Activity provided.";
  const wrappedActivity = wrapText(activityText, 30);

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="440" height="266" viewBox="0 0 440 266">
      <defs>
        <style>
          {`
            @font-face {
              font-family: 'LINE Seed Sans TH';
              src: url('/fonts/LINESeedSansTH_W_Rg.woff') format('woff');
            }
            .frame { fill: white; }
            .profile-pic { width: 48px; height: 48px; }
            .name { font-family: 'LINE Seed Sans TH', sans-serif; font-size: 20px; fill: black; }
            .username { font-family: 'LINE Seed Sans TH', sans-serif; font-size: 20px; fill: black; opacity: 0.5; }
            .activity-label { font-family: 'LINE Seed Sans TH', sans-serif; font-size: 20px; fill: black; }
            .activity { font-family: 'LINE Seed Sans TH', sans-serif; font-size: 20px; fill: black; opacity: 0.5; }
            .divider { stroke: black; stroke-width: 2; opacity: 0.5; }
          `}
        </style>
      </defs>
      <rect className="frame" width="440" height="266" />
      
      <clipPath id="circleClip">
        <circle cx="46" cy="34" r="24" />
      </clipPath>

      {avatarBase64 ? (
        <image className="profile-pic" x="22" y="10" href={avatarBase64} clipPath="url(#circleClip)" />
      ) : (
        <circle cx="46" cy="34" r="24" fill="#cccccc" />
      )}
      
      <text className="name" x="82" y="28">{user.discord_user.global_name || user.discord_user.username}</text>
      <text className="username" x="82" y="52">{user.discord_user.username}</text>
      <line className="divider" x1="20" y1="66" x2="420" y2="66" />
      <text className="activity-label" x="20" y="90">Activity</text>
      <text className="activity" x="32" y="120">
        {wrappedActivity.map((line, index) => (
          <tspan key={index} x="32" dy={index === 0 ? 0 : 24}>{line}</tspan>
        ))}
      </text>
    </svg>
  );
}
