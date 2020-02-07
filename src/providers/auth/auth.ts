import {Injectable} from '@angular/core';
import {ApiProvider} from "../api/api";
import {NotificationProvider} from "../notification/notification";
import * as _ from 'lodash';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  public token: string;
  public token_key: string='jwt_token';

  constructor(public api: ApiProvider,private notif: NotificationProvider) {
    console.log('Hello AuthProvider Provider');
    this.token = localStorage.getItem(this.token_key)
  }

  isLogged(): boolean {
    //console.log("z");
    return localStorage.getItem(this.token_key) != undefined;
  }

  login(credentials:{email:string,password:string}) {
    return new Promise((resolve, reject) => {
      this.api.restangular.all('auth/signin').post(credentials)
        .subscribe( (response)=> {
          console.log(response);
          let data = response.body.data;
          localStorage.setItem(this.token_key,data.token);
          localStorage.setItem('user',data.user);
          this.save_token(data.user);
          /*angular.forEach(data.userRole, function (value) {
            AclService.attachRole(value)
          });

          AclService.setAbilities(data.abilities);
          $auth.setToken(response.data);*/
          resolve(data);
        }, function (error) {
          console.log(error);
          /*if (error.status == 401) {
            var errors = error.data.errors;
            for (var key in errors) {
              if (errors.hasOwnProperty(key)) {
                var txt = errors[key][0];
                for (var i = 1; i < errors[key].length; i++) {
                  txt += "<br>" + errors[key][i];
                }
                key = key.split("_").join(" ");
                ToastApi.error({'msg': txt})
              }
            }
          }*/
          reject(error)
        });
    });

  }
  register(credentials:{name:string,phone:number,email:string,password:string}) {
    return new Promise((resolve, reject) => {
      this.api.restangular.all('auth/signup').post(credentials)
        .subscribe( (response)=> {
          let data = response.body.data;
          localStorage.setItem(this.token_key,data.token);
          localStorage.setItem('user',data.user);

          resolve(data);
        }, function (error) {
          console.log(error);

          reject(error)
        });
    });

  }

  update_info(credentials: {
    id: number, name?: string, phone?: string, email?: string,
    password: string
  }) {
    return new Promise((resolve, reject) => {
      this.api.restangular.all('auth/update_info').post(credentials)
        .subscribe((response) => {
          let data = response.body.data;
          localStorage.setItem(this.token_key, data.token);
          localStorage.setItem('user', data.user);

          resolve(data);
        }, function (error) {
          console.log(error);

          reject(error)
        });
    });

  }

  logout () {
    return   new Promise((resolve, reject) => {
      localStorage.removeItem(this.token_key);
      localStorage.removeItem('user');
      resolve(true)
      // AclService.flushRoles();
      // AclService.setAbilities({});
    });
  }

  getContext () {
    return   new Promise((resolve, reject) => {
      if(this.isLogged()){
        resolve(localStorage.getItem('user'))

      }else {
        reject('not logged')
      }
      // AclService.flushRoles();
      // AclService.setAbilities({});
    });
  }

  save_token(user) {

    return new Promise((resolve, reject) => {
      this.notif.getDeviceToken().then((token) => {
        if (Array.isArray(user.device_tokens)) {
          if (_.indexOf(user.device_tokens, token) < 0)
            user.device_tokens.push(token);
        } else {
          user.device_tokens = [token];
        }
        this.update_info(user);
        resolve(user)
      }).catch((err) => {
        // reject(err);
        console.log(err)});
    });

  }


}
