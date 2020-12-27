import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { NewsViewDTO } from 'src/app/data-management/news-management/news.model';
import { NewsService } from 'src/app/data-management/news-management/news.service';

@Component({
  selector: 'app-list-new-by-menu',
  templateUrl: './list-new-by-menu.component.html',
  styleUrls: ['./list-new-by-menu.component.scss']
})
export class ListNewByMenuComponent implements OnInit {
  listNewsByMenuId: Observable<NewsViewDTO>;
  p:number;
  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService
  ) { }
  id: string;
  ngOnInit(): void {
    this.getId();
  }
  getId(){
    this.route.params.subscribe(
      params =>{
        this.id=params['id'];
        console.log(this.id);
        this.getListNewsByMenuId(this.id);
      },
      error =>console.log(error)
    );
  }
  getListNewsByMenuId(id){
    this.newsService.getListNewsByMenuId(id).subscribe(
      data =>{
        this.listNewsByMenuId=data;
        console.log(this.listNewsByMenuId);
      },
      error => console.log(error)
    );
  }

}
