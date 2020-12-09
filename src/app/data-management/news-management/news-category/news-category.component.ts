import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news-category',
  templateUrl: './news-category.component.html',
  styleUrls: ['./news-category.component.scss','../../../../assets/forms.scss']
})
export class NewsCategoryComponent implements OnInit {
  nameAction: string;
  action: boolean=false;
  constructor() { }

  ngOnInit(): void {
  }
  name1: String = 'a';
  onSubmit(categoryForm){
    console.log(this.name1);
  }
  addNews(){
    this.nameAction='Thêm loại tin';
    this.action=true;
  }
  editNews(){
    this.nameAction='Sửa loại tin';
    this.action=true;
  }
}
