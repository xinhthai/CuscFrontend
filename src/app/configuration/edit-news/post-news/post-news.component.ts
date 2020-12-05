import { Component, OnInit } from '@angular/core';
import * as ClassicEditor  from '@ckeditor/ckeditor5-build-classic';
@Component({
  selector: 'app-post-news',
  templateUrl: './post-news.component.html',
  styleUrls: ['./post-news.component.scss']
})
export class PostNewsComponent implements OnInit {
  public Editor=ClassicEditor;
  constructor() { }

  ngOnInit(): void {
  }

}
