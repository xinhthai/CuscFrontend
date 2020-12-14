import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../news-category/category.model';
import { CategoryService } from '../news-category/category.service';
import * as Editor from '../../../../assets/ckeditor5/build/ckeditor';

@Component({
  selector: 'app-news-input',
  templateUrl: './news-input.component.html',
  styleUrls: ['./news-input.component.scss','../../../../assets/forms.scss']
})
export class NewsInputComponent implements OnInit {
  active:boolean=false;
  listcategory : Observable<Category[]>;
  public Editor = Editor ;
  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.listCategory();
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
  listCategory(){
    this.categoryService.getAllCategory().subscribe(
      data =>{
        this.listcategory=data;
        console.log(data);
      },
      error => console.log(error)
    );
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
}
