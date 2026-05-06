import { Environment, FetchLike, YandexDeliveryClientOptions } from "./types.js";

export type ResolvedClientOptions = {
  token: string;
  environment: Environment;
  fetch: FetchLike;
  timeoutMs: number;
  userAgent?: string;
  validateInput: boolean;
  baseUrls: {
    express: string;
    otherDay: string;
  };
};

const DEFAULT_TIMEOUT_MS = 30_000;

export function resolveOptions(options: YandexDeliveryClientOptions): ResolvedClientOptions {
  const environment = options.environment ?? "production";
  const fetchFn = options.fetch ?? globalThis.fetch;

  if (!fetchFn) {
    throw new Error("A fetch implementation is required. Use Node.js 18+ or pass options.fetch.");
  }

  const resolved = {
    token: options.token,
    environment,
    fetch: fetchFn.bind(globalThis) as FetchLike,
    timeoutMs: options.timeoutMs ?? DEFAULT_TIMEOUT_MS,
    validateInput: options.validateInput ?? true,
    baseUrls: {
      express: options.baseUrls?.express ?? defaultExpressBaseUrl(),
      otherDay: options.baseUrls?.otherDay ?? defaultOtherDayBaseUrl(environment),
    },
  };

  if (options.userAgent !== undefined) {
    return { ...resolved, userAgent: options.userAgent };
  }

  return resolved;
}

function defaultExpressBaseUrl(): string {
  return "https://b2b.taxi.yandex.net";
}

function defaultOtherDayBaseUrl(environment: Environment): string {
  return environment === "testing"
    ? "https://b2b.taxi.tst.yandex.net"
    : "https://b2b-authproxy.taxi.yandex.net";
}
