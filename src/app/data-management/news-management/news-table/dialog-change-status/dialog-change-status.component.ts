import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SnotifyService } from 'ng-snotify';
import { NewsService } from '../../news.service';
@Component({
  selector: 'app-dialog-change-status',
  templateUrl: './dialog-change-status.component.html',
  styleUrls: ['./dialog-change-status.component.scss']
})
export class DialogChangeStatusComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: {id: number, status : boolean},
    private newsService: NewsService,
    private snotifyService: SnotifyService
  ) { }

  ngOnInit(): void {
  }
  CloseDialog(){
    this.dialog.closeAll();
  }
  message: string;
  ChangeStatusNews(){
    if(this.data.status===true){
      this.message='Đã đăng tin thành công';
    }
    if(this.data.status===false){
      this.message='Đã gỡ tin thành công';
    }
    this.newsService.changeStatusNews(this.data.id, this.data.status).subscribe(
      data =>{

        this.snotifyService.info(this.message);
        this.dialog.closeAll();
        this.reload();
      },
      error =>console.log(error)
    );
  }
  reload(){
    setTimeout("window.location.reload(true);",3000);
  }
}
