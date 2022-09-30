import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChargesRoutingModule } from './charges-routing.module';
import { ChargesComponent } from './components/charges/charges.component';
import { ChargesLayoutComponent } from './components/charges-layout/charges-layout.component';
import { CoreModule } from '../core/core.module';
import { CardChargeComponent } from './components/card-charge/card-charge.component';
import { ListProcessChargesComponent } from './components/list-process-charges/list-process-charges.component';


@NgModule({
  declarations: [
    ChargesComponent,
    ChargesLayoutComponent,
    CardChargeComponent,
    ListProcessChargesComponent
  ],
  imports: [
    CommonModule,
    ChargesRoutingModule,
    CoreModule
  ]
})
export class ChargesModule { }
