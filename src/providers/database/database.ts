import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/Rx';
import { Storage } from '@ionic/storage';

@Injectable()
export class DatabaseProvider {
  database: SQLiteObject;
  private databaseReady: BehaviorSubject<boolean>;
  
  constructor(private storage: Storage, private sqlite: SQLite, private platform: Platform, private http: Http) {
    this.databaseReady = new BehaviorSubject(false);
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'shopping.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          this.database = db;
          this.storage.get('database_filled').then(val => {
            if (val) {
              this.databaseReady.next(true);
            } else {
              this.fillDatabase();
            }
          });
        })
          .catch(e => console.log(e));
    });
  }
  // need to add category
  private fillDatabase(){
    
    this.database.executeSql('CREATE TABLE IF NOT EXISTS categories(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT);', {})
    .then(() => {
      
      this.database.executeSql('CREATE TABLE IF NOT EXISTS items(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT,quantity REAL, unitPrice REAL, catid INTEGER REFERENCES categories(id) ON UPDATE CASCADE );', {})
      .then(() => {
        this.database.executeSql('CREATE TABLE IF NOT EXISTS lists(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT, createdAt INTEGER );', {})
        .then(() => {
          this.database.executeSql('CREATE TABLE IF NOT EXISTS list_item(itemid INTEGER NOT NULL REFERENCES items(id), listid INTEGER NOT NULL REFERENCES lists(id), PRIMARY KEY (itemid, listid));', {})
          .then(() => {
            
            this.databaseReady.next(true);
            this.storage.set('database_filled', true);
          })
        })
        
      })
      .catch(e => console.error(e));

      this.databaseReady.next(true);
      this.storage.set('database_filled', true);
    })
    .catch(e => console.error(e));
  }

  addItem(name, quantity, unitPrice) {
    let data = [name, quantity, unitPrice]
    return this.database.executeSql("INSERT INTO items(name, quantity, unitPrice) VALUES (?, ?, ?)", data).then(data => {
      return data;
    }, err => {
      console.log('Error: ', err);
      return err;
    });
  }
 
  getAllItems() {
    return this.database.executeSql("SELECT * FROM items", []).then((data) => {
      let items = [];
      let length = data.rows.length;
      if (length > 0) {
        for (var i = 0; i < length; i++) {
          items.push({ name: data.rows.item(i).name, quantity: data.rows.item(i).quantity, unitPrice: data.rows.item(i).unitPrice });
        }
      }
      return items;
    }, err => {
      console.log('Error: ', err);
      return [];
    });
  }
 
  getDatabaseState() {
    return this.databaseReady.asObservable();
  }
}
