import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { Calendar } from '../calendar.model';
import { CalendarService } from '../calendar.service';
import { DialogDeleteCalendarComponent } from '../dialog-delete-calendar/dialog-delete-calendar.component';

@Component({
  selector: 'app-list-calendar',
  templateUrl: './list-calendar.component.html',
  styleUrls: ['./list-calendar.component.scss']
})
export class ListCalendarComponent implements OnInit {
  dataSource: MatTableDataSource<Calendar>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayColumns: string[]=['name', 'ngaythi','bddk','ktdk','add','del'];
  constructor(
    private calendarService: CalendarService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.listCategory();
  }
  listCategory(){
    this.calendarService.listCalendar().subscribe(
      data => {
        console.log(data);
        this.dataSource=data;
        this.dataSource =new MatTableDataSource(data);
        this.dataSource.paginator=this.paginator;
      }
    )
  }
  updateDialog(id){
    this.router.navigate(['/admin/add-calendar/',id]).then(
      data=>{
        console.log('Chuyển route thành công!');
      }
    )
  }
  deleteDialog(id){
    this.dialog.open(DialogDeleteCalendarComponent,{
      data: {id: id}
    })
  }
}
