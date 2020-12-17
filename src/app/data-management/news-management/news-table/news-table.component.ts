import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news-table',
  templateUrl: './news-table.component.html',
  styleUrls: ['./news-table.component.scss','../../../../assets/forms.scss']
})
export class NewsTableComponent implements OnInit {
  active : boolean=false;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  nextToCreateNews(){
    this.router.navigate(['/admin/add-news']);
  }

}
