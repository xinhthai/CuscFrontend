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
  directory_url= "../../../../assets/news_images/";
  selectedMenu: any = {};
  selectedCategory: any= {};
  selectedImage: any;
  editorContent = '';
  listCategory: any[] = [];
  listMenu: any;
  covertToFile: any;
  menuId: any ;
  animals:string;
  categoryName: any;
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
 }
  id:number;
  getDetail():void{
    this.id=+this.route.snapshot.params['id'];
    this.getDetailNewsService(this.id);
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
        this.selectedCategory=data.category;
        this.selectedMenu=data.menu;
        this.url_image=this.directory_url + data.imagePath;
        this.selectedImage = new File(["Image-Not-Change"], data.imagePath, {
          type: "image/"+data.imagePath.substr(data.imagePath.length - 3),
        });
        this.editorContent = this.newsDTO.detail;
      },
      error => console.log(error)
    )
  }
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
  getAllCategory(){
    this.categoryService.getAllCategory().subscribe(
      data =>{
        this.listCategory=data;
      },
      error => console.log(error)
    );
  }
  // list menu
  getAllMenu(){
    this.menuService.getAllMenu().subscribe(
      data =>{
        this.listMenu=data;
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
        this.selectedImage = e.target.files[0];
      }
    }
  }

  getCategory(selectedCategoryName: string){
    for(let i =0; i < this.listCategory.length; i++){
      if(selectedCategoryName === this.listCategory[i].categoryName){
        this.selectedCategory.categoryId = this.listCategory[i].categoryId;
        this.selectedCategory.categoryName = this.listCategory[i].categoryName;
      }
    }
  }


  getMenu(menuName: any,id: any){
    this.selectedMenu.name = menuName;
    this.selectedMenu.menuId = id;
  }

  updateNews(newsDTO: NewsDTO):any{
    let newsUpdateDTO = new NewsDTO();
    newsUpdateDTO.newsId = newsDTO.newsId;
    newsUpdateDTO.shortContent = newsDTO.shortContent;
    newsUpdateDTO.title = newsDTO.title;
    newsUpdateDTO.detail = this.editorContent;
    newsUpdateDTO.mainNews = newsDTO.mainNews;
    newsUpdateDTO.status = newsDTO.status;
    newsUpdateDTO.imagePath = this.selectedImage;
    newsUpdateDTO.menuId = this.selectedMenu.menuId;
    newsUpdateDTO.categoryId = this.selectedCategory.categoryId;
    newsUpdateDTO.createdDate = newsDTO.createdDate;
    this.newsService.updateNews(newsUpdateDTO).subscribe(
      data => {
        this.snotifyService.success('Đã cập nhật tin tức thành công');
      },
      (err : HttpErrorResponse) => {
        console.log(err);
        this.snotifyService.error('Thêm loại tin thất bại!');
      }
    );
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
