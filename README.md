# yandex-delivery-sdk

TypeScript SDK for Yandex Delivery APIs:

- Express delivery / same-day delivery
- Delivery across Russia, also called other-day delivery in the API docs

The SDK is a typed wrapper over `fetch` for Node.js 18+. It validates request inputs with Zod and leaves responses as TypeScript-typed JSON.

## Install

```bash
npm install yandex-delivery-sdk
```

## Express delivery

```ts
import { YandexDeliveryClient } from "yandex-delivery-sdk";

const client = new YandexDeliveryClient({
  token: process.env.YANDEX_DELIVERY_TOKEN!,
});

const claim = await client.express.claims.create({
  request_id: "order-1001",
  route_points: [
    {
      type: "source",
      address: "Москва, Ленинградский проспект 27",
      contact: { name: "Store", phone: "+79990000000" },
    },
    {
      type: "destination",
      address: "Москва, Ленинградский проспект 37 к9",
      contact: { name: "Customer", phone: "+79990000001" },
    },
  ],
  items: [{ title: "Order", weight: 1, quantity: 1 }],
});

const info = await client.express.claims.info({ claim_id: String(claim.id ?? claim.claim_id) });
```

## Delivery Across Russia

```ts
import { YandexDeliveryClient } from "yandex-delivery-sdk";

const client = new YandexDeliveryClient({
  token: process.env.YANDEX_DELIVERY_TOKEN!,
  environment: "production",
});

const offers = await client.otherDay.offers.create({
  info: { operator_request_id: "order-1002" },
  source: {
    platform_station: { platform_id: "your-platform-station-id" },
  },
  destination: {
    location: { address: "Москва, Ленинградский проспект 37 к9" },
    contact: { first_name: "Ivan", phone: "+79990000001" },
  },
  places: [
    {
      physical_dims: { weight_gross: 1000, dx: 10, dy: 10, dz: 10 },
    },
  ],
});

if (offers.offers?.[0]) {
  await client.otherDay.offers.confirm({ offer_id: offers.offers[0].offer_id });
}
```

## Environments

```ts
new YandexDeliveryClient({
  token: "...",
  environment: "testing",
});
```

Default hosts:

- Express production: `https://b2b.taxi.yandex.net`
- Other-day production: `https://b2b-authproxy.taxi.yandex.net`
- Other-day testing: `https://b2b.taxi.tst.yandex.net`

Express testing host can be passed explicitly:

```ts
new YandexDeliveryClient({
  token: "...",
  environment: "testing",
  baseUrls: {
    express: "https://your-express-test-host.example",
  },
});
```

## Errors

```ts
import { YandexDeliveryError } from "yandex-delivery-sdk";

try {
  await client.express.claims.info({ claim_id: "missing" });
} catch (error) {
  if (error instanceof YandexDeliveryError) {
    console.error(error.status, error.code, error.details, error.requestId);
  }
}
```

## Security

Do not use the SDK from browser code. Yandex Delivery API tokens must stay on a trusted backend.

## Development

Use Git Bash for project commands:

```bash
pnpm install
pnpm typecheck
pnpm test
pnpm build
```
