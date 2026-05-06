import { writeFile } from "node:fs/promises";
import { YandexDeliveryClient } from "../src/index.js";

const client = new YandexDeliveryClient({
  token: process.env.YANDEX_DELIVERY_TOKEN!,
});

const labels = await client.otherDay.documents.generateLabels({
  request_ids: [process.env.YANDEX_DELIVERY_REQUEST_ID!],
});

await writeFile("labels.pdf", Buffer.from(labels));
