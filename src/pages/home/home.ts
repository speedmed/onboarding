import { Component, ViewChild } from '@angular/core';
import { trigger, transition, style, state, animate, keyframes } from '@angular/animations';
import { NavController, Slides } from 'ionic-angular';
import { ListsPage } from '../lists/lists';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  animations: [
    
  trigger('bounce', [
        state('*', style({
            transform: 'translateX(0)'
        })),
        transition('* => rightSwipe', animate('700ms ease-out', keyframes([
          style({transform: 'translateX(0)', offset: 0}),
          style({transform: 'translateX(-65px)',  offset: 0.3}),
          style({transform: 'translateX(0)',     offset: 1.0})
        ]))),
        transition('* => leftSwipe', animate('700ms ease-out', keyframes([
          style({transform: 'translateX(0)', offset: 0}),
          style({transform: 'translateX(65px)',  offset: 0.3}),
          style({transform: 'translateX(0)',     offset: 1.0})
        ])))
    ])
  ]
})
export class HomePage {
  @ViewChild(Slides) slides: Slides;
  skipMsg: string = "skip";
  state: string = "initState";

  constructor(public navCtrl: NavController) {
    
  }

  skip(){
    this.navCtrl.push(ListsPage);
  }

  slideChanged(){
    if(this.slides.isEnd())
      this.skipMsg = "Alright, I got it";
  }

  slideMoved(){
    if(this.slides.getActiveIndex() >= this.slides.getPreviousIndex())
      this.state = "rightSwipe";
    else
      this.state = "leftSwipe";
  }

  animationDone(){
    this.state = "initState";
  }
}
