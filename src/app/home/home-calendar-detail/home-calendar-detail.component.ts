import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Calendar } from 'src/app/data-management/calendar/calendar.model';
import { CalendarService } from 'src/app/data-management/calendar/calendar.service';

@Component({
  selector: 'app-home-calendar-detail',
  templateUrl: './home-calendar-detail.component.html',
  styleUrls: ['./home-calendar-detail.component.scss']
})
export class HomeCalendarDetailComponent implements OnInit {
  calendar: Calendar=new Calendar();
  constructor(
    private route: ActivatedRoute,
    private calendarService: CalendarService
  ) { }

  ngOnInit(): void {
    this.getId();
  }
  id: number;
  getId(){
    this.route.params.subscribe(
      param =>{
        this.id=param['id'];
        console.log(this.id);
        this.getDetailCalendar(this.id);
      },
      error => console.log(error)
    );
  }
  getDetailCalendar(id){
    this.calendarService.getCalendarById(id).subscribe(
      data => {
        this.calendar=data;
        console.log(this.calendar);
      },
      error => console.log(error)
    );
  }
}
