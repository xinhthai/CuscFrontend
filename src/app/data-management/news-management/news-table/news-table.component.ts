import { Route } from '@angular/compiler/src/core';
import { AfterViewInit, Component, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EventEmitter } from 'events';
import { NewsViewDTO} from '../news.model';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-news-table',
  templateUrl: './news-table.component.html',
  styleUrls: ['./news-table.component.scss','../../../../assets/forms.scss']
})
export class NewsTableComponent implements OnInit{
  active : boolean=false;
  // viewNews: ViewNewsDTO;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource :MatTableDataSource<NewsViewDTO>;
  displayColumn:string[]=['title','dateCreate','category','checknews','detail','deleteNews'];
  constructor(
    private router: Router,
    private newsService: NewsService
  ) { }


  ngOnInit(): void {
    this.getAllNewsByTitle();
  }
  nextToCreateNews(){
    this.router.navigate(['/admin/news/create-news']);
  }
  getAllNewsByTitle(){
    this.newsService.getAllNewsByTitle().subscribe(
      data =>{
        this.dataSource=data;
        this.dataSource=new MatTableDataSource(data);
        this.dataSource.paginator=this.paginator;
        this.dataSource.sort=this.sort;
        console.log(this.dataSource);
      },
      error => console.log(error)
    );
  }
  applyFilter(even: Event){
    const filterValue=(even.target as HTMLInputElement).value;
    this.dataSource.filter=filterValue.trim().toLowerCase();
    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }
  deleteNews(id){
    console.log(id);
    this.newsService.deleteNewsById(id).subscribe(
      data =>{
        console.log('Đã xóa tin thành công!');
      },
      error => console.log(error)
    )
  }
  id:number;
  detailNews(id){
    this.id=id;
    this.router.navigate(['/admin/news/detail/',id]).then(
      e =>{
        if(e){
          console.log("Chuyen route thanh cong!");
        }else {
          console.log("Chuyển route không thanh công");
        }
      }
    )
  }
}
