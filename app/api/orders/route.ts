import { NextRequest, NextResponse } from "next/server";

const orders = [
  { id: "ord_1001", customer: "Ada Lovelace", total: 128.5, status: "paid" },
  { id: "ord_1002", customer: "Grace Hopper", total: 86.0, status: "open" },
  { id: "ord_1003", customer: "Katherine Johnson", total: 214.75, status: "paid" }
];

export async function GET() {
  return NextResponse.json({ orders });
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));

  return NextResponse.json(
    {
      id: "ord_preview",
      status: "accepted",
      received: body
    },
    { status: 201 }
  );
}
