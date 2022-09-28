import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProcessLayoutComponent } from './components/process-layout/process-layout.component';
import { ProcessListComponent } from './components/process-list/process-list.component';
import { ProcessDetailsComponent } from './components/process-details/process-details.component';
import { ProcessActivityDetailComponent } from './components/process-activity-detail/process-activity-detail.component';
import { ProcessDocumentDetailComponent } from './components/process-document-detail/process-document-detail.component';

const routes: Routes = [
  {
    path:"",
    component:ProcessLayoutComponent,
    children:[{
      path:"",
      redirectTo:'list',
      pathMatch: 'full'
    },
    {
      path:'list',
      component:ProcessListComponent
    },
    {
      path:'process-details/:title',
      component:ProcessDetailsComponent
    },
    {
      path:'process-activity-detail',
      component:ProcessActivityDetailComponent
    },
    {
      path:'process-document-detail',
      component:ProcessDocumentDetailComponent
    }
]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcessRoutingModule { }
