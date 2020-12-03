import Dexie from "https://cdn.jsdelivr.net/npm/dexie@3.0.3/dist/dexie.mjs";

let db;

export default class TagDAO {
  constructor() {
    this.initializeDB();
  }

  initializeDB() {
    db = new Dexie("home-finance-tags");

    db.version(1).stores({
      tags: "++id,tag",
    });

    db.open();
  }

  getAll() {
    return db.tags.toArray();
  }

  get(id) {
    return db.tags.get(id);
  }

  save(task) {
    return db.tags.put(task);
  }

  delete(id) {
    return db.tags.delete(id);
  }
}