import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Menu } from 'src/app/layouts/main-layout/menu.model';
import { MenuService } from 'src/app/layouts/main-layout/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  listMenu: Observable<Menu>;
  checked: boolean=true;
  constructor(
    private menuService: MenuService
  ) { }

  ngOnInit(): void {
    this.getListMenu();
  }
  getListMenu(){
    this.menuService.getAllMenu().subscribe(
      data =>{
        this.listMenu=data;
      },
      error =>console.log(error)
    );
  }
}
