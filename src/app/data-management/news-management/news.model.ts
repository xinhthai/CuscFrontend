import { Byte } from "@angular/compiler/src/util";

export class NewsDTO{
  newsId: number;
  title: string = '';
  shortContent: string;
  detail: string;
  createdDate: Date;
  menuId: number;
  categoryId: number;
  userId: string;
  mainNews: boolean;
  imagePath: File;
  status: boolean;
}
export class NewsViewDTO{
  newsId: number;
  title: string;
  shortContent: string;
  imagePath: string;
  categoryName: string;
  status: boolean;
  mainNews: boolean;
  createdDate: Date;
}
