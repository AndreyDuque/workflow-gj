import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import {B24Service} from "./services/b24.service";
import { CardComponent } from './shared/card/card.component';


@NgModule({
  declarations: [
    CardComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
   
  ],
  providers: [
    B24Service
  ],
  exports: [
    CardComponent
  ]
})
export class CoreModule { }

