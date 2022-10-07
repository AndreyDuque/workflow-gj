import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChargesLayoutComponent } from './components/charges-layout/charges-layout.component';
import { ChargesComponent } from './components/charges/charges.component';
import { ChargesDetailsComponent } from './components/charges-details/charges-details.component';

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
    path:'charges-details/:title',
    component:ChargesDetailsComponent
  }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChargesRoutingModule { }
