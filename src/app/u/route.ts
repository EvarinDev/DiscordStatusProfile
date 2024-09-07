import { IUser } from "@/types";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

type Data = {
  id?: string | string[];
  error?: any;
  user: IUser | null;
  code?: string;
};

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.searchParams.get('id');

  if (!id) {
    return NextResponse.json({ user: null }, { status: 400 });
  }

  try {
    const user = await axios.get(`https://api.masuru.in.th/api/v1/discord/users/${id}`).then(res => res.data as IUser);
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ user: null }, { status: 500 });
  }
}