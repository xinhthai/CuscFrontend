import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Category } from '../news-category/category.model';
import { CategoryService } from '../news-category/category.service';
import { NewsViewDTO } from '../news.model';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  listCategory: Observable<Category>;
  listNews: Observable<NewsViewDTO>
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private newsService: NewsService,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.getListCategory();
    this.getListNews();
  }
  onMoreNews(id){
    this.router.navigate(['listnews',id], {relativeTo: this.route.parent});
  }
  getListCategory(){
    this.categoryService.getAllCategory().subscribe(
      data =>{
        this.listCategory=data;
      }
    )
  }
  getListNews(){
    this.newsService.getAllNewsByTitle().subscribe(
      data =>{
        this.listNews=data;
      }
    )
  }
}
