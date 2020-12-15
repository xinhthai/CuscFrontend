import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
    @Inject(MAT_DIALOG_DATA) public data: {id1: number, name1: string , status: number},
    private snotifyService: SnotifyService,
    private dialog: MatDialog
  ){}
  ngOnInit(): void {
    this.editCategory(this.id);
  }
  value:number=this.data.status;
  id: number=this.data.id1;
  @Input() category: Category=new Category();
  nameAction:string=this.data.name1;
  dataSource: MatTableDataSource<Category>;
  editCategory(id){
    this.categoryService.getOneCategory(id).subscribe(
      data =>{
        this.category=data;
      }
    )
    this.nameAction='Sửa loại tin';
  }
  updateCategory(){
    this.categoryService.editCategory(this.category).subscribe(
      data =>{

        this.dialog.closeAll();
        this.snotifyService.success('Đã sửa tên loại tin!');
      },
      (err : HttpErrorResponse) => {
        console.log('backend returned code ${err.status}, body was: ${err.error} ');
        this.snotifyService.error('Lỗi khi sửa tên loại tin');
      }
    );
  }
  addCategory(){
    this.categoryService.addCategory(this.category).subscribe(
      data =>{
        this.snotifyService.success('Thêm loại tin thành công!')
      },
      (err : HttpErrorResponse) => {
        console.log('backend returned code ${err.status}, body was: ${err.error} ');
        this.snotifyService.error('Thêm loại tin thất bại!');
      }
    );
  }
}
