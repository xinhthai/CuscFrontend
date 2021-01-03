
export class NewsDTO{
  newsId: number;
  title: string = '';
  shortContent: string;
  detail: string;
  createdDate: Date;
  menuId: number = 0;
  categoryId: number = 0;
  username: string;
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
