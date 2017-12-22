import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { AddListPage } from '../add-list/add-list';
import { ItemsPage } from '../items/items';

@IonicPage()
@Component({
  selector: 'page-lists',
  templateUrl: 'lists.html',
})
export class ListsPage {

  list = {};
  lists = [{name:"List 1"}, {name:"List 2"}, {name:"List 3"}, {name:"List 4"}, {name:"List 5"}];

  constructor(private modalCtrl : ModalController, public navCtrl: NavController, public navParams: NavParams) {
  }

  public addWithModal(){
    let addList = this.modalCtrl.create(AddListPage);
    addList.onDidDismiss(data => {
      if(data != null){
        let name: string = data['name'];
        if(name != undefined && name.trim() != "")
            this.addList(data);
      }
    });
    addList.present();
}
 
  addList(item) {
    
    this.lists.unshift({name: item.name});
    // this.databaseprovider.addItem(this.item['name'], parseFloat(this.item['quantity']), parseFloat(this.item['unitPrice']))
    // .then(data => {
    //   this.loadItemData();
    // });
    // this.item = {};
  }

  showItems(listName){
    console.log(listName);
    this.navCtrl.push(ItemsPage, {listName: listName});
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ListsPage');
  }

}
