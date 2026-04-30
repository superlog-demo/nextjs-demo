// Tiny shared telemetry helpers for route handlers.
// Kept colocated with the app so the diff stays small.
import { metrics, trace } from "@opentelemetry/api";
import { logs } from "@opentelemetry/api-logs";

const SERVICE = "nextjs-demo";

export const tracer = trace.getTracer(SERVICE);
export const meter = metrics.getMeter(SERVICE);
export const logger = logs.getLogger(SERVICE);

export const ordersCreatedCounter = meter.createCounter("orders.created", {
  description: "Number of order creation requests accepted by /api/orders",
  unit: "{order}"
});

export const usersFetchedCounter = meter.createCounter("users.fetched", {
  description: "Number of /api/users/:id lookups served",
  unit: "{lookup}"
});
