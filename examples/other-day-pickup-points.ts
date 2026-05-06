import { YandexDeliveryClient } from "../src/index.js";

const client = new YandexDeliveryClient({
  token: process.env.YANDEX_DELIVERY_TOKEN!,
  environment: "testing",
});

const points = await client.otherDay.pickupPoints.list({ geo_id: 213 });
console.log(points);
