export type YandexDeliveryErrorOptions = {
  message: string;
  endpoint: string;
  status?: number | undefined;
  code?: string | undefined;
  details?: unknown;
  requestId?: string | undefined;
  cause?: unknown;
};

export class YandexDeliveryError extends Error {
  readonly endpoint: string;
  readonly status?: number | undefined;
  readonly code?: string | undefined;
  readonly details?: unknown;
  readonly requestId?: string | undefined;

  constructor(options: YandexDeliveryErrorOptions) {
    super(options.message, { cause: options.cause });
    this.name = "YandexDeliveryError";
    this.endpoint = options.endpoint;
    this.status = options.status;
    this.code = options.code;
    this.details = options.details;
    this.requestId = options.requestId;
  }
}

export class YandexDeliveryValidationError extends YandexDeliveryError {
  constructor(options: Omit<YandexDeliveryErrorOptions, "message"> & { details: unknown }) {
    super({
      ...options,
      message: "Yandex Delivery request validation failed.",
      code: "validation_error",
    });
    this.name = "YandexDeliveryValidationError";
  }
}
