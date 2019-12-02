import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommandPage } from './command';
import {PipeModule} from "../../providers/pipe/pipe.module";

@NgModule({
  declarations: [
    CommandPage,
  ],
  imports: [
    IonicPageModule.forChild(CommandPage),
    PipeModule
  ],
})
export class CommandPageModule {}
