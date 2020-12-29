// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
// const TOKEN_KEY='auth-token';
// const USER_KEY='auth-user';

// @Injectable({
//   providedIn: 'root'
// })
// export class TokenService{
//   constructor(private http: HttpClient, private $localStorage: LocalStorageService, private $sessionStorage: SessionStorageService){};
//   signOut(): void{
//     window.sessionStorage.clear();
//   }
//   public saveToken(token: string) : void {
//     window.sessionStorage.removeItem(TOKEN_KEY);
//     window.sessionStorage.setItem(TOKEN_KEY,token);
//   }
//   public getToken(): string{
//     return this.$localStorage.retrieve('authenticationToken') || this.$sessionStorage.retrieve('authenticationToken');
//   }
//   public saveAccount(Account): void{
//     window.sessionStorage.removeItem(USER_KEY);
//     window.sessionStorage.setItem(TOKEN_KEY,JSON.stringify(Account));
//   }
//   public getAccount(): any{
//     return JSON.parse(sessionStorage.getItem(USER_KEY));
//   }
//   storeAuthenticationToken(jwt) {
//     this.$localStorage.store('authenticationToken', jwt);
//     this.$sessionStorage.store('authenticationToken', jwt);
    
//   }
// }
