import { Component,OnInit, ViewChild, } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../news-category/category.model';
import { CategoryService } from '../news-category/category.service';
import * as ClassicEditor from '../../../../assets/ckeditor5/build/ckeditor';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnotifyService } from 'ng-snotify';
import { Menu } from 'src/app/layouts/main-layout/menu.model';
import { MenuService } from 'src/app/layouts/main-layout/menu.service';
import { NewsService } from '../news.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NewsDTO } from '../news.model';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';

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
    private snotifyService: SnotifyService
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
        console.log(this.selectedCategory)

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

  // dialog
//   nameinfo:string;
//   openDialog(){
//     this.nameinfo="Bạn có chắc muốn thêm bản tin vào danh sách tin tức?";
//     this.dialog.open(DialogComponent,{
//       data: {nameinfo: this.nameinfo, status: 1}
//     });
//   }
// }
// @Component({
//   selector: 'dialog-component',
//   templateUrl: './dialog.component.html'
// })
// export class DialogComponent implements OnInit{
//   constructor(
//     @Inject(MAT_DIALOG_DATA) public data: { nameinfo: string, status: number}
//   ){}
//   ngOnInit(): void {

//   }

//   notifycation(){
//     console.log('đây đây nè');
//   }
}
