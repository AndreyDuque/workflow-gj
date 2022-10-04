import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProcessRoutingModule } from './process-routing.module';
import { ProcessLayoutComponent } from './components/process-layout/process-layout.component';
import { ProcessListComponent } from './components/process-list/process-list.component';
import { ProcessDetailsComponent } from './components/process-details/process-details.component';
import { ProcessDocumentDetailComponent } from './components/process-document-detail/process-document-detail.component';
import { ProcessActivityDetailComponent } from './components/process-activity-detail/process-activity-detail.component';
import { CoreModule } from '../core/core.module';



@NgModule({
  declarations: [
    ProcessLayoutComponent,
    ProcessListComponent,
    ProcessDetailsComponent,
    ProcessDocumentDetailComponent,
    ProcessActivityDetailComponent
  ],
  imports: [
    CommonModule,
    ProcessRoutingModule,
    CoreModule
  ]
})
export class ProcessModule { }
