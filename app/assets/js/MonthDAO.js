import Dexie from "https://cdn.jsdelivr.net/npm/dexie@3.0.3/dist/dexie.mjs";

let db;

export default class MonthDAO {
  constructor() {
    this.initializeDB();
  }

  initializeDB() {
    db = new Dexie("home-finance-month-db");

    db.version(1).stores({
      months: "++id,month",
    });

    db.open();
  }

  getAll() {
    return db.months.toArray();
  }

  get(id) {
    return db.months.get(id);
  }

  save(month) {
    return db.months.put(month);
  }
}