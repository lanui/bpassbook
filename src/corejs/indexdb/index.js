import {openDB} from 'idb'

const DEFAULT_DB_SCHEMA = "bpassbook"

import { DB_SCHEMAS, ACCOUNT_SCHEMA, BOOK_SCHEMA} from './enums'

class IDB {
  constructor(opts={}){
    this.dbName = opts.dbName || DEFAULT_DB_SCHEMA
    this.dbVersion = opts.dbVersion || 1
    this.initialzeDB()
  }

  async initialzeDB(){
    this.db = await openDB(this.dbName,this.dbVersion,{
      upgrade(db, oldVer, newVer, transaction) {
        DB_SCHEMAS.forEach(schema =>{
          db.createObjectStore(schema)
        })

        console.log("IndexDB",db,oldVer,newVer)
      }
    })
  }

  async get(tbName,key) {
    this._valid(tbName, key)
    return (await this.db).get(tbName,key)
  }

  async set(tbName, key,val) {
    this._valid(tbName, key)
    return (await this.db).put(tbName,val, key)
  }


  async getAccount(key) {
    _validKey(key)
    return (await this.db).get(ACCOUNT_SCHEMA, key)
  }
  async setAccount(key,val) {
    _validKey(key)
    return (await this.db).put(ACCOUNT_SCHEMA, val, key)
  }

  async getPassbook(key) {
    _validKey(key)
    return (await this.db).get(BOOK_SCHEMA, key)
  }
  async setPassbook(pb) {
    const { key, tips } = pb
    _validKey(key || tips)
    key = tips
    return (await this.db).put(BOOK_SCHEMA, val, key)
  }
}



function _validKey(key){
  if (typeof key === 'undefined') {
    throw new Error('Key must entry.')
  }
}

function _valid(tbName, key) {
  if (!DB_SCHEMAS.includes(tbName)) {
    throw new Error('Schema ' + tbName + ' not exists.')
  }
  if (typeof key === 'undefined') {
    throw new Error('Key must entry.')
  }
}

const IDB_MGR = new IDB()

export default IDB_MGR
