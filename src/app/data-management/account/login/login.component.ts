import { Component, Input, OnInit,ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { Account } from '../account.model';
import { StateStorageService } from '../service/state-storage.service';
// import { TokenService } from '../service/token.service';
import { LoginService } from './login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit {
  @Input() account : Account= new Account;
  authenticationError: boolean;
  loginForm = this.fb.group({
    username: [''],
    password: [''],
    rememberMe: [true]
  });
  constructor(
    // private tokenService: TokenService,
    private stateStorageService: StateStorageService,
    private router: Router,
    private snotifyService: SnotifyService,
    private loginService: LoginService,
    private fb: FormBuilder,
    private renderer: Renderer2

  ) {}

  ngAfterViewInit() {
    setTimeout(() => this.renderer.selectRootElement('#username').focus());

  }

  // onSubmit(loginForm): void{
  //   this.submited=true;
  //   console.log(this.account.username);
  //   console.log(loginForm.value);
  //   if(loginForm.invalid){
  //     return;
  //   }
  //   this.loading=true;
  //   this.authService.login(loginForm.value)
  //     .subscribe(
  //       data => {
  //         this.tokenService.saveToken(data.accessToken);
  //         this.tokenService.saveAccount(data);
  //         this.isLoginFailed = false;
  //         this.isLoginFailed= false;
  //         this.isLoggedIn = true;
  //         this.roles=this.tokenService.getAccount().roles;
  //         // this.reloadPage();
  //         this.router.navigate(['/admin']);
  //         this.snotifyService.success('Đăng nhập thành công!');
  //       },
  //       err =>{
  //         this.errorMessage=err.error.message;
  //         this.isLoginFailed=true;

  //       }
  //     );
  // }

  login() {
    this.loginService
      .login({
        username: this.loginForm.get('username').value,
        password: this.loginForm.get('password').value,
        rememberMe: this.loginForm.get('rememberMe').value
      })
      .then(() => {
        this.authenticationError = false;
        if (this.router.url === '/register' || /^\/activate\//.test(this.router.url) || /^\/reset\//.test(this.router.url)) {
          this.router.navigate(['']);
        }
        const redirect = this.stateStorageService.getUrl();
        if (redirect) {
          this.stateStorageService.storeUrl(null);
          this.router.navigateByUrl(redirect);
        }
      })
      .catch(() => {
        this.authenticationError = true;
      });
  }

}
