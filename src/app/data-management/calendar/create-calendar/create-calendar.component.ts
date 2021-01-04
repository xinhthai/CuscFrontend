import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { Calendar } from '../calendar.model';
import { CalendarService } from '../calendar.service';
@Component({
  selector: 'app-create-calendar',
  templateUrl: './create-calendar.component.html',
  styleUrls: ['./create-calendar.component.scss']
})
export class CreateCalendarComponent implements OnInit {
  Calendar: Calendar=new Calendar();
  checked=true;
  constructor(
    private calendarService : CalendarService,
    private route: ActivatedRoute,
    private snotifyService: SnotifyService
  ) { }

  ngOnInit(): void {
    this.getId();
  }
  id:number
  getId(){
    this.route.params.subscribe(
      params =>{
        this.id=params['id'];
        console.log(this.id);
        if(this.id!=undefined){
          this.getCalendarById(this.id);
        }
        // this.getListNewsByMenuId(this.id);
      },
      error =>console.log(error)
    );
  }
  getCalendarById(id){
    this.calendarService.getCalendarById(id).subscribe(
      data =>{
        this.Calendar=data;
        this.snotifyService.success('Thêm lịch tuyển sinh thành công!');
      }
    )
  }
  updateCalendar(){
    this.calendarService.updateCalendarById(this.Calendar).subscribe(
      data =>{
        this.snotifyService.success('Đã sửa thông tin lịch tuyển sinh!')
      },
      error => console.log(error)
    );
  }
  addCalendar(){
    console.log(this.Calendar);
    this.calendarService.addCalendar(this.Calendar).subscribe(
      data =>{

        console.log('Thêm lịch tuyển sinh thành công');
      },
      error =>console.log(error)
    );
  }
}
