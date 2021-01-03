import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Calendar } from '../calendar.model';

@Component({
  selector: 'app-list-calendar',
  templateUrl: './list-calendar.component.html',
  styleUrls: ['./list-calendar.component.scss']
})
export class ListCalendarComponent implements OnInit {
  dataSource: MatTableDataSource<Calendar>;
  displayColumns: string[]=['name', 'thidauvao', 'ngaythi','ngaykg','bddk','ktdk','ttkhac','add','del'];
  constructor() { }

  ngOnInit(): void {
  }
  updateDialog(){

  }
  deleteDialog(){

  }
}
