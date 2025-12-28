export default class Person {
  constructor({ id, vehicle, kmTraveled, from, to }) {
    this.id = id;
    this.vehicle = vehicle;
    this.kmTraveled = kmTraveled;
    this.from = from;
    this.to = to;
  }

  formatted(language) {
    const mapDate = (date) => {
      const [year, month, day] = date.split("-").map(Number);
      return new Date(year, month - 1, day);
    };
    return {
      id: Number(this.id),
      vehicle: new Intl.ListFormat(language, {
        style: "long",
        type: "conjunction",
      }).format(this.vehicle),
      kmTraveled: new Intl.NumberFormat(language, {
        style: "unit",
        unit: "kilometer",
      }).format(this.kmTraveled),
      from: new Intl.DateTimeFormat(language, {
        month: "long",
        day: "2-digit",
        year: "numeric",
      }).format(mapDate(this.from)),
      to: new Intl.DateTimeFormat(language, {
        month: "long",
        day: "2-digit",
        year: "numeric",
      }).format(mapDate(this.to)),
    };
  }

  static generateInstanceFromString(text) {
    const EMPTY_SPACE = " ";
    const [id, vehicle, kmTraveled, from, to] = text.split(EMPTY_SPACE);
    const person = new Person({
      id,
      vehicle: vehicle.split(","),
      from,
      kmTraveled,
      to,
    });
    return person;
  }
}
