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
import { DialogUpdateComponent } from './dialog-update/dialog-update.component';
import { DialogDeleteComponent } from './dialog-delete/dialog-delete.component';
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

  // notify in angular
  onSuccess(){
    this.snotifyService.success('Đăng nhập thành công');
  }
  // pagination
  p:number;
  // dialog category edit
  // @Output() id:number;
  @Output() returnId=new EventEmitter();
  name: string;
  addDialog(){
    this.name='Thêm loại tin';
    this.dialog.open(DialogAddComponent,{
      data: {name: this.name},
    });
    this.allListCategory();
  }
  updateDialog(id){
    // this.returnId.emit(id);
    this.name='Chỉnh sửa loại tin';
    this.dialog.open(DialogUpdateComponent,{
      data: {id1 : id, name1:this.name, status1: status},
    });
    this.allListCategory();
  }
  deleteDialog(id){
    this.dialog.open(DialogDeleteComponent,{
      data: {id: id, type: 'category'}
    })
  }
}




