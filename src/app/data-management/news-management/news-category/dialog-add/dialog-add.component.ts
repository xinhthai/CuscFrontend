import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SnotifyService } from 'ng-snotify';
import { Category } from '../category.model';
import { CategoryService } from '../category.service';

@Component({
  selector: 'add-category',
  templateUrl: './dialog-add.component.html'
})
export class DialogAddComponent implements OnInit{
  constructor(
    private categoryService: CategoryService,
    @Inject(MAT_DIALOG_DATA) public data: {name: string},
    private snotifyService: SnotifyService,
    private dialog: MatDialog
  ){}
  ngOnInit(): void {
  }
  dataSource: MatTableDataSource<Category>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  nameAction:string=this.data.name;
  @Input() category: Category=new Category();
  addCategory(){
    this.categoryService.addCategory(this.category).subscribe(
      data =>{
        this.dialog.closeAll();
        this.snotifyService.success('Thêm loại tin thành công!')
      },
      (err : HttpErrorResponse) => {
        console.log('backend returned code ${err.status}, body was: ${err.error} ');
        this.snotifyService.error('Thêm loại tin thất bại!');
      }
    );
  }

}
