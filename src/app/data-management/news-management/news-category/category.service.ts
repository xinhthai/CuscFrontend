import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from 'src/app/app.constants';
const httpOptions = {
  headers : new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor( private http: HttpClient ) {}
  getAllCategory(): Observable<any>{
    return this.http.get(`${SERVER_API_URL}`+'/categories');
  }
  getOneCategory(id: number): Observable<any>{
    return this.http.get(`${SERVER_API_URL}`+'/categories/'+ `${id}`);
  }
  addCategory(value): Observable<any>{
    console.log(value);
    return this.http.post(`${SERVER_API_URL}`+'/categories', {
      categoryName: value.categoryName
    }, httpOptions);
  }
  editCategory(value): Observable<any>{
    return this.http.put(`${SERVER_API_URL}`+'/categories',{
      categoryId : value.categoryId,
      categoryName : value.categoryName
    });
  }
  delCategory(id:number): Observable<any>{
    return this.http.delete(`${SERVER_API_URL}`+'/categories'+`/${id}`,httpOptions);
  }
}
