import {Injectable} from '@angular/core';
import {ToastController} from "ionic-angular";
import {Restangular} from 'ngx-restangular';
/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class ApiProvider {

  public date_format : string = "Y-M-D";
  public autoplay_val=5000;
  public slide_speed=700;
  public produits=[
    {
      id:1,
      name:"Arthro SupReviver",
      category_id:1,
      category:{
        name: 'Nutrivrich Series'
      },
      product_picture:{
        id:1,
        picture1:"assets/imgs/wallpaper/arthro_sup.png"
      },
      description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad consectetur cum deserunt dolore doloribus eos fuga minus, quisquam quod temporibus! Ad culpa dicta eum in iusto perferendis quae sit veritatis.",
      dosage:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad consectetur cum deserunt dolore doloribus eos fuga minus, quisquam quod temporibus! Ad culpa dicta eum in iusto perferendis quae sit veritatis.",
      composition:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad consectetur cum deserunt dolore doloribus eos fuga minus, quisquam quod temporibus! Ad culpa dicta eum in iusto perferendis quae sit veritatis.",
      price : 25000
    },
    {
      id:2,
      name:"Café Cordyceps",
      category_id:1,
      category:{
        name: 'Nutrivrich Series'
      },
      product_picture:{
        id:1,
        picture1:"assets/imgs/wallpaper/cafe.png"
      },
      description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad consectetur cum deserunt dolore doloribus eos fuga minus, quisquam quod temporibus! Ad culpa dicta eum in iusto perferendis quae sit veritatis.",
      dosage:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad consectetur cum deserunt dolore doloribus eos fuga minus, quisquam quod temporibus! Ad culpa dicta eum in iusto perferendis quae sit veritatis.",
      composition:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad consectetur cum deserunt dolore doloribus eos fuga minus, quisquam quod temporibus! Ad culpa dicta eum in iusto perferendis quae sit veritatis.",
      price : 15000
    },
    {
      id:3,
      name:"Lait SOD",
      category_id:2,
      category:{
        name: 'Longrich Series'
      },
      product_picture:{
        id:1,
        picture1:"assets/imgs/wallpaper/lait_sod.jpg"
      },
      description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad consectetur cum deserunt dolore doloribus eos fuga minus, quisquam quod temporibus! Ad culpa dicta eum in iusto perferendis quae sit veritatis.",
      dosage:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad consectetur cum deserunt dolore doloribus eos fuga minus, quisquam quod temporibus! Ad culpa dicta eum in iusto perferendis quae sit veritatis.",
      composition:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad consectetur cum deserunt dolore doloribus eos fuga minus, quisquam quod temporibus! Ad culpa dicta eum in iusto perferendis quae sit veritatis.",
      price : 4500
    },
    {
      id:4,
      name:"Savon noir",
      category_id:2,
      category:{
        name: 'Longrich Series'
      },
      product_picture:{
        id:1,
        picture1:"assets/imgs/wallpaper/savon_noir.png"
      },
      description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad consectetur cum deserunt dolore doloribus eos fuga minus, quisquam quod temporibus! Ad culpa dicta eum in iusto perferendis quae sit veritatis.",
      dosage:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad consectetur cum deserunt dolore doloribus eos fuga minus, quisquam quod temporibus! Ad culpa dicta eum in iusto perferendis quae sit veritatis.",
      composition:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad consectetur cum deserunt dolore doloribus eos fuga minus, quisquam quod temporibus! Ad culpa dicta eum in iusto perferendis quae sit veritatis.",
      price : 3000
    },
    {
      id:5,
      name:"Savon vert",
      category_id:2,
      category:{
        name: 'Longrich Series'
      },
      product_picture:{
        id:1,
        picture1:"assets/imgs/wallpaper/savon_vert.png"
      },
      description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad consectetur cum deserunt dolore doloribus eos fuga minus, quisquam quod temporibus! Ad culpa dicta eum in iusto perferendis quae sit veritatis.",
      dosage:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad consectetur cum deserunt dolore doloribus eos fuga minus, quisquam quod temporibus! Ad culpa dicta eum in iusto perferendis quae sit veritatis.",
      composition:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad consectetur cum deserunt dolore doloribus eos fuga minus, quisquam quod temporibus! Ad culpa dicta eum in iusto perferendis quae sit veritatis.",
      price : 3500
    }

  ];



  public Bills: any = this.restangular.service('bills');
  public BillProducts: any = this.restangular.service('bill_products');
  public Categories: any = this.restangular.service('categories');
  public Customers: any = this.restangular.service('customers');
  public Deliveries: any = this.restangular.service('deliveries');
  public Partners: any = this.restangular.service('partners');
  public Products: any = this.restangular.service('products');
  public Towns: any = this.restangular.service('towns');
  public Users: any = this.restangular.service('users');

  constructor(private toastCtrl: ToastController, public restangular: Restangular) {
    restangular.withConfig((RestangularConfigurer) => {
      RestangularConfigurer
      /* .setBaseUrl(API_ENDPOINT)

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

       /*.addFullRequestInterceptor(function (element, operation, what, url, headers) {
         let token = localStorage.getItem('jwt_token');
         if (token) {
           headers.Authorization = 'Bearer ' + token;
           headers['Access-Token'] = token
         }
       })*/
      ;
    });
  }

  formarPrice(price){
    if(price==undefined){
      return "";
    }
    else{
      price += "";
      let tab = price.split('');
      let p = "";
      for (let i = tab.length; i > 0; i--) {
        if (i % 3 == 0) {
          p += " ";
        }
        p += tab[tab.length - i];
      }
      return p;
    }
  }

  doToast(text,duration) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: duration,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
}
