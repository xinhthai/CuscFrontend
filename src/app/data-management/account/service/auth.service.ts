import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

const AUTH_API='http://localhost:3000/api/auth';
const httpOptions = {
  headers : new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private http: HttpClient) {}

  login(account): Observable<any>{
    return this.http.post(`${AUTH_API}`, {
      username: account.username,
      password: account.password
    }, httpOptions);
  }
}
