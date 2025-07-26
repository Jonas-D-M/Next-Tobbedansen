import { BackendError, isError } from '../error';
import { env } from '@/env';

const getBody = async <T>(c: Response | Request): Promise<T> => {
  const contentType = c.headers.get('content-type');

  if (contentType?.includes('application/json')) {
    return (await c.json()) as T;
  }
  if (contentType?.includes('application/pdf')) {
    return (await c.blob()) as T;
  }
  return (await c.text()) as T;
};

const getUrl = (contextUrl: string): string => {
  const url = new URL(`${env.NEXT_PUBLIC_TICKETS_URL}${contextUrl}`);
  return url.toString();
};

const getHeaders = async (headers?: HeadersInit): Promise<HeadersInit> => {
  const defaultHeaders: HeadersInit = {};
  //Merge with passed headers
  return {
    ...defaultHeaders,
    ...headers,
  };
};

const customClientInstance = async <T>(
  url: string,
  options: RequestInit
): Promise<T> => {
  const requestUrl = getUrl(url);
  const requestHeaders = await getHeaders(options.headers);

  const requestInit: RequestInit = {
    ...options,
    headers: requestHeaders,
  };

  try {
    const response = await fetch(requestUrl, requestInit);

    if (!response.ok) {
      const errorBody = await getBody<unknown>(response);
      // Throw an instance of BackendError
      throw new BackendError(response.status, response.statusText, errorBody);
    }

    const data = await getBody<T>(response);
    return data;
  } catch (error) {
    if (isError(error)) {
      throw error;
    }
    console.error('An unexpected error occurred:', error);
    throw new BackendError(500, 'Unknown Error', { originalError: error });
  }
};

export { customClientInstance };
