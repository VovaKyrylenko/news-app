import { updateRSSFeed } from "@/utils/db/updated-RSS-feed";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    await updateRSSFeed();
    return NextResponse.json({ error: "RSS feed updated and stored." });
  } catch (error) {
    return NextResponse.json({ error: "Error updating RSS feed" });
  }
}
