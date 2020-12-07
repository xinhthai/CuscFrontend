import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private menuUrl='http://localhost:3000/api/menu';
  constructor( private http: HttpClient) { }
  getAllMenu() : Observable<any>{
    return this.http.get(`${this.menuUrl}`);
  }
}
