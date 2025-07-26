import { env } from '@/env';
import { BackendError } from '../error';

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

const customInstanceSWR = async <T>(
  url: string,
  options: RequestInit
): Promise<T> => {
  const requestUrl = getUrl(url);
  const requestHeaders = await getHeaders(options.headers);

  const requestInit: RequestInit = {
    ...options,
    headers: requestHeaders,
  };

  const response = await fetch(requestUrl, requestInit);

  const responseBody = await getBody<T>(response);

  if (!response.ok) {
    throw new BackendError(response.status, response.statusText, responseBody);
  }

  return responseBody;
};

export { customInstanceSWR };
