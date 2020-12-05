import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
          }
        ]
      }


    ]
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
