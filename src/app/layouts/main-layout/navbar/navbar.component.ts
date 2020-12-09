import { Component, OnInit } from '@angular/core';
import { Routes } from '@angular/router';
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
  constructor(private menuService: MenuService) { }

  ngOnInit(): void {
    this.menuService.getAllMenu().subscribe(
      data => {
        this.menu=data;
      },
      error => console.log(error)
      );
  }
}
