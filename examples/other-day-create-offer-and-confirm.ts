import { YandexDeliveryClient } from "../src/index.js";

const client = new YandexDeliveryClient({
  token: process.env.YANDEX_DELIVERY_TOKEN!,
  environment: "testing",
});

const offers = await client.otherDay.offers.create({
  info: { operator_request_id: "order-1002" },
  source: {
    platform_station: { platform_id: "fbed3aa1-2cc6-4370-ab4d-59c5cc9bb924" },
  },
  destination: {
    location: { address: "Москва, Ленинградский проспект 37 к9" },
    contact: { first_name: "Ivan", phone: "+79990000001" },
  },
  places: [{ physical_dims: { weight_gross: 1000, dx: 10, dy: 10, dz: 10 } }],
});

if (offers.offers?.[0]) {
  await client.otherDay.offers.confirm({ offer_id: offers.offers[0].offer_id });
}
