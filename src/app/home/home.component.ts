import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Calendar } from '../data-management/calendar/calendar.model';
import { CalendarService } from '../data-management/calendar/calendar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss','../../assets/responsive.css']
})
export class HomeComponent implements OnInit {
  listCalendar: Observable<Calendar>;
  constructor(
    private calendarService: CalendarService
  ) { }

  ngOnInit(): void {
    this.getlistCalendar();
  }
  getlistCalendar(){
    this.calendarService.listCalendar().subscribe(
      data => {
        this.listCalendar=data;
      },
      error =>console.log(error)
    );
  }
  detailCalendar(id){

  }
}
