import { defineConfig } from 'orval';

const specUrl = './ticketnode-export.yaml';

export default defineConfig({
  tickets: {
    input: specUrl,
    output: {
      urlEncodeParameters: true,
      prettier: true,
      clean: true,
      tsconfig: './tsconfig.json',
      target: './src/lib/api/tickets/index.ts',
      client: 'fetch',
      override: {
        useDeprecatedOperations: false,
        mutator: {
          path: './src/lib/api/mutators/tickets.ts',
          name: 'customInstance',
        },
        fetch: {
          includeHttpResponseReturnType: false,
        },
      },
    },
  },
  ticketsClient: {
    input: specUrl,
    output: {
      urlEncodeParameters: true,
      prettier: true,
      clean: true,
      tsconfig: './tsconfig.json',
      target: './src/lib/api/tickets-client/index.ts',
      client: 'fetch',
      override: {
        useDeprecatedOperations: false,
        mutator: {
          path: './src/lib/api/mutators/tickets-client.ts',
          name: 'customClientInstance',
        },
        fetch: {
          includeHttpResponseReturnType: false,
        },
      },
    },
  },
  ticketsSwr: {
    input: specUrl,
    output: {
      urlEncodeParameters: true,
      prettier: true,
      clean: true,
      tsconfig: './tsconfig.json',
      target: './src/lib/api/tickets-swr/index.ts',
      client: 'swr',
      httpClient: 'fetch',
      override: {
        useDeprecatedOperations: false,
        mutator: {
          path: './src/lib/api/mutators/tickets-swr.ts',
          name: 'customInstanceSWR',
        },
        fetch: {
          includeHttpResponseReturnType: false,
        },
      },
    },
  },
});
