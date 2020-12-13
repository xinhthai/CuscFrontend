import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Category } from './category.model';
import { CategoryService } from './category.service';
import {SnotifyService,} from 'ng-snotify';
@Component({
  selector: 'app-news-category',
  templateUrl: './news-category.component.html',
  styleUrls: ['./news-category.component.scss','../../../../assets/forms.scss']
})
export class NewsCategoryComponent implements OnInit {
  nameAction: string;
  action: number=0;
  @Input() category: Category=new Category();
  listCategory : Observable<Category[]>;
  constructor(
      private categoryService: CategoryService,
      private routes : Router,
      private snotifyService: SnotifyService
    ) { }

  ngOnInit(): void {
    this.allListCategory();
    this.onSuccess();
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
        console.log(data);
      },
      error => console.log(error)
    );
  }
  addCategory(categoryForm){
    this.categoryService.addCategory(categoryForm.value).subscribe(
      data =>{
        this.allListCategory();
        this.snotifyService.success('Thêm loại tin thành công!')
      },
      (err : HttpErrorResponse) => {
        console.log('backend returned code ${err.status}, body was: ${err.error} ');
        this.snotifyService.error('Thêm loại tin thất bại!');
      }
    );
  }
  editCategory(id){
    this.categoryService.getOneCategory(id).subscribe(
      data =>{
        this.category=data;
      }
    )
    this.nameAction='Sửa loại tin';
    this.action=2;
  }
  updateCategory(categoryEditForm){
    console.log(categoryEditForm.value);
    console.log(this.category);
    this.categoryService.editCategory(this.category).subscribe(
      data =>{
        this.allListCategory();
        this.snotifyService.success('Đã sửa tên loại tin!');
      },
      (err : HttpErrorResponse) => {
        console.log('backend returned code ${err.status}, body was: ${err.error} ');
        this.snotifyService.error('Lỗi khi sửa tên loại tin');
      }
    );
  }
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

}
