import { YandexDeliveryClient } from "./src";

const client = new YandexDeliveryClient({
  token: "y0__xChraahCBix9Bwgl6HyhRWkTV8cIPSDIvoPzvwVk3Knjy5XoA",
  environment: "testing",
});

const main = async () => {
  const data = await client.express.offers.calculate({
    route_points: [
      {
        type: "source",
        address: "Москва Ленинградский проспект 27",
        coordinates: [37.620159, 55.742278],
        contact: {
          name: "Тест",
          phone: "+79990000000",
        },
      },
      {
        type: "destination",
        address: "Москва Ленинградский проспект 37 к9",
        coordinates: [37.636789, 55.739023],

        contact: {
          name: "Максим",
          phone: "+79954900212",
        },
      },
    ],
    items: [
      {
        title: "Зип худи prayingg",
        weightKg: 1000,
        lengthCm: 10,
        widthCm: 10,
        heightCm: 10,
        quantity: 1,
      },
    ],
  });
  console.log(data);
};
await main();
