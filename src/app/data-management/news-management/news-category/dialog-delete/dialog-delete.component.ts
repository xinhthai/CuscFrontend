import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnotifyService } from 'ng-snotify';
import { NewsService } from '../../news.service';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-dialog-delete',
  templateUrl: './dialog-delete.component.html',
  styleUrls: ['./dialog-delete.component.scss']
})
export class DialogDeleteComponent implements OnInit {

  constructor(
    private categoryService: CategoryService,
    private snotifyService: SnotifyService,
    private newsService: NewsService,
    @Inject(MAT_DIALOG_DATA) public data: {id:number,type: string}) { }

  ngOnInit(): void {
  }
  deleteCategory(id){
    this.categoryService.delCategory(id).subscribe(
      data =>{
        this.snotifyService.success('Xóa loại tin thành công!');
      },
      (err : HttpErrorResponse) => {
        console.log('backend returned code ${err.status}, body was: ${err.error} ');
        this.snotifyService.error('Xóa loại tin thất bại!');
      }
    );
  }
  deleteNews(id){
    console.log(id);
    this.newsService.deleteNewsById(id).subscribe(
      data =>{
        this.snotifyService.success('Đã xóa tin tức thành công');
      },
      error => console.log(error)
    )
  }
}
