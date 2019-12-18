import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {ApiProvider} from "../../providers/api/api";
import {LoadingProvider} from "../../providers/loading/loading";

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
  bill={bill_products:[],deliveries:[{}],customer:{}};
  b:{body:{}};
  id=0;

  constructor(public navCtrl: NavController, public navParams: NavParams, private api : ApiProvider,
              public alertCtrl: AlertController, private load : LoadingProvider) {
    this.getBill(this.navParams.get('id'));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommandPage');
  }

  closeModal() {
    this.navCtrl.pop();
  }

  getBill(id){
    this.load.show("des informations");
    this.api.Bills.get(id,{_includes:'bill_products.product,deliveries,customer'}).subscribe(d=>{
      console.log(d);
      if(d.body.deliveries==undefined){
        d.body.deliveries=[];
      }
      this.bill=d.body;
      this.b=d;
      this.load.close();
    },d=>{
      this.load.close();
      this.api.doToast("Erreur dans le chargement des données, merci d'actualiser la page",5000);
    })
  }

  delivered(){
    if(this.id==0){
      // @ts-ignore
      this.b.status='delivered';
      // @ts-ignore
      this.b.id=this.b.body.id;
      this.load.show("");
      // @ts-ignore
      this.b.put().subscribe(da=>{
        console.log("ok bill");
        da.body.deliveries=[];
        this.bill=da.body;
        this.load.close();
        this.api.doToast("Commande livrée",3000);
      },d=>{
        this.load.close();
        this.api.doToast("Erreur dans le chargement des données, merci d'actualiser la page",5000);
      })
    }
    else{
      this.api.Deliveries.get(this.id).subscribe(d=>{
        d.id=d.body.id;
        d.status='delivered';
        this.load.show("");
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
            this.load.close();
          },d=>{
            this.load.close();
            this.api.doToast("Erreur dans le chargement des données, merci d'actualiser la page",5000);
          })
        },d=>{
          this.load.close();
          this.api.doToast("Erreur dans le chargement des données, merci d'actualiser la page",5000);
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

  confirmPaid() {
    const prompt = this.alertCtrl.create({
      title: 'Confirmation',
      inputs: [
        {
          name: 'code',
          type: 'password',
          placeholder: 'Code secret'
        },
      ],
      buttons: [
        {
          text: 'Annuler',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirmer',
          handler: data => {
            console.log('Saved clicked');
            if(data.code==696870700){
              this.load.show("");
              // @ts-ignore
              this.b.id=this.b.body.id;
              // @ts-ignore
              this.b.status='pending_delivery';
              // @ts-ignore
              this.b.put().subscribe(da=>{
                console.log("ok bill",);
                // @ts-ignore
                da.body.deliveries=this.b.body.deliveries;
                // @ts-ignore
                da.body.customer=this.b.body.customer;
                this.bill=da.body;
                this.load.close();
              },d=>{
                this.load.close();
                this.api.doToast("Erreur dans le chargement des données, merci d'actualiser la page",5000);
              })
            }
          }
        }
      ]
    });
    prompt.present();
  }
}
