import {Injectable} from "@angular/core";
import {LoadingController} from "ionic-angular";


@Injectable()
export class LoadingProvider {

  loader:any;
  constructor(public loadingCtrl: LoadingController) { }


  show(text) {
    console.log("text");
    this.loader = this.loadingCtrl.create({
      content: "Chargement "+text
    });
    this.loader.present();
    setTimeout(() => {
      this.loader.dismiss();
      console.log("arret du loading");
    }, 10000)
  }

  close(){
    this.loader.dismiss();
  }
}
