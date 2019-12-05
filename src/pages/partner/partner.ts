import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ApiProvider} from "../../providers/api/api";

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
  constructor(public navCtrl: NavController, public navParams: NavParams, private api:ApiProvider) {
    this.getPartners();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PartnerPage');
  }

  getPartners(){
    this.api.Partners.getList({should_paginate:false, '_sort':'updated_at','_sortDir':'desc','_includes':'town'}).subscribe(d=>{
      this.partners=d;
    })
  }
}
