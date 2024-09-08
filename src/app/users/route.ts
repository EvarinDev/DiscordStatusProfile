import { RenderCard } from "@/components/RenderCard";
import { IDiscordData } from "@/types";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.searchParams.get('id');

  if (!id) return NextResponse.json({ user: null }, { status: 400 });

  try {
    const user = await axios.get(`https://api.masuru.in.th/api/v1/discord/users/${id}`).then(res => res.data.data as IDiscordData);
    const headers = new Headers();
    headers.set("Content-Type", "image/svg+xml; charset=utf-8");
    headers.set("content-security-policy", "default-src 'none'; img-src * data:; style-src 'unsafe-inline'");
    const svgContent = RenderCard({ user });
    return new NextResponse(svgContent.toString(), { headers });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ user: null }, { status: 500 });
  }
}