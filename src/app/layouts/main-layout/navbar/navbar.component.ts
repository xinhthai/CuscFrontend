import { Component, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { Observable } from 'rxjs';
import { Menu } from '../menu.model';
import { MenuService } from '../menu.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  menu: Observable<Menu[]>;
  constructor(
    private menuService: MenuService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllListMenu();
  }
  getAllListMenu(){
    this.menuService.getAllMenu().subscribe(
      data => {
        this.menu=data;
      },
      error => console.log(error)
      );
  }
  url='educate';
  active:boolean;
  id1:number;
  changeRoute(id){
    // console.log(id);
    this.active=true;
    this.id1==id;
    const myurl=`${this.url}/${id}`;
    this.router.navigateByUrl(myurl).then(
      e =>{
        console.log('Chuyển route thành công!');
      },
      error =>console.log(error)
    );
  }
}
