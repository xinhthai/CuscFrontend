import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {
  constructor(
    private local: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.checkRole();
  }
  role: Array<String>;
  checkRole(){
    this.role=this.local.retrieve('currentUser').authorities;
    console.log(this.role);
    this.roleAdmin();
    this.roleWriter();
  }
  admin=false;
  roleAdmin(){
    for(var i=0;i<this.role.length;i++){
      if(this.role[i] === 'ROLE_ADMIN'){
        this.admin=true;
      }
    }
  }
  writer=false;
  roleWriter(){
    for(var i=0;i<this.role.length;i++){
      if(this.role[i] === 'ROLE_WRITER'){
        this.writer=true;
      }
    }
  }
}
