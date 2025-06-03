const { faker } = require("@faker-js/faker");
const { join } = require("path");
const { writeFile } = require("fs/promises");

const Car = require("../src/entities/car");
const CarCategory = require("../src/entities/carCategory");
const Customer = require("../src/entities/customer");

const seederBaseFolder = join(__dirname, "..", "database");
const ITEMS_AMOUNT = 2;

const carCategory = new CarCategory({
  id: faker.string.uuid(),
  name: faker.vehicle.type(),
  carIds: [],
  price: faker.finance.amount(20, 100),
});

const cars = [];
const customers = [];
for (let i = 0; i < ITEMS_AMOUNT; i++) {
  const car = new Car({
    id: faker.string.uuid(),
    name: faker.vehicle.model(),
    available: true,
    gasAvailable: true,
    releaseYear: faker.date.past().getFullYear(),
  });
  carCategory.carIds.push(car.id);
  cars.push(car);

  customers.push(
    new Customer({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      age: faker.number.int({ min: 18, max: 50 }),
    })
  );
}

const write = (fileName, data) =>
  writeFile(join(seederBaseFolder, fileName), JSON.stringify(data, null, 4));

(async () => {
  await write("cars.json", cars);
  await write("customers.json", customers);
  await write("carCategories.json", [carCategory]);
  console.log({ cars });
  console.log({ customers });
  console.log({ carCategory });
})();
