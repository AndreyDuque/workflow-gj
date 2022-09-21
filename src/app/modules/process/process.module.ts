import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProcessRoutingModule } from './process-routing.module';
import { ProcessLayoutComponent } from './components/process-layout/process-layout.component';
import { ProcessCardComponent } from './components/process-card/process-card.component';
import { ProcessListComponent } from './components/process-list/process-list.component';
import { ProcessDetailsComponent } from './components/process-details/process-details.component';


@NgModule({
  declarations: [
    ProcessLayoutComponent,
    ProcessCardComponent,
    ProcessListComponent,
    ProcessDetailsComponent
  ],
  imports: [
    CommonModule,
    ProcessRoutingModule
  ]
})
export class ProcessModule { }
