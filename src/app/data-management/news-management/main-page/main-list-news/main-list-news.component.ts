import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Category } from '../../news-category/category.model';
import { CategoryService } from '../../news-category/category.service';
import { NewsViewDTO } from '../../news.model';
import { NewsService } from '../../news.service';

@Component({
  selector: 'app-main-list-news',
  templateUrl: './main-list-news.component.html',
  styleUrls: ['./main-list-news.component.scss']
})
export class MainListNewsComponent implements OnInit {
  listNews: Observable<NewsViewDTO>;
  p:number;
  categoryName='';
  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.getDetail();
  }
  getDetail():void{
    const id=+this.route.snapshot.params['id'];
    console.log(id);
    this.getListNewsByCategoryId(id);
    this.getCategoryName(id);
  }
  getListNewsByCategoryId(id){
    this.newsService.getListNewByCategoryId(id).subscribe(
      data =>{
        this.listNews=data;
        console.log(this.listNews);
      },
      error =>console.log(error)
    )
  }
  getCategoryName(id){
    this.categoryService.getOneCategory(id).subscribe(
      data =>{
        this.categoryName=data.categoryName;
      },
      error =>console.log(error)
    );
  }
}
