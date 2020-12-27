import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsDTO } from '../../news.model';
import { NewsService } from '../../news.service';

@Component({
  selector: 'app-main-news-detail',
  templateUrl: './main-news-detail.component.html',
  styleUrls: ['./main-news-detail.component.scss']
})

export class MainNewsDetailComponent implements OnInit {
  newsDetail: NewsDTO= new NewsDTO();
  content: any;
  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService,

  ) { }

  ngOnInit(): void {
    this.getDetail();
  }
  getDetail():void{
    const id=+this.route.snapshot.params['id'];
    this.getNewsDetail(id);
  }
  getNewsDetail(id){
    this.newsService.getDetailNews(id).subscribe(
      data =>{
        this.newsDetail=data;
        console.log(this.newsDetail);
      }
    ),
    error =>console.log(error);
  }
}

