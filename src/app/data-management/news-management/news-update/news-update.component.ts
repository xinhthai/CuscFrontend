import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import * as Editor from '../../../../assets/ckeditor5/build/ckeditor';
import { Menu } from 'src/app/layouts/main-layout/menu.model';
import { Category } from '../news-category/category.model';
import { CategoryService } from '../news-category/category.service';
import { MatDialog } from '@angular/material/dialog';
import { MenuService } from 'src/app/layouts/main-layout/menu.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
// import { DialogComponent } from '../news-input/news-input.component';

@Component({
  selector: 'app-news-update',
  templateUrl: './news-update.component.html',
  styleUrls: ['./news-update.component.scss']
})
export class NewsUpdateComponent implements OnInit {
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
  formUpdateNews=new FormGroup({
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
    toolbar:
      [
        'heading',
        '|',
        'bold',
        'italic',
        'fontSize',
        'fontFamily',
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
        'htmlEmbed',
        'undo',
        'redo'
      ],

    image: {
      toolbar: [
        'imageStyle:alignLeft', 'imageStyle:alignCenter', 'imageStyle:alignRight',
        '|',
        'imageResize',
        '|',
        'imageTextAlternative',
        'linkImage'
      ],
      styles: ['alignLeft', 'alignCenter', 'alignRight'],
      resizeOptions: [
        {
            name: 'imageResize:original',
            label: 'Original',
            value: null
        },
        {
            name: 'imageResize:50',
            label: '50%',
            value: '50'
        },
        {
            name: 'imageResize:75',
            label: '75%',
            value: '75'
        }
    ],
    },
    table: {
      contentToolbar: [
        'tableColumn',
        'tableRow',
        'mergeTableCells'
      ]
    },
    fullPage:true,

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
    if(e.target.files){
      var reader=new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload=(event:any)=>{
        console.log(event.target.result)
        this.url=event.target.result;
      }
    }
  }
  // // show dialog
  // nameinfo:string;
  // openDialog(){
  //   this.nameinfo='Bạn có chắc muốn update thông tin tin tức?';
  //   this.dialog.open(DialogComponent,{
  //     data: {nameinfo: this.nameinfo, status: 0}
  //   });
  // }
}
