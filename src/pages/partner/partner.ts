import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import {ApiProvider} from "../../providers/api/api";
import {LoadingProvider} from "../../providers/loading/loading";

/**
 * Generated class for the PartnerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-partner',
  templateUrl: 'partner.html',
})
export class PartnerPage {
  partners=[];
  constructor(public navCtrl: NavController, public load: LoadingProvider, private api:ApiProvider) {
    this.getPartners();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PartnerPage');
  }

  doRefresh(refresher) {
    //console.log('Begin async operation', refresher);
    this.getPartners();
    setTimeout(() => {
      refresher.complete();
    }, 700);
  }

  getPartners(){
    this.load.show("des partenaires");
    this.api.Partners.getList({should_paginate:false, '_sort':'updated_at','_sortDir':'desc','_includes':'town'}).subscribe(d=>{
      this.partners=d;
      this.load.close();
    },d=>{
      this.load.close();
      this.api.doToast(d.status+" : Erreur dans le chargement des données, merci d'actualiser la page",5000);
    })
  }
}
