import { Component, OnInit } from '@angular/core';
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
  constructor(private calendarService : CalendarService) { }

  ngOnInit(): void {
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
