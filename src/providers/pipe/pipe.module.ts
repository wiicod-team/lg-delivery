import {NgModule} from '@angular/core';
import {IonicModule} from 'ionic-angular';
import {BillStatutPipe} from "./bill-statut";
import {LimitToPipe} from "./limit-to";
import {PriceFormatPipe} from "./price-format";
import {OrderByPipe} from "./order-by";

@NgModule({
  declarations: [
    BillStatutPipe,
    LimitToPipe,
    OrderByPipe,
    PriceFormatPipe,
  ],
  imports: [IonicModule],
  exports: [
    BillStatutPipe,
    LimitToPipe,
    OrderByPipe,
    PriceFormatPipe,
  ]
})
export class PipeModule {
}
