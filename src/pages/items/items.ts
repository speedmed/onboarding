import { Component } from '@angular/core';
import { DatabaseProvider } from './../../providers/database/database';
import { IonicPage, NavController, Platform, AlertController, ModalController, NavParams } from 'ionic-angular';

import { AddItemPage } from '../add-item/add-item';

@IonicPage()
@Component({
  selector: 'page-items',
  templateUrl: 'items.html',
})
export class ItemsPage {
    listName;
  item = {};
  items = [{name:"Item 1"}, {name:"Item 2"}, {name:"Item 3"}, {name:"Item 4"}, {name:"Item 5"}];
 
  constructor(private modalCtrl : ModalController, private alertCtrl : AlertController, 
    public navCtrl: NavController, private databaseprovider: DatabaseProvider, 
    private platform: Platform, navParams: NavParams) {

        this.listName = navParams.get("listName")

        this.databaseprovider.getDatabaseState().subscribe(rdy => {
        if (rdy) {
            //this.loadItemData();
        }
        })
  }
 
  loadItemData() {
    this.databaseprovider.getAllItems().then(data => {
      this.items = data;
    })
  }

  public addAlert() {
    let alert = this.alertCtrl.create({
        
        message: "Enter a product and the price of that product",
        inputs: [
            {
                name: "name",
                placeholder: "Item Name"
            },
            {
                name: "quantity",
                placeholder: "Quantity"
            },
            {
                name: "unitPrice",
                placeholder: "Unit Price"
            }
        ],
        buttons: [
            {
                text: "Cancel"
            },
            {
                text: "Save",
                handler: data => {
                    this.items.unshift({
                        name: data.name
                    });
                }
            }
        ]
    });
    alert.present();
}

public addWithModal(){
    let addItem = this.modalCtrl.create(AddItemPage);
    addItem.onDidDismiss(data => {
        if(data != null){
            let name: string = data['name'];
            if(name != undefined && name.trim() != "")
                this.addItem(data);
        }
    });
    addItem.present();
}
 
  addItem(item) {
    let length = this.items.length + 1;
    this.items.unshift({name: item.name});
    // this.databaseprovider.addItem(this.item['name'], parseFloat(this.item['quantity']), parseFloat(this.item['unitPrice']))
    // .then(data => {
    //   this.loadItemData();
    // });
    // this.item = {};
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
  }

}
