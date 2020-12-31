import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MenuService } from 'src/app/layouts/main-layout/menu.service';

@Component({
  selector: 'app-menu-dialog',
  templateUrl: './menu-dialog.component.html',
  styleUrls: ['./menu-dialog.component.scss']
})
export class MenuDialogComponent implements OnInit {

  constructor(
    private menuService: MenuService,
    @Inject(MAT_DIALOG_DATA) public data: {id: number}
  ) { }

  ngOnInit(): void {

  }
  getMenu(){
    this.menuService.getOneMenuByMenuId(this.data.id).subscribe(
      data =>{

      }
    )
  }
  updateMenu(){

  }
  deleteMenu(){

  }
}
