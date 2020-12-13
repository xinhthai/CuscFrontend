import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const URL='http://localhost:3000/api/categories';
const httpOptions = {
  headers : new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor( private http: HttpClient ) {}
  getAllCategory(): Observable<any>{
    return this.http.get(`${URL}`);
  }
  getOneCategory(id: number): Observable<any>{
    return this.http.get(`${URL}/${id}`);
  }
  addCategory(value): Observable<any>{
    console.log(value);
    return this.http.post(`${URL}`, {
      categoryName: value.categoryName
    }, httpOptions);
  }
  editCategory(value): Observable<any>{
    return this.http.put(`${URL}`,{
      categoryId : value.categoryId,
      categoryName : value.categoryName
    });
  }
  delCategory(id:number): Observable<any>{
    return this.http.delete(`${URL}/${id}`,httpOptions);
  }
}
