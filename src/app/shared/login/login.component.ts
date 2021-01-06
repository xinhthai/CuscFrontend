import { Component, Input, OnInit,ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { StateStorageService } from '../../core/auth/state-storage.service';
import { LoginService } from '../../core/login/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit {
  // @Input() account : Account= new Account;
  authenticationError: boolean;
  loginForm = this.fb.group({
    username: [''],
    password: [''],
    rememberMe: [true]
  });
  constructor(
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
        else {
          this.stateStorageService.storeUrl(null);
          this.router.navigate(['/home']);
        }
      })
      .catch(() => {
        this.authenticationError = true;
      });
  }

}
