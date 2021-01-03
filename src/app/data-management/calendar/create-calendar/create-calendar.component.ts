import { Component, OnInit } from '@angular/core';
import { Calendar } from '../calendar.model';
@Component({
  selector: 'app-create-calendar',
  templateUrl: './create-calendar.component.html',
  styleUrls: ['./create-calendar.component.scss']
})
export class CreateCalendarComponent implements OnInit {
  Calendar: Calendar=new Calendar();
  checked=true;
  constructor() { }

  ngOnInit(): void {
  }

}
