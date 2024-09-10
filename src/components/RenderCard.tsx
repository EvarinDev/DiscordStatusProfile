import { IDiscordData } from "@/types";

export function RenderCard({ user }: { user: IDiscordData }) {
  const encodeURL = (url: string) => url.replace(/&/g, '&amp;');
  
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

  return `
<svg xmlns="http://www.w3.org/2000/svg" width="440" height="266" viewBox="0 0 440 266">
    <defs>
        <style>
            @import url('https://r2.aquariumq.studio/LINE_Seed_Sans_TH_V1.003/Web/WOFF/LINESeedSansTH_W_Rg.woff');
            .frame { fill: white; }
            .profile-pic { width: 48px; height: 48px; }
            .name { font-family: 'LINE Seed Sans TH', sans-serif; font-size: 20px; fill: black; }
            .username { font-family: 'LINE Seed Sans TH', sans-serif; font-size: 20px; fill: black; opacity: 0.5; }
            .activity-label { font-family: 'LINE Seed Sans TH', sans-serif; font-size: 20px; fill: black; }
            .activity { font-family: 'LINE Seed Sans TH', sans-serif; font-size: 20px; fill: black; opacity: 0.5; }
            .divider { stroke: black; stroke-width: 2; opacity: 0.5; }
        </style>
    </defs>
    <rect class="frame" width="440" height="266" />
    
    <!-- Define a circular clip-path for the profile picture -->
    <clipPath id="circleClip">
        <circle cx="46" cy="34" r="24" />
    </clipPath>

    <!-- Use the clip-path for the profile image -->
    <image class="profile-pic" x="22" y="10" href="${encodeURL(`https://cdn.discordapp.com/avatars/${user.discord_user.id}/${user.discord_user.avatar}.webp`)}" clip-path="url(#circleClip)" />
    
    <text class="name" x="82" y="28">${user.discord_user.global_name || user.discord_user.username}</text>
    <text class="username" x="82" y="52">${user.discord_user.username}</text>
    <line class="divider" x1="20" y1="66" x2="420" y2="66" />
    <text class="activity-label" x="20" y="90">Activity</text>
    <text class="activity" x="32" y="120">
        ${wrappedActivity.map((line, index) => `<tspan x="32" dy="${index === 0 ? 0 : 24}">${line}</tspan>`).join('')}
    </text>
</svg>`;
}