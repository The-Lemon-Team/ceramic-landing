import { NextRequest, NextResponse } from "next/server";
import { syncVkPosts } from "@/lib/vkPostsSync";

export const runtime = "nodejs";

function canRunSync(request: NextRequest) {
  const secret = process.env.VK_SYNC_SECRET;

  if (!secret) {
    return process.env.NODE_ENV !== "production";
  }

  return request.headers.get("x-vk-sync-secret") === secret;
}

export async function POST(request: NextRequest) {
  if (!canRunSync(request)) {
    return NextResponse.json(
      { ok: false, message: "VK sync is not authorized." },
      { status: 401 },
    );
  }

  const result = await syncVkPosts();

  return NextResponse.json(result, {
    status: result.ok ? 200 : 500,
  });
}
