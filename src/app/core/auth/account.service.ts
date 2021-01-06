import { Injectable } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, Subject,of } from 'rxjs';
import { shareReplay, tap, catchError } from 'rxjs/operators';

import { Account } from '../user/account.model';
import { SERVER_API_URL } from 'src/app/app.constants';
import { StateStorageService } from './state-storage.service';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AccountService {
  private userIdentity: any;
  private authenticated = false;
  private authenticationState = new Subject<any>();
  private accountCache$?: Observable<Account | null>;


  constructor(
    private stateStorageService :StateStorageService,
    private sessionStorage: SessionStorageService,
    private router: Router,
    private http: HttpClient) {}

  fetch(): Observable<HttpResponse<Account>> {
    return this.http.get<Account>(SERVER_API_URL + '/users', { observe: 'response' });
  }

  save(account: any): Observable<HttpResponse<any>> {
    return this.http.post(SERVER_API_URL + '/users', account, { observe: 'response' });
  }

  authenticate(identity) {
    this.userIdentity = identity;
    this.authenticated = identity !== null;
    this.authenticationState.next(this.userIdentity);
  }

  hasAnyAuthority(authorities: string[]): boolean {
    if (!this.userIdentity || !this.userIdentity.authorities) {
      return false;
    }
    if (!Array.isArray(authorities)) {
      authorities = [authorities];
    }
    return this.userIdentity.authorities.some((authority: string) => authorities.includes(authority));
  }

  // hasAuthority(authority: string): Promise<boolean> {
  //   if (!this.authenticated) {
  //     return Promise.resolve(false);
  //   }

  //   return this.identity().then(
  //     id => {
  //       return Promise.resolve(id.authorities && id.authorities.includes(authority));
  //     },
  //     () => {
  //       return Promise.resolve(false);
  //     }
  //   );
  // }
  identity(force?: boolean): Observable<Account | null> {
    if (!this.accountCache$ || force || !this.isAuthenticated()) {
      this.accountCache$ = this.fetch().pipe(
        catchError(() => {
          return of(null);
        }),
        tap((account: Account | null) => {
          this.authenticate(account);
          if (account) {
            this.navigateToStoredUrl();
          }
        }),
        shareReplay()
      );
    }
    return this.accountCache$;
  }

  // identity(force?: boolean): Promise<Account> {
  //   if (force) {
  //     this.userIdentity = undefined;
  //   }

  //   if (this.userIdentity) {
  //     return Promise.resolve(this.userIdentity);
  //   }

  //   return this.fetch()
  //     .toPromise()
  //     .then(response => {
  //       const account: Account = response.body;
  //       if (account) {
  //         this.userIdentity = account;
  //         this.authenticated = true;
  //       } else {
  //         this.userIdentity = null;
  //         this.authenticated = false;
  //       }
  //       this.authenticationState.next(this.userIdentity);
  //       return this.userIdentity;
  //     })
  //     .catch(err => {
  //       this.userIdentity = null;
  //       this.authenticated = false;
  //       this.authenticationState.next(this.userIdentity);
  //       return null;
  //     });
  // }

  isAuthenticated(): boolean {
    return this.authenticated;
  }

  isIdentityResolved(): boolean {
    return this.userIdentity !== undefined;
  }

  getAuthenticationState(): Observable<any> {
    return this.authenticationState.asObservable();
  }

  private navigateToStoredUrl(): void {
    // previousState can be set in the authExpiredInterceptor and in the userRouteAccessService
    // if login is successful, go to stored previousState and clear previousState
    const previousUrl = this.stateStorageService.getUrl();
    if (previousUrl) {
      this.stateStorageService.clearUrl();
      this.router.navigateByUrl(previousUrl);
    }
  }

}
