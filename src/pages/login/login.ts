import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";
import {AuthProvider} from "../../providers/auth/auth";
import { Storage } from '@ionic/storage';
import {ApiProvider} from "../../providers/api/api";
import {LoadingProvider} from "../../providers/loading/loading";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user:any;



  constructor(public navCtrl: NavController, public navParams: NavParams,
              public auth: AuthProvider, private storage: Storage,public api:ApiProvider,
  public load:LoadingProvider) {


    this.user= {
      email:"",
      password:""
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    if(this.user.email=="" || this.user.password==""){
      this.api.doToast("Merci de remplir tous les champs",3000);
    }
    else{
      this.load.show("");
      this.auth.login(this.user).then((rep)=>{
        console.log('authrep', rep);
        this.storage.set('user',rep).then(d=>{
          setTimeout( () => {
            this.load.close();
            this.navCtrl.push(TabsPage);
          }, 100);
        });
      }).catch((err)=>{
        console.log(err)
        if(err.data.status==400){
          this.api.doToast("Compte inactif",3000);
        }
      })
    }
  }

}
