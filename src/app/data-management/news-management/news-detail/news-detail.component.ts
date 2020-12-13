import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss']
})
export class NewsDetailComponent implements OnInit {

  constructor( private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getDetail();
  }
  getDetail():void{
    const id=+this.route.snapshot.params['id'];
    console.log(id);
  }
}
