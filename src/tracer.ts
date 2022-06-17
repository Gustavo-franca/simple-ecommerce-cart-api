'use strict';

import {
  SimpleSpanProcessor,
  ConsoleSpanExporter,
} from '@opentelemetry/sdk-trace-base';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { RedisInstrumentation } from '@opentelemetry/instrumentation-redis';
import { JaegerExporter, ExporterConfig } from '@opentelemetry/exporter-jaeger';
import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node';
import { OTTracePropagator } from '@opentelemetry/propagator-ot-trace';
import config from './config';

const hostName = config.tracer_host;

const options: ExporterConfig = {
  tags: [],
  endpoint: `http://${hostName}:14268/api/traces`,
};

const init = (serviceName: string, environment: string) => {
  // User Collector Or Jaeger Exporter
  //const exporter = new CollectorTraceExporter(options)

  const exporter = new JaegerExporter(options);

  const provider = new NodeTracerProvider({
    resource: new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: serviceName, // Service name that showuld be listed in jaeger ui
      [SemanticResourceAttributes.DEPLOYMENT_ENVIRONMENT]: environment,
    }),
  });

  provider.addSpanProcessor(new SimpleSpanProcessor(exporter));

  // Use the BatchSpanProcessor to export spans in batches in order to more efficiently use resources.
  //  provider.addSpanProcessor(new BatchSpanProcessor(exporter));

  // Enable to see the spans printed in the console by the ConsoleSpanExporter
  provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));

  provider.register({ propagator: new OTTracePropagator() });

  console.log('tracing initialized');

  registerInstrumentations({
    instrumentations: [
      new ExpressInstrumentation({ ignoreLayers: ['/traces'] }),
      new HttpInstrumentation({ ignoreIncomingPaths: ['/traces'] }),
      new RedisInstrumentation(),
    ],
    tracerProvider: provider,
  });

  const tracer = provider.getTracer(serviceName);
  return { tracer };
};
export { init };
