import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import {B24Service} from "./services/b24.service";
import { CardComponent } from './shared/card/card.component';
import { FooterComponent } from './shared/footer/footer.component';


@NgModule({
  declarations: [
    CardComponent,
    FooterComponent
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

