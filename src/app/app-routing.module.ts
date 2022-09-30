import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainLayoutComponent} from "./modules/core/shared/main-layout/main-layout.component";

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: () => import('./modules/home/home.module').then(module => module.HomeModule),
      },
      {
        path: 'process',
        loadChildren: () => import('./modules/process/process.module').then(module => module.ProcessModule),
      },
      {
        path: 'charges',
        loadChildren: () => import('./modules/charges/charges.module').then(module => module.ChargesModule),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
