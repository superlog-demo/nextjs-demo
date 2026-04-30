import { NextResponse } from "next/server";
import { tracer, usersFetchedCounter } from "../../../observability";
import type { Span } from "@opentelemetry/api";

type UserRouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_request: Request, { params }: UserRouteContext) {
  const { id } = await params;

  return tracer.startActiveSpan("users.fetch", async (span: Span) => {
    span.setAttribute("user.id", id);
    // metric stays low-cardinality on purpose — user.id only on the span
    usersFetchedCounter.add(1);
    span.end();

    return NextResponse.json({
      id,
      name: `Demo User ${id}`,
      role: "tester",
      active: true
    });
  });
}
