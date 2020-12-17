import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnotifyService } from 'ng-snotify';
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
    @Inject(MAT_DIALOG_DATA) public data: {id:number}) { }

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
}
