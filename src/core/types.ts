export type Environment = "production" | "testing";

export type MaybePromise<T> = T | Promise<T>;

export type FetchLike = (input: string | URL | Request, init?: RequestInit) => Promise<Response>;

export type Brand<T, TBrand extends string> = T & { readonly __brand: TBrand };

export type ExpressClaimId = Brand<string, "ExpressClaimId">;
export type ExpressOfferId = Brand<string, "ExpressOfferId">;
export type OtherDayRequestId = Brand<string, "OtherDayRequestId">;
export type OtherDayOfferId = Brand<string, "OtherDayOfferId">;
export type PlatformStationId = Brand<string, "PlatformStationId">;
export type MerchantId = Brand<string, "MerchantId">;

export type QueryValue = string | number | boolean | null | undefined;
export type QueryParams = Record<string, QueryValue | QueryValue[]>;

export type ResponseType = "json" | "text" | "arrayBuffer" | "void";

export type RequestOptions = {
  query?: QueryParams;
  body?: unknown;
  headers?: Record<string, string>;
  timeoutMs?: number;
  responseType?: ResponseType;
};

export type YandexDeliveryClientOptions = {
  token: string;
  environment?: Environment;
  fetch?: FetchLike;
  timeoutMs?: number;
  userAgent?: string;
  baseUrls?: {
    express?: string;
    otherDay?: string;
  };
  validateInput?: boolean;
};
