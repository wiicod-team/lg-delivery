import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import * as _ from 'lodash';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {HomePageModule} from "../pages/home/home.module";
import {TabsPageModule} from "../pages/tabs/tabs.module";
import {LoadingProvider} from "../providers/loading/loading";
import {AuthProvider} from "../providers/auth/auth";
import {ApiProvider} from "../providers/api/api";
import {RestangularModule} from "ngx-restangular";
import {API_ENDPOINT} from "../services/contants";
import {CommandPageModule} from "../pages/command/command.module";
import {LoginPageModule} from "../pages/login/login.module";
import {IonicStorageModule} from "@ionic/storage";
import {PartnerPageModule} from "../pages/partner/partner.module";
import {NotificationProvider} from "../providers/notification/notification";
import {OneSignal} from "@ionic-native/onesignal";

export function RestangularConfigFactory(RestangularProvider) {
  RestangularProvider
    .setBaseUrl(API_ENDPOINT)
    .addResponseInterceptor(function (data, operation, what, url, response, deferred) {

      if (operation === 'getList') {

        let newResponse = what;
        if (data.per_page===undefined) {

          // newResponse = response.data[what]
          // newResponse.error = response.error
          return data
        }
        newResponse = data.data;
        newResponse.metadata = _.omit(data, 'data');


        return newResponse

      }

      return response
    })
    .addFullRequestInterceptor((element, operation, path, url, headers, params) => {
      /*console.log('element',element);
      console.log('operation',operation);
      console.log('what',what);
      console.log('url',url);
      console.log('headers',headers);
      console.log('params',params);*/

      let token = localStorage.getItem('jwt_token');
      if (token) {
        headers.Authorization = 'Bearer ' + token;
        headers['Access-Token'] = token
      }
    })
  ;
}

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    HomePageModule,
    TabsPageModule,
    LoginPageModule,
    CommandPageModule,
    PartnerPageModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    RestangularModule.forRoot(RestangularConfigFactory),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiProvider,
    AuthProvider,
    LoadingProvider,
    OneSignal,
    NotificationProvider,
  ]
})
export class AppModule {}
