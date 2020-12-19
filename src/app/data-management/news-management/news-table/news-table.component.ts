import { Route } from '@angular/compiler/src/core';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { title } from 'process';
import { ViewNewsDTO } from '../news.model';
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
  dataSource :MatTableDataSource<ViewNewsDTO>;
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
}
