import { resolveOptions } from "./core/config.js";
import { HttpClient } from "./core/http.js";
import { YandexDeliveryClientOptions } from "./core/types.js";
import { ExpressClient } from "./express/client.js";
import { OtherDayClient } from "./other-day/client.js";

export class YandexDeliveryClient {
  readonly express: ExpressClient;
  readonly otherDay: OtherDayClient;

  constructor(options: YandexDeliveryClientOptions) {
    const resolved = resolveOptions(options);
    const common = {
      token: resolved.token,
      fetch: resolved.fetch,
      timeoutMs: resolved.timeoutMs,
      validateInput: resolved.validateInput,
      ...(resolved.userAgent ? { userAgent: resolved.userAgent } : {}),
    };

    this.express = new ExpressClient(
      new HttpClient({
        ...common,
        baseUrl: resolved.baseUrls.express,
      }),
    );
    this.otherDay = new OtherDayClient(
      new HttpClient({
        ...common,
        baseUrl: resolved.baseUrls.otherDay,
      }),
    );
  }
}
