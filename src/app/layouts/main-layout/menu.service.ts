import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

const URL='http://localhost:3000/api/menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  constructor( private http: HttpClient) { }

  getAllMenu() : Observable<any>{
    return this.http.get(`${URL}`);
  }
  getOneMenuByMenuId(id): Observable<any>{
    return this.http.get(`${URL}/${id}`);
  }
  addMenu(menu): Observable<any>{
    return this.http.post(`${URL}`,menu);
  }
}
