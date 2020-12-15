import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, Inject, Input, NgModule, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Category } from './category.model';
import { CategoryService } from './category.service';
import {SnotifyService,} from 'ng-snotify';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventEmitter } from '@angular/core';
import { DialogAddComponent } from './dialog-add/dialog-add.component';
@Component({
  selector: 'app-news-category',
  templateUrl: './news-category.component.html',
  styleUrls: ['./news-category.component.scss','../../../../assets/forms.scss']
})
export class NewsCategoryComponent implements OnInit , OnDestroy{
  nameAction: string;
  action: number=0;
  // mat-table
  dataSource: MatTableDataSource<Category>;
  displayColumns: string[]=['name', 'add', 'del'];
  @Input() category: Category=new Category();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  listCategory : Observable<Category[]>;
  constructor(
      private categoryService: CategoryService,
      private routes : Router,
      private snotifyService: SnotifyService,
      private dialog: MatDialog,
      private changeDetectorRefs: ChangeDetectorRef
    ) { this.allListCategory(); }


  ngOnInit(): void {
    this.allListCategory();
    this.onSuccess();
  }
  ngOnDestroy():void{

  }

  addAction(){
    this.nameAction='Thêm loại tin';
    this.action=1;
  }
  editNews(id){
    console.log(id);
  }
  allListCategory(){
    this.categoryService.getAllCategory().subscribe(
      data =>{
        this.listCategory=data;
        this.dataSource=data;
        this.dataSource =new MatTableDataSource(data);
        this.dataSource.paginator=this.paginator;
        console.log(this.dataSource.paginator);
      },
      error => console.log(error)
    );
  }

  // editCategory(id){
  //   this.categoryService.getOneCategory(id).subscribe(
  //     data =>{
  //       this.category=data;
  //     }
  //   )
  //   this.nameAction='Sửa loại tin';
  //   this.action=2;
  // }
  deleteCategory(id){
    this.categoryService.delCategory(id).subscribe(
      data =>{
        this.allListCategory();
        this.snotifyService.success('Xóa loại tin thành công!');
      },
      (err : HttpErrorResponse) => {
        console.log('backend returned code ${err.status}, body was: ${err.error} ');
        this.snotifyService.error('Xóa loại tin thất bại!');
      }
    );
  }
  // notify in angular
  onSuccess(){
    this.snotifyService.success('Đăng nhập thành công');
  }
  // pagination
  p:number;
  // dialog category edit
  // @Output() id:number;
  @Output() returnId=new EventEmitter();
  showdialog(id,name,status){
    // this.returnId.emit(id);
    this.dialog.open(DialogAddComponent,{
      data: {id1 : id, name1:name, status1: status},
    });
    this.allListCategory();
  }
}




