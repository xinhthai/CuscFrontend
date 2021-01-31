import { Route } from '@angular/compiler/src/core';
import { AfterViewInit, Component, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EventEmitter } from 'events';
import { NewsViewDTO} from '../news.model';
import { NewsService } from '../news.service';
import {MatDialog} from '@angular/material/dialog';
import { DialogDeleteComponent } from '../news-category/dialog-delete/dialog-delete.component';
import { DialogChangeStatusComponent } from './dialog-change-status/dialog-change-status.component';
import { LocalStorageService } from 'ngx-webstorage';
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
  displayColumn:string[]=['title','dateCreate','category','detail'];
  constructor(
    private router: Router,
    private newsService: NewsService,
    private dialog: MatDialog,
    private local: LocalStorageService
  ) { }


  ngOnInit(): void {
    this.getAllNewsByTitle();
    this.checkRole();
  }
  nextToCreateNews(){
    this.router.navigate(['/admin/news/create-news']);
  }
  getAllNewsByTitle(){
    this.newsService.getAllNewsByTitle().subscribe(
      data =>{
        this.dataSource=data;
        console.log(this.dataSource);
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
  // delete news dialog
  deleteNewsDialog(id){
    this.dialog.open(DialogDeleteComponent,{
      data: {id: id, type: 'news'}
    })
  }
  // dialog xac nhan thay doi status tin tuc
  updateStatus(id,status){
    this.dialog.open(DialogChangeStatusComponent,{
      data: {id: id, status: status}
    })
  }

  //phan chia component
  role: Array<String>;
  checkRole(){
    this.role=this.local.retrieve('currentUser').authorities;
    console.log(this.role);
    this.roleAdmin();
  }
  enableStatus=false;
  roleAdmin(){
    for(var i=0;i<this.role.length;i++){
      if(this.role[i] === 'ROLE_ADMIN'){
        this.enableStatus=true;
        this.displayColumn.push('checknews');
        this.displayColumn.push('deleteNews');
      }
    }
  }
}
