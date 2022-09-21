import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProcessLayoutComponent } from './components/process-layout/process-layout.component';
import { ProcessListComponent } from './components/process-list/process-list.component';
import { ProcessDetailsComponent } from './components/process-details/process-details.component';

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
    }
]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcessRoutingModule { }
