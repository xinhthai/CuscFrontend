import { Component, Inject, Injectable, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../news-category/category.model';
import { CategoryService } from '../news-category/category.service';
import * as Editor from '../../../../assets/ckeditor5/build/ckeditor';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnotifyService } from 'ng-snotify';
import { Menu } from 'src/app/layouts/main-layout/menu.model';
import { MenuService } from 'src/app/layouts/main-layout/menu.service';
import { FormGroup, FormBuilder, FormControl} from '@angular/forms';

@Component({
  selector: 'app-news-input',
  templateUrl: './news-input.component.html',
  styleUrls: ['./news-input.component.scss','../../../../assets/forms.scss']
})
export class NewsInputComponent implements OnInit {
  active:boolean=false;
  listcategory : Observable<Category[]>;
  listmenu: Observable<Menu[]>;
  animals:string;
  checked=false;
  public Editor = Editor ;
  constructor(
    private categoryService: CategoryService,
    private dialog : MatDialog,
    private menuService: MenuService,
    private fb: FormBuilder
  ) { }
  ngOnInit(): void {
    this.listCategory();
    this.listMenu();
  }
  formCreateNews=new FormGroup({
    nameNews: new FormControl(''),
    selectCategory: new FormControl(''),
    // chooseMenu: new FormControl(''),
    checkNewsMain: new FormControl(''),
    chooseImage : new FormControl(''),
    ckeditor: new FormControl(''),
  })
  editorConfig = {
    cloudServices: {
      tokenUrl: 'https://76928.cke-cs.com/token/dev/13a87a8fd6e484e195eae3543653d57318614c7a424dc6b570931d5ecd0e',
      uploadUrl:'https://76928.cke-cs.com/easyimage/upload/'
    },
    toolbar: {
      items: [
        'heading',
        '|',
        'bold',
        'italic',
        'link',
        'bulletedList',
        'numberedList',
        '|',
        'indent',
        'outdent',
        '|',
        'imageUpload',
        'blockQuote',
        'insertTable',
        'mediaEmbed',
        'undo',
        'redo'
      ]
    },
    image: {
      toolbar: [
        'imageStyle:alignleft',
        'imageStyle:full',
        'imageStyle:alignright',
        '|',
        'imageTextAlternative'
      ],
      styles:['alignLeft','full','alignRight']
    },
    table: {
      contentToolbar: [
        'tableColumn',
        'tableRow',
        'mergeTableCells'
      ]
    },
  }
  listCategory(){
    this.categoryService.getAllCategory().subscribe(
      data =>{
        this.listcategory=data;
      },
      error => console.log(error)
    );
  }
  // list menu
  listMenu(){
    this.menuService.getAllMenu().subscribe(
      data =>{
        this.listmenu=data;
      },
      error => console.log(error)
    )
  }
  // show image
  url="../../../../assets/image/doreamon.jpg";
  onselectFile(e){
    console.log('hello'+ e);
    if(e.target.files){
      var reader=new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload=(event:any)=>{
        console.log(event.target.result)
        this.url=event.target.result;
      }
    }
  }
  // dialog
  nameinfo:string;
  openDialog(){
    this.nameinfo="Bạn có chắc muốn thêm bản tin vào danh sách tin tức?";
    this.dialog.open(DialogComponent,{
      data: {nameinfo: this.nameinfo, status: 1}
    });
  }
}
@Component({
  selector: 'dialog-component',
  templateUrl: './dialog.component.html'
})
export class DialogComponent implements OnInit{
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { nameinfo: string, status: number}
  ){}
  ngOnInit(): void {

  }

  notifycation(){
    console.log('đây đây nè');
  }
}
