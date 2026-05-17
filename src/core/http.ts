import { ZodSchema } from "zod";
import { YandexDeliveryError, YandexDeliveryValidationError } from "./errors.js";
import { FetchLike, QueryParams, RequestOptions, ResponseType } from "./types.js";

export type HttpClientOptions = {
  token: string;
  baseUrl: string;
  fetch: FetchLike;
  timeoutMs: number;
  userAgent?: string | undefined;
  validateInput: boolean;
};

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type EndpointOptions<TRequest> = RequestOptions & {
  method: HttpMethod;
  path: string;
  schema?: ZodSchema<TRequest>;
  request?: TRequest;
};

export class HttpClient {
  private readonly token: string;
  private readonly baseUrl: string;
  private readonly fetchFn: FetchLike;
  private readonly timeoutMs: number;
  private readonly userAgent?: string | undefined;
  private readonly validateInput: boolean;

  constructor(options: HttpClientOptions) {
    this.token = options.token;
    this.baseUrl = options.baseUrl.replace(/\/+$/, "");
    this.fetchFn = options.fetch;
    this.timeoutMs = options.timeoutMs;
    this.userAgent = options.userAgent;
    this.validateInput = options.validateInput;
  }

  async request<TResponse, TRequest = unknown>(
    options: EndpointOptions<TRequest>,
  ): Promise<TResponse> {
    const request = this.parseRequest(options);
    const url = new URL(`${this.baseUrl}${options.path}`);
    appendQuery(url, options.query);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), options.timeoutMs ?? this.timeoutMs);

    try {
      const init: RequestInit = {
        method: options.method,
        headers: this.headers(options.headers, request),
        signal: controller.signal,
      };

      if (request !== undefined) {
        init.body = JSON.stringify(request);
      }

      const response = await this.fetchFn(url, init);

      return await this.parseResponse<TResponse>(
        response,
        url.toString(),
        options.responseType ?? "json",
      );
    } catch (error) {
      if (error instanceof YandexDeliveryError) {
        throw error;
      }

      const isAbort = error instanceof Error && error.name === "AbortError";
      throw new YandexDeliveryError({
        message: isAbort ? "Yandex Delivery request timed out." : "Yandex Delivery request failed.",
        endpoint: url.toString(),
        code: isAbort ? "timeout" : "request_error",
        cause: error,
      });
    } finally {
      clearTimeout(timeout);
    }
  }

  private parseRequest<TRequest>(options: EndpointOptions<TRequest>): TRequest | undefined {
    const request = options.request ?? (options.body as TRequest | undefined);
    if (!this.validateInput || !options.schema || request === undefined) {
      return request;
    }

    const result = options.schema.safeParse(request);
    if (!result.success) {
      throw new YandexDeliveryValidationError({
        endpoint: `${this.baseUrl}${options.path}`,
        details: result.error.flatten(),
      });
    }

    return result.data;
  }

  private headers(extra: Record<string, string> | undefined, request: unknown): Headers {
    const headers = new Headers(extra);
    headers.set("Authorization", `Bearer ${this.token}`);
    headers.set("Accept", headers.get("Accept") ?? "application/json");
    headers.set("Accept-Language", "ru");

    if (request !== undefined && !headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }

    if (this.userAgent && !headers.has("User-Agent")) {
      headers.set("User-Agent", this.userAgent);
    }

    return headers;
  }

  private async parseResponse<TResponse>(
    response: Response,
    endpoint: string,
    responseType: ResponseType,
  ): Promise<TResponse> {
    const requestId =
      response.headers.get("x-request-id") ??
      response.headers.get("x-yandex-request-id") ??
      undefined;

    if (!response.ok) {
      const details = await readErrorBody(response);
      throw new YandexDeliveryError({
        message: `Yandex Delivery API responded with ${response.status}.`,
        endpoint,
        status: response.status,
        code: extractErrorCode(details),
        details,
        requestId,
      });
    }

    if (response.status === 204 || responseType === "void") {
      return undefined as TResponse;
    }

    if (responseType === "arrayBuffer") {
      return (await response.arrayBuffer()) as TResponse;
    }

    if (responseType === "text") {
      return (await response.text()) as TResponse;
    }

    const text = await response.text();
    if (!text) {
      return undefined as TResponse;
    }

    return JSON.parse(text) as TResponse;
  }
}

export function appendQuery(url: URL, query: QueryParams | undefined): void {
  if (!query) {
    return;
  }

  for (const [key, value] of Object.entries(query)) {
    const values = Array.isArray(value) ? value : [value];
    for (const item of values) {
      if (item !== undefined && item !== null) {
        url.searchParams.append(key, String(item));
      }
    }
  }
}

async function readErrorBody(response: Response): Promise<unknown> {
  const text = await response.text();
  if (!text) {
    return undefined;
  }

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

function extractErrorCode(details: unknown): string | undefined {
  if (!details || typeof details !== "object") {
    return undefined;
  }

  const record = details as Record<string, unknown>;
  if (typeof record.code === "string") {
    return record.code;
  }
  if (typeof record.error === "string") {
    return record.error;
  }
  if (typeof record.message === "object" && record.message !== null) {
    const message = record.message as Record<string, unknown>;
    return typeof message.code === "string" ? message.code : undefined;
  }

  return undefined;
}
