import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import {NavController} from "ionic-angular";
import {ApiProvider} from "../../providers/api/api";
import {AuthProvider} from "../../providers/auth/auth";
import {Storage} from "@ionic/storage";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor(public navCtrl: NavController, private api:ApiProvider, private auth : AuthProvider, private storage : Storage) {

  }

  logout(){
    console.log("aze");
    this.auth.logout().then(d=>{
      this.api.doToast('Deconnecté',2000);
      this.storage.set('user',undefined);
      this.navCtrl.popAll();
    })
  }
}
