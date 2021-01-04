import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnotifyService } from 'ng-snotify';
import { CalendarService } from '../calendar.service';

@Component({
  selector: 'app-dialog-delete-calendar',
  templateUrl: './dialog-delete-calendar.component.html',
  styleUrls: ['./dialog-delete-calendar.component.scss']
})
export class DialogDeleteCalendarComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {id: number},
    private calendarService: CalendarService,
    private snotifyService: SnotifyService
  ) { }

  ngOnInit(): void {
  }
  deleteCalendar(id){
    this.calendarService.deleteCalendar(id).subscribe(
      data =>{
        this.snotifyService.success('Đã xóa thành công lịch tuyển sinh!');
      },
      error => console.log(error)
    );
  }
}
