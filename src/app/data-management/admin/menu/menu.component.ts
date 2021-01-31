import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SnotifyService } from 'ng-snotify';
import { Observable } from 'rxjs';
import { Menu } from 'src/app/layouts/main-layout/menu.model';
import { MenuService } from 'src/app/layouts/main-layout/menu.service';
import { MenuDialogComponent } from './menu-dialog/menu-dialog.component';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  listMenu: Observable<Menu>;
  checked: boolean=true;
  menu: Menu=new Menu();
  name: string;
  selectedMenu:any ={};
  constructor(
    private menuService: MenuService,
    private dialog: MatDialog,
    private snotifyService: SnotifyService
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
  getSelectedMenu(menuId, name){
    this.selectedMenu.menuId=menuId;
    this.selectedMenu.name=name;
  }
  showDialogChoose(id){
    this.dialog.open(MenuDialogComponent,{
      data: {id: id}
    });
  }
  insertMenu(){
    if(this.checked===true){
      this.menu.parentId=0;
      this.menu.name=this.name;
      console.log(this.menu);
      this.menuService.addMenu(this.menu).subscribe(
        data =>{
          console.log('Thêm menu thành công!');
          this.snotifyService.success('Thêm menu thành công!');
        },
        error => console.log(error)
      );
    }
    else{
      this.menu.parentId=this.selectedMenu.menuId;
      this.menu.name=this.name;
      console.log(this.menu);
      this.menuService.addMenu(this.menu).subscribe(
        data =>{
          console.log('Thêm menu thành công!');
        },
        error => console.log(error)
      );
    }
  }

}
