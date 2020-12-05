import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainConfigComponent } from './configuration/main-config/main-config.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
@NgModule({
  imports: [RouterModule.forRoot(
    [
      {
        path: 'home',
        component:HomeComponent
      },
      {
        path : '',
        redirectTo : 'home',
        pathMatch : 'full'
       },
      {
        path: '',
        children:[
          {
            path: 'login',
            component: LoginComponent
          },
          {
            path: 'config',
            component: MainConfigComponent
          }
        ]
      }


    ]
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
