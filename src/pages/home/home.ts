import { Component } from '@angular/core';
import {ModalController, NavController} from 'ionic-angular';
import {CommandPage} from "../command/command";
import {ApiProvider} from "../../providers/api/api";
import * as _ from 'lodash';
import {LoadingProvider} from "../../providers/loading/loading";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  bills=[];
  bill_paid=[];
  bill_not_paid=[];
  bill_pending=[];
  pet = 'pending_payment';

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, private api : ApiProvider, private load : LoadingProvider) {
    this.getBills();
  }

  detailCommand(id){
    let profileModal = this.modalCtrl.create(CommandPage, { id: id });
    profileModal.present();
  }

  getBills(){
    this.load.show("des commandes");
    this.api.Bills.getList({should_paginate:false,'_sort':'updated_at', '_sortDir':'desc','_includes':'deliveries'}).subscribe(d=>{
      d.forEach(function(v,k){
        if(v.deliveries.length<=0){
          v.deliveries=[{is_express:0}];
        }
      });
      // @ts-ignore
      this.bill_not_paid=_.filter(d,{status:'pending_payment'});
      // @ts-ignore
      this.bill_paid=_.filter(d,{status:'delivered'});
      // @ts-ignore
      this.bill_pending=_.filter(d,{status:'pending_delivery'});
      this.bills=this.bill_not_paid;
      console.log("a",d);
      this.load.close();
    },d=>{
      this.load.close();
      this.api.doToast("Erreur dans le chargement des données, merci d'actualiser la page",5000);
    })
  }

  doRefresh(refresher) {
    //console.log('Begin async operation', refresher);
    this.getBills();
    setTimeout(() => {
      refresher.complete();
    }, 700);
  }

  billStatut(t){
    if(t=='pending_delivery'){
      this.bills=this.bill_pending;
    }
    else if(t=='paid'){
      this.bills=this.bill_paid;
    }
    else if(t=='pending_payment'){
      this.bills=this.bill_not_paid;
    }
  }
}
