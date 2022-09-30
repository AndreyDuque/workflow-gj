import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChargesLayoutComponent } from './components/charges-layout/charges-layout.component';
import { ChargesComponent } from './components/charges/charges.component';
import { ListProcessChargesComponent } from './components/list-process-charges/list-process-charges.component';

const routes: Routes = [
  {
    path:"",
    component:ChargesLayoutComponent,
    children:[{
      path:"",
      redirectTo:'list',
      pathMatch:'full'
    },
  {
    path:"list",
    component:ChargesComponent
  },
  {
    path:'process-list',
    component:ListProcessChargesComponent
  }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChargesRoutingModule { }
