// Next.js loads this file once, before any request handler runs.
// We only initialise the OpenTelemetry SDK on the Node.js runtime —
// the Edge runtime does not support `@opentelemetry/sdk-node`.
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./instrumentation.node");
  }
}
