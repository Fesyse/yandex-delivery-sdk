import { describe, expect, it } from "vitest";
import { YandexDeliveryClient } from "../src/index.js";
import { createMockFetch } from "./helpers.js";

const requestDraft = {
  info: { operator_request_id: "order-1" },
  source: { platform_station: { platform_id: "station-1" } },
  destination: { location: { address: "Moscow" } },
};

describe("other-day client", () => {
  it("uses testing host for other-day testing environment", async () => {
    const { fetchMock, calls } = createMockFetch({});
    const client = new YandexDeliveryClient({
      token: "token",
      fetch: fetchMock,
      environment: "testing",
    });

    await client.otherDay.offers.create(requestDraft);

    expect(calls[0]?.url).toBe(
      "https://b2b.taxi.tst.yandex.net/api/b2b/platform/offers/create",
    );
  });

  it("maps documented other-day endpoint groups", async () => {
    const { fetchMock, calls } = createMockFetch({});
    const client = new YandexDeliveryClient({ token: "token", fetch: fetchMock });

    await client.otherDay.pricing.calculate({
      source: requestDraft.source,
      destination: requestDraft.destination,
    });
    await client.otherDay.offers.confirm({ offer_id: "offer-1" });
    await client.otherDay.locations.detect({ address: "Moscow" });
    await client.otherDay.pickupPoints.list({ geo_id: 213 });
    await client.otherDay.documents.generateLabels({ request_ids: ["request-1"] });
    await client.otherDay.merchants.search({});
    await client.otherDay.warehouses.list();
    await client.otherDay.pickups.scheduledList();

    expect(calls.map((call) => new URL(call.url).pathname)).toEqual([
      "/api/b2b/platform/pricing-calculator",
      "/api/b2b/platform/offers/confirm",
      "/api/b2b/platform/location/detect",
      "/api/b2b/platform/pickup-points/list",
      "/api/b2b/platform/request/generate-labels",
      "/api/b2b/platform/merchant/search",
      "/api/b2b/platform/warehouses/list",
      "/api/b2b/platform/pickups/scheduled/list",
    ]);
  });
});
