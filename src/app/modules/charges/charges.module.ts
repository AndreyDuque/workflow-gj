import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChargesRoutingModule } from './charges-routing.module';
import { ChargesComponent } from './components/charges/charges.component';
import { ChargesLayoutComponent } from './components/charges-layout/charges-layout.component';
import { CoreModule } from '../core/core.module';
import { CardChargeComponent } from './components/card-charge/card-charge.component';
import { ChargesDetailsComponent } from './components/charges-details/charges-details.component';
import {NgxPrintElementModule} from "ngx-print-element";


@NgModule({
  declarations: [
    ChargesComponent,
    ChargesLayoutComponent,
    CardChargeComponent,
    ChargesDetailsComponent
  ],
  imports: [
    CommonModule,
    ChargesRoutingModule,
    CoreModule,
    NgxPrintElementModule,
  ]
})
export class ChargesModule { }
