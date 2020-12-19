import { Byte } from "@angular/compiler/src/util";

export class NewsDTO{
  newsId: number;
  title: string = '';
  detail: string;
  createdDate: Date;
  menuId: number;
  categoryId: number;
  userId: string;
  mainNews: boolean;
  imagePath: File;
}
export class ViewNewsDTO{
  newsId: number;
  title: string;
}
