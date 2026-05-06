import { YandexDeliveryClient } from "../src/index.js";

const client = new YandexDeliveryClient({
  token: process.env.YANDEX_DELIVERY_TOKEN!,
});

const info = await client.express.claims.info({
  claim_id: process.env.YANDEX_DELIVERY_CLAIM_ID!,
});

console.log(info.status);
