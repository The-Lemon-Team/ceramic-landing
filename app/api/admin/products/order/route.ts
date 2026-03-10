import { prisma } from "@/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const products = await (prisma.product as any).findMany({
    select: {
      id: true,
      title: true,
      slug: true,
      sortOrder: true,
      thumbnail: true,
      mainImage: true,
      updatedAt: true,
    },
    orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
  });

  return NextResponse.json({ products });
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as {
    order?: Array<{ id: string; sortOrder: number }>;
  } | null;

  if (!body?.order || !Array.isArray(body.order)) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const order = body.order
    .filter(
      (x): x is { id: string; sortOrder: number } =>
        typeof x?.id === "string" && typeof x?.sortOrder === "number",
    )
    .slice(0, 5000);

  await prisma.$transaction(
    order.map((x) =>
      (prisma.product as any).update({
        where: { id: x.id },
        data: { sortOrder: x.sortOrder },
      }),
    ),
  );

  return NextResponse.json({ ok: true });
}
