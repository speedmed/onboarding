import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';
import { SQLite } from '@ionic-native/sqlite';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { DatabaseProvider } from '../providers/database/database';
import { ItemsPageModule } from '../pages/items/items.module';
import { ListsPageModule } from '../pages/lists/lists.module';
import { AddItemPageModule } from '../pages/add-item/add-item.module';
import { AddListPageModule } from '../pages/add-list/add-list.module';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule,
    BrowserAnimationsModule,
    ItemsPageModule,
    ListsPageModule,
    AddItemPageModule,
    AddListPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SQLite,
    DatabaseProvider
  ]
})
export class AppModule {}
