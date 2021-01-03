import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { SERVER_API_URL } from 'src/app/app.constants';
// const AUTH_API='http://localhost:3000/api/auth';
// const httpOptions = {
//   headers : new HttpHeaders({'Authorization': 'application/json'})
// };

@Injectable({
  providedIn: 'root'
})
export class AuthServerProvider {

  constructor( private http: HttpClient,private $localStorage: LocalStorageService, private $sessionStorage: SessionStorageService) {}

  login(credentials): Observable<any> {
    const data = {
      username: credentials.username,
      password: credentials.password,
      rememberMe: credentials.rememberMe
    };

    return this.http.post(SERVER_API_URL + '/auth', data, { observe: 'response' }).pipe(map(authenticateSuccess.bind(this)));

    function authenticateSuccess(resp) {
      console.log(resp)
      const bearerToken = resp.headers.get('Authorization');
      const currentUser = resp.body
      if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
        const jwt = bearerToken.slice(7, bearerToken.length);
        this.storeAuthenticationToken(jwt, credentials.rememberMe,currentUser);
        return jwt;
      }
    }
  }

  loginWithToken(jwt,rememberMe,currentUser) {
    if (jwt) {
      this.storeAuthenticationToken(jwt,rememberMe,currentUser);
      return Promise.resolve(jwt);
    } else {
      return Promise.reject('auth-jwt-service Promise reject'); // Put appropriate error message here
    }
  }

  storeAuthenticationToken(jwt, rememberMe,currentUser) {
    if (rememberMe) {
      this.$localStorage.store('authenticationToken', jwt);
      this.$localStorage.store('currentUser', currentUser);
    } else {
      this.$sessionStorage.store('authenticationToken', jwt);
      this.$sessionStorage.store('currentUser',currentUser);
    }
  }
  logout(): Observable<any> {
    return new Observable(observer => {
      this.$localStorage.clear('authenticationToken');
      this.$sessionStorage.clear('authenticationToken');
      observer.complete();
    });
  }
}
