import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ApiProvider} from "../../providers/api/api";

/**
 * Generated class for the CommandPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-command',
  templateUrl: 'command.html',
})
export class CommandPage {
  bill={bill_products:[],deliveries:[{}]};
  b:{body:{}};
  id=0;

  constructor(public navCtrl: NavController, public navParams: NavParams, private api : ApiProvider) {
    this.getBill(this.navParams.get('id'));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommandPage');
  }

  closeModal() {
    this.navCtrl.pop();
  }

  getBill(id){
    this.api.Bills.get(id,{_includes:'bill_products.product,deliveries'}).subscribe(d=>{
      console.log(d);
      if(d.body.deliveries==undefined){
        d.body.deliveries=[];
      }
      this.bill=d.body;
      this.b=d;
    })
  }

  delivered(){
    if(this.id==0){
      // @ts-ignore
      this.b.status='delivered';
      // @ts-ignore
      this.b.id=this.b.body.id;
      // @ts-ignore
      this.b.put().subscribe(da=>{
        console.log("ok bill");
        da.body.deliveries=[];
        this.bill=da.body;

        this.api.doToast("Commande livrée",3000);
      })
    }
    else{
      this.api.Deliveries.get(this.id).subscribe(d=>{
        d.id=d.body.id;
        d.status='delivered';
        d.put().subscribe(data=>{
          console.log("OK");
          this.api.doToast("Commande livrée. Merci de vous rapprocher de la boutique pour percevoir les frais de livraisons",3000);
          // @ts-ignore
          this.b.status='delivered';
          // @ts-ignore
          this.b.id=this.b.body.id;
          // @ts-ignore
          this.b.put().subscribe(da=>{
            console.log("ok bill");
            this.bill=da.body;
            this.bill.deliveries=data.body;
          })
        })
      })
    }

  }

  doRefresh(refresher) {
    //console.log('Begin async operation', refresher);
    this.getBill(this.navParams.get('id'));
    setTimeout(() => {
      refresher.complete();
    }, 700);
  }
}
