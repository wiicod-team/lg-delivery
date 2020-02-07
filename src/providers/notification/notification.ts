import {EventEmitter, Injectable} from '@angular/core';
import {ONE_SIGNAL_CONF} from "../../services/contants";
import {isCordovaAvailable} from "../../services/utils";
import {OneSignal, OSNotificationPayload} from '@ionic-native/onesignal';
import {ToastController} from "ionic-angular";
import {CommandPage} from "../../pages/command/command";

/*
  Generated class for the NotificationProvider provider.
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NotificationProvider {

  navigationEvent = new EventEmitter();

  constructor(private oneSignal: OneSignal, public toastCtrl: ToastController) {

  }

  init() {

    if (isCordovaAvailable()) {
      console.log('app initing',ONE_SIGNAL_CONF.app_id, ONE_SIGNAL_CONF.sender_id);
      this.oneSignal.startInit(ONE_SIGNAL_CONF.app_id, ONE_SIGNAL_CONF.sender_id);
      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
      this.oneSignal.handleNotificationReceived().subscribe(data => this.onPushReceived(data.payload));
      this.oneSignal.handleNotificationOpened().subscribe(data => this.onPushOpened(data.notification.payload, data.action.actionID));
      this.oneSignal.endInit();
    }

  }

  getDeviceToken() {

    return new Promise((resolve, reject) => {
      if (isCordovaAvailable()) {
        this.oneSignal.getIds().then(identity => {
          resolve(identity.userId);
        });
      } else {
        reject('cordova not installed');
      }
    });
  }

  delivery_reminder(payload: OSNotificationPayload, action?: string) {
    console.log(payload, action);
    if (action === "delivery") {

      this.navigationEvent.next({
        page: CommandPage,
        params:
          {
            id: payload.additionalData.delivery_id,
            type: 'modal'
          }
      })

    }
    else {
      this.navigationEvent.next({
        page: CommandPage,
        params:
          {
            id: payload.additionalData.delivery_id,
          }
      })
    }

  }

  private onPushReceived(payload: OSNotificationPayload) {
    // console.log('Push recevied:', payload);
    let msg: string = "Nouvelle notification: " + payload.title + " " + payload.body
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

  private onPushOpened(payload: OSNotificationPayload, action?: string) {
    console.log('Push opened: ', payload);

    if (payload.additionalData.channel === 'delivery_reminder') {
      this.delivery_reminder(payload, action)
    }
  }
}
