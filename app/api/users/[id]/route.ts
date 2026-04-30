import { NextResponse } from "next/server";

type UserRouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_request: Request, { params }: UserRouteContext) {
  const { id } = await params;

  return NextResponse.json({
    id,
    name: `Demo User ${id}`,
    role: "tester",
    active: true
  });
}
