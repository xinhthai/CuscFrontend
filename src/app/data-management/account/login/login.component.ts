import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { first } from 'rxjs/operators';
import { Account } from '../account.model';
import { AuthService } from '../service/auth.service';
import { TokenService } from '../service/token.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Input() account : Account=new Account();
  submited = false;
  loading = false;
  isLoginFailed = false;
  isLoggedIn =false;
  roles: string[] = [];
  errorMessage='';
  constructor(private authService: AuthService, private tokenService: TokenService, private router: Router, private snotifyService: SnotifyService) { }
  ngOnInit(): void {

    if(this.tokenService.getToken()){
      this.isLoggedIn=true;
      this.roles=this.tokenService.getAccount().roles;
    }
    }
  onSubmit(loginForm): void{
    this.submited=true;
    console.log(this.account.username);
    console.log(loginForm.value);
    if(loginForm.invalid){
      return;
    }
    this.loading=true;
    this.authService.login(loginForm.value)
      .subscribe(
        data => {
          this.tokenService.saveToken(data.accessToken);
          this.tokenService.saveAccount(data);
          this.isLoginFailed = false;
          this.isLoginFailed= false;
          this.isLoggedIn = true;
          this.roles=this.tokenService.getAccount().roles;
          // this.reloadPage();
          this.router.navigate(['/admin']);
          this.snotifyService.success('Đăng nhập thành công!');
        },
        err =>{
          this.errorMessage=err.error.message;
          this.isLoginFailed=true;

        }
      );
  }
  reloadPage(): void{
    console.log('dang nhap thanh cong');
    window.location.reload();
  }
}
