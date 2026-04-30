import { NodeSDK } from "@opentelemetry/sdk-node";
import { resourceFromAttributes } from "@opentelemetry/resources";
import {
  ATTR_SERVICE_NAME,
  ATTR_SERVICE_VERSION
} from "@opentelemetry/semantic-conventions";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { OTLPMetricExporter } from "@opentelemetry/exporter-metrics-otlp-http";
import { OTLPLogExporter } from "@opentelemetry/exporter-logs-otlp-http";
import { PeriodicExportingMetricReader } from "@opentelemetry/sdk-metrics";
import { BatchLogRecordProcessor } from "@opentelemetry/sdk-logs";
import { HttpInstrumentation } from "@opentelemetry/instrumentation-http";
import { UndiciInstrumentation } from "@opentelemetry/instrumentation-undici";

const intake = process.env.SUPERLOG_INTAKE_URL?.replace(/\/$/, "");
const apiKey = process.env.SUPERLOG_API_KEY;
const headers = apiKey ? { Authorization: `Bearer ${apiKey}` } : undefined;

const sdk = new NodeSDK({
  resource: resourceFromAttributes({
    [ATTR_SERVICE_NAME]: process.env.OTEL_SERVICE_NAME ?? "nextjs-demo",
    [ATTR_SERVICE_VERSION]: process.env.npm_package_version ?? "0.1.0"
  }),
  traceExporter: new OTLPTraceExporter({
    url: intake ? `${intake}/v1/traces` : undefined,
    headers
  }),
  metricReader: new PeriodicExportingMetricReader({
    exporter: new OTLPMetricExporter({
      url: intake ? `${intake}/v1/metrics` : undefined,
      headers
    })
  }),
  logRecordProcessors: [
    new BatchLogRecordProcessor(
      new OTLPLogExporter({
        url: intake ? `${intake}/v1/logs` : undefined,
        headers
      })
    )
  ],
  instrumentations: [new HttpInstrumentation(), new UndiciInstrumentation()]
});

sdk.start();

const shutdown = () => {
  sdk
    .shutdown()
    .catch(() => {
      /* shutdown noise stays below error level */
    })
    .finally(() => process.exit(0));
};
process.once("SIGTERM", shutdown);
process.once("SIGINT", shutdown);
