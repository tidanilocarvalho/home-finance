import Dexie from "https://cdn.jsdelivr.net/npm/dexie@3.0.3/dist/dexie.mjs";

let db;

export default class IndexDAO {
  constructor() {
    this.initializeDB();
  }

  initializeDB() {
    db = new Dexie("home-finance-expenses-db");

    db.version(1).stores({
      expenses: "++id,expense",
    });

    db.open();
  }

  getAll() {
    return db.expenses.toArray();
  }

  get(id) {
    return db.expenses.get(id);
  }

  save(expense) {
    return db.expenses.put(expense);
  }
}