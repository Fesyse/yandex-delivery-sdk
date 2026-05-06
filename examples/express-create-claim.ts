import { YandexDeliveryClient } from "../src/index.js";

const client = new YandexDeliveryClient({
  token: process.env.YANDEX_DELIVERY_TOKEN!,
});

await client.express.claims.create({
  request_id: "order-1001",
  route_points: [
    { type: "source", address: "Москва, Ленинградский проспект 27" },
    { type: "destination", address: "Москва, Ленинградский проспект 37 к9" },
  ],
  items: [{ title: "Order", weight: 1, quantity: 1 }],
});
