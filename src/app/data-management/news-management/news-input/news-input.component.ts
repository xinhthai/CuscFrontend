import { Component,OnInit, ViewChild, } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../news-category/category.model';
import { CategoryService } from '../news-category/category.service';
import * as ClassicEditor from '../../../../assets/ckeditor5/build/ckeditor';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnotifyService } from 'ng-snotify';
import { MenuService } from 'src/app/layouts/main-layout/menu.service';
import { NewsService } from '../news.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NewsDTO } from '../news.model';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-news-input',
  templateUrl: './news-input.component.html',
  styleUrls: ['./news-input.component.scss','../../../../assets/forms.scss']
})
export class NewsInputComponent implements OnInit {
  active:boolean=false;
  newsDTO = new NewsDTO();
  url_image: any;
  selectedCategory ='';
  selectedMenu = '';
  editorContent = '';
  listCategory: any;
  listMenu: any;
  menuId: any;
  animals:string;
  checked=false;
  public Editor = ClassicEditor ;
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  constructor(
    private categoryService: CategoryService,
    private dialog : MatDialog,
    private menuService: MenuService,
    private newsService: NewsService,
    private snotifyService: SnotifyService,
    private $localStorage: LocalStorageService
  ) { }
  ngOnInit(): void {
    this.getAllCategory();
    this.getAllMenu();
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
        'fontSize',
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
        'imageTextAlternative',
        'linkImage'
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
        this.newsDTO.imagePath = e.target.files[0];
      }
    }
  }

  getCategory(selectedCategory){
    for(let i =0; i < this.listCategory.length; i++){
      if(selectedCategory === this.listCategory[i].categoryName){
        this.newsDTO.categoryId = this.listCategory[i].categoryId;
      }
    }
  }

  getMenu(menuName: any,id: any){
    this.selectedMenu = menuName;
    this.menuId = id;
  }

  addNews(newsDTO:NewsDTO): any{
    newsDTO.username = this.$localStorage.retrieve('currentUser').username;
    this.menuId?newsDTO.menuId = this.menuId : newsDTO.menuId = 0;
    newsDTO.detail = this.editorContent;
    newsDTO.mainNews = this.checked;
    console.log(newsDTO);
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
