import { Route } from '@angular/compiler/src/core';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, ObservedValueOf } from 'rxjs';
import * as Editor from '../../../../assets/ckeditor5/build/ckeditor';
import { MenuService } from 'src/app/layouts/main-layout/menu.service';
import { CategoryService } from '../news-category/category.service';
import { NewsDTO } from '../news.model';
import { NewsService } from '../news.service';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { SnotifyService } from 'ng-snotify';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss']
})
export class NewsDetailComponent implements OnInit {
  active:boolean=false;
  newsDTO = new NewsDTO();
  url_image: any;
  directory_url= "../../../../assets/news_images";
  selectedCategory ='';
  selectedMenu = '';
  editorContent = '';
  listCategory: any;
  listMenu: any;
  menuId: any;
  animals:string;
  selected=21;
  checked=false;
  public Editor = Editor ;
  newsDetail: Observable<NewsDTO>
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService,
    private categoryService: CategoryService,
    private menuService: MenuService,
    private snotifyService: SnotifyService,
  ) { }
  ngOnInit(): void {
    this.getDetail();
    this.getAllCategory();
    this.getAllMenu();
    console.log(this.newsDTO);
    console.log(this.newsDTO.categoryId);
    console.log(this.selected);
  }
  getDetail():void{
    const id=+this.route.snapshot.params['id'];
    console.log(id);
    this.getDetailNewsService(id);
  }
  getDetailNewsService(id){
    // var reader=new FileReader();
    // reader.readAsDataURL(target.files[0]);
    // reader.onload=(event:any)=>{
    //   this.url_image=event.target.result;
    //   this.newsDTO.imagePath = e.target.files[0];
    // }
    this.newsService.getDetailNews(id).subscribe(
      data =>{
        this.newsDTO=data;
        this.selected=data.category.categoryId;
        this.selectedMenu=data.menu.name;
        this.url_image=this.directory_url + data.imagePath;
        this.editorContent = this.newsDTO.detail;
        console.log(data);
      },
      error => console.log(error)
    )
  }
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
  getAllCategory(){
    this.categoryService.getAllCategory().subscribe(
      data =>{
        this.listCategory=data;
        console.log(this.listCategory)
      },
      error => console.log(error)
    );
  }
  // list menu
  getAllMenu(){
    this.menuService.getAllMenu().subscribe(
      data =>{
        this.listMenu=data;
        console.log(this.listMenu)
      },
      error => console.log(error)
    );
  }
  // show image
  // this.news.="../../../../assets/image/doreamon.jpg";
  onselectFile(e){
    if(e.target.files){
      var reader=new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload=(event:any)=>{
        this.url_image=event.target.result;
        this.newsDTO.imagePath = e.target.files[0];
      }
    }
  }

  getCategory(selectedCategory){
    for(let i =0; i < this.listCategory.length; i++){
      if(selectedCategory === this.listCategory[i].categoryName){
        this.newsDTO.categoryId = this.listCategory[i].categoryId;
        console.log(this.newsDTO.categoryId);
      }
    }
  }

  getMenu(menuName: any,id: any){
    this.selectedMenu = menuName;
    this.menuId = id;
  }

  addNews(newsDTO:NewsDTO): any{
    newsDTO.menuId = this.menuId;
    newsDTO.detail = this.editorContent;
    this.newsService.addNews(newsDTO).subscribe(
    data =>{
      this.snotifyService.success('Thêm tin tức thành công!')
    },
    (err : HttpErrorResponse) => {
      console.log('backend returned code ${err.status}, body was: ${err.error} ');
      this.snotifyService.error('Thêm loại tin thất bại!');
    }
  );
}
}
