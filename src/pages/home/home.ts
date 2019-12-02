import { Component } from '@angular/core';
import {ModalController, NavController} from 'ionic-angular';
import {CommandPage} from "../command/command";
import {ApiProvider} from "../../providers/api/api";
import * as _ from 'lodash';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  bills=[];
  bill_paid=[];
  bill_pending=[];
  pet = 'pending';

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, private api : ApiProvider) {
    this.getBills();
  }

  detailCommand(id){
    let profileModal = this.modalCtrl.create(CommandPage, { id: id });
    profileModal.present();
  }

  getBills(){
    this.api.Bills.getList({should_paginate:false,'_sort':'id', '_sortDir':'desc','_includes':'deliveries'}).subscribe(d=>{
      d.forEach(function(v,k){
        if(v.deliveries.length<=0){
          v.deliveries=[{is_express:0}];
        }
      });
      // @ts-ignore
      this.bill_paid=_.filter(d,{status:'delivered'});
      // @ts-ignore
      this.bill_pending=_.filter(d,{status:'pending'});
      this.bills=this.bill_pending;
      console.log(d);
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
    if(t=='pending'){
      this.bills=this.bill_pending;
    }
    else{
      this.bills=this.bill_paid;
    }
  }
}
