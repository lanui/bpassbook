import { openDB } from 'idb';

const DEFAULT_DB_SCHEMA = 'bpassbook';
const DB_VERSION = 2;

import { DB_SCHEMAS, ACCOUNT_SCHEMA, BOOK_SCHEMA, GITBOOK_SCHEMA } from './enums';

class IDB {
  constructor(opts = {}) {
    this.dbName = opts.dbName || DEFAULT_DB_SCHEMA;
    this.dbVersion = DB_VERSION;
    this.initialzeDB();
  }

  async initialzeDB() {
    this.db = await openDB(this.dbName, this.dbVersion, {
      upgrade(db, oldVer, newVer, transaction) {
        DB_SCHEMAS.forEach((schema) => {
          db.createObjectStore(schema);
        });

        console.log('IndexDB', db, oldVer, newVer);
      },
    });
  }

  async get(tbName, key) {
    this._valid(tbName, key);
    return (await this.db).get(tbName, key);
  }

  async set(tbName, key, val) {
    this._valid(tbName, key);
    return (await this.db).put(tbName, val, key);
  }

  async getKeys(tbName) {
    return (await this.db).getAllKeys(tbName);
  }

  async clear(tbName) {
    return (await this.db).clear(tbName);
  }

  async delete(tbName, key) {
    return (await this.db).delete(tbName, key);
  }

  async getAccount(key) {
    _validKey(key);
    return (await this.db).get(ACCOUNT_SCHEMA, key);
  }
  async setAccount(key, val) {
    _validKey(key);
    return (await this.db).put(ACCOUNT_SCHEMA, val, key);
  }

  /**
   *
   * @param {*} key
   * @param {*} items
   */
  async setGitbook(key, items) {
    //
    _validKey(key);
    return (await this.db).put(GITBOOK_SCHEMA, items, key);
  }

  async getGitbooks(key) {
    _validKey(key);
    return (await this.db).get(GITBOOK_SCHEMA, key);
  }

  /** Passbook */
  async getPassbook(key) {
    _validKey(key);
    return (await this.db).get(BOOK_SCHEMA, key);
  }
  async setPassbook(key, pb) {
    return (await this.db).put(BOOK_SCHEMA, pb, key);
  }

  async getAllPassbook() {
    return (await this.db).getAll(BOOK_SCHEMA);
  }

  async getAllPassbookKeys() {
    return (await this.db).getAllKeys(BOOK_SCHEMA);
  }

  async deletePassbook(key) {
    return (await this.db).delete(BOOK_SCHEMA, key);
  }

  async clearPassbook() {
    return (await this.db).clear(BOOK_SCHEMA);
  }
}

function _validKey(key) {
  if (typeof key === 'undefined') {
    throw new Error('Key must entry.');
  }
}

function _valid(tbName, key) {
  if (!DB_SCHEMAS.includes(tbName)) {
    throw new Error('Schema ' + tbName + ' not exists.');
  }
  if (typeof key === 'undefined') {
    throw new Error('Key must entry.');
  }
}

const IDB_MGR = new IDB();

export default IDB_MGR;
