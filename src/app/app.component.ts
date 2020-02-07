import {Component, ViewChild} from '@angular/core';
import {ModalController, Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {LoginPage} from "../pages/login/login";
import {NotificationProvider} from "../providers/notification/notification";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = LoginPage;
  @ViewChild(Nav) nav: Nav;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              private notif: NotificationProvider, public modalCtrl: ModalController,) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      //onesignal init
      this.notif.init();
      this.notif.navigationEvent.subscribe(
        data => {
          // this.nav.push(data.page, data.params);
          if (data.params && data.params.type == 'modal') {
            let profileModal = this.modalCtrl.create(data.page, data.params);
            profileModal.present();
          } else {
            this.nav.push(data.page, data.params);
          }

        }
      );
    });
  }
}
