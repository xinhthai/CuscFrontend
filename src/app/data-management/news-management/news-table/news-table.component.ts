import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news-table',
  templateUrl: './news-table.component.html',
  styleUrls: ['./news-table.component.scss','../../../../assets/forms.scss']
})
export class NewsTableComponent implements OnInit {
  active : boolean=false;
  constructor() { }

  ngOnInit(): void {
  }

}
