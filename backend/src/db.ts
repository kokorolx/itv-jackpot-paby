import * as loki from 'lokijs';

const db = new loki('main.db');

const initDB = () => {
  db.addCollection('games');

  return true;
};

export {
  initDB,
  db
}
