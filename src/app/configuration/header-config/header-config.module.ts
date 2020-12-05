import { NgModule } from '@angular/core';
import { NgModel, FormsModule } from "@angular/forms";
import { RouterModule, Routes } from '@angular/router';
import { NewsConfigComponent } from '../news-config/news-config.component';
const routes: Routes = [
  {
    path: 'header',
    component: NewsConfigComponent
  }
];
@NgModule({
  imports : [RouterModule.forChild(routes )],
  declarations : [NewsConfigComponent],
})
export class HeaderConfigModule{}
