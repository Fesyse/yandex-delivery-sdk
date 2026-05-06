import { describe, expect, it } from "vitest";
import { YandexDeliveryClient, YandexDeliveryError, YandexDeliveryValidationError } from "../src/index.js";
import { createMockFetch } from "./helpers.js";

describe("http transport", () => {
  it("adds bearer token and serializes json body", async () => {
    const { fetchMock, calls } = createMockFetch({ claim_id: "claim-1" });
    const client = new YandexDeliveryClient({ token: "token", fetch: fetchMock });

    await client.express.claims.info({ claim_id: "claim-1" });

    expect(calls[0]?.url).toBe(
      "https://b2b.taxi.yandex.net/b2b/cargo/integration/v2/claims/info",
    );
    expect(calls[0]?.init?.method).toBe("POST");
    expect((calls[0]?.init?.headers as Headers).get("Authorization")).toBe("Bearer token");
    expect(calls[0]?.init?.body).toBe(JSON.stringify({ claim_id: "claim-1" }));
  });

  it("serializes query parameters for GET requests", async () => {
    const { fetchMock, calls } = createMockFetch({});
    const client = new YandexDeliveryClient({ token: "token", fetch: fetchMock });

    await client.otherDay.requests.info({ request_id: "request-1", slim: true });

    expect(calls[0]?.url).toBe(
      "https://b2b-authproxy.taxi.yandex.net/api/b2b/platform/request/info?request_id=request-1&slim=true",
    );
    expect(calls[0]?.init?.method).toBe("GET");
  });

  it("throws validation errors before sending invalid requests", async () => {
    const { fetchMock, calls } = createMockFetch({});
    const client = new YandexDeliveryClient({ token: "token", fetch: fetchMock });

    await expect(client.express.claims.create({ route_points: [] })).rejects.toBeInstanceOf(
      YandexDeliveryValidationError,
    );
    expect(calls).toHaveLength(0);
  });

  it("throws YandexDeliveryError on non-2xx responses", async () => {
    const { fetchMock } = createMockFetch({ code: "bad_request" }, 400);
    const client = new YandexDeliveryClient({ token: "token", fetch: fetchMock });

    await expect(client.express.claims.info({ claim_id: "claim-1" })).rejects.toMatchObject({
      status: 400,
      code: "bad_request",
      requestId: "req-1",
    } satisfies Partial<YandexDeliveryError>);
  });
});
