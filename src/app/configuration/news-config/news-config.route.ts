import { Route } from '@angular/router';
import { NewsConfigComponent } from './news-config.component';

export const NEWSROUTE: Route={
  path : '',
  component: NewsConfigComponent,
  outlet: 'news'
}
