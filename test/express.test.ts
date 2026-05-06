import { describe, expect, it } from "vitest";
import { YandexDeliveryClient } from "../src/index.js";
import { createMockFetch } from "./helpers.js";

const claimDraft = {
  route_points: [
    { type: "source", address: "Moscow, source" },
    { type: "destination", address: "Moscow, destination" },
  ],
};

describe("express client", () => {
  it("creates claim with v2 path", async () => {
    const { fetchMock, calls } = createMockFetch({ id: "claim-1" });
    const client = new YandexDeliveryClient({ token: "token", fetch: fetchMock });

    await client.express.claims.create({ ...claimDraft, request_id: "request-1" });

    expect(calls[0]?.url).toBe(
      "https://b2b.taxi.yandex.net/b2b/cargo/integration/v2/claims/create",
    );
  });

  it("maps common express endpoints", async () => {
    const { fetchMock, calls } = createMockFetch({});
    const client = new YandexDeliveryClient({ token: "token", fetch: fetchMock });

    await client.express.offers.calculate(claimDraft);
    await client.express.claims.accept({ claim_id: "claim-1", version: 1 });
    await client.express.claims.cancel({ claim_id: "claim-1" });
    await client.express.claims.trackingLinks({ claim_id: "claim-1" });
    await client.express.deliveryMethods.list({ start_point: [37.6, 55.7] });

    expect(calls.map((call) => new URL(call.url).pathname)).toEqual([
      "/b2b/cargo/integration/v2/offers/calculate",
      "/b2b/cargo/integration/v2/claims/accept",
      "/b2b/cargo/integration/v2/claims/cancel",
      "/b2b/cargo/integration/v2/claims/tracking-links",
      "/b2b/cargo/integration/v2/delivery-methods",
    ]);
  });
});
