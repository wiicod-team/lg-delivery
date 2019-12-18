import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import {NavController} from "ionic-angular";
import {Storage} from "@ionic/storage";
import {PartnerPage} from "../partner/partner";
import {LoginPage} from "../login/login";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = PartnerPage;

  constructor(public navCtrl: NavController, private storage : Storage) {

  }

  logout(){
    console.log("aze");
    this.storage.set('user',undefined);
    this.navCtrl.push(LoginPage);
  }
}
