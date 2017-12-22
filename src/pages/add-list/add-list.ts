import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-add-list',
  templateUrl: 'add-list.html',
})
export class AddListPage {

  list = {};
  
  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
  }

  submit() {
    this.viewCtrl.dismiss(this.list);
  }

  public cancel(){
    this.viewCtrl.dismiss();
  }

}
