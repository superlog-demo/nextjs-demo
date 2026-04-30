import { NextRequest, NextResponse } from "next/server";
import { SeverityNumber } from "@opentelemetry/api-logs";
import { logger, ordersCreatedCounter, tracer } from "../../observability";
import type { Span } from "@opentelemetry/api";

const orders = [
  { id: "ord_1001", customer: "Ada Lovelace", total: 128.5, status: "paid" },
  { id: "ord_1002", customer: "Grace Hopper", total: 86.0, status: "open" },
  { id: "ord_1003", customer: "Katherine Johnson", total: 214.75, status: "paid" }
];

export async function GET() {
  return NextResponse.json({ orders });
}

export async function POST(request: NextRequest) {
  return tracer.startActiveSpan("orders.create", async (span: Span) => {
    let body: Record<string, unknown> = {};
    let parseFailed = false;
    try {
      body = (await request.json()) as Record<string, unknown>;
    } catch {
      parseFailed = true;
      // Recoverable: malformed body still gets a 201 preview from the demo.
      // Stay below error level — no manual intervention needed.
      logger.emit({
        severityNumber: SeverityNumber.WARN,
        severityText: "WARN",
        body: "orders.create received non-JSON body",
        attributes: {
          "operation.outcome": "bad_request",
          "http.route": "/api/orders"
        }
      });
    }

    const customer =
      typeof body.customer === "string" ? body.customer : "anonymous";
    span.setAttribute("order.customer", customer);
    span.setAttribute("order.body_parsed", !parseFailed);

    // outcome stays low-cardinality (ok|bad_request); customer is free-text and
    // only goes on the span to keep metric cardinality bounded.
    ordersCreatedCounter.add(1, {
      "operation.outcome": parseFailed ? "bad_request" : "ok"
    });

    span.end();
    return NextResponse.json(
      {
        id: "ord_preview",
        status: "accepted",
        received: body
      },
      { status: 201 }
    );
  });
}
