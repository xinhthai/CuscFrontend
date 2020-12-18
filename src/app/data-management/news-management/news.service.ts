import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewsDTO } from './news.model';

const URL='http://localhost:3000/api/news';
const httpOptions = {
  headers : new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class NewsService {
  constructor(
    public http: HttpClient
  ) { }
  addNews(news: NewsDTO): Observable<any>{
    console.log(news);
    const formData = new FormData();
    formData.append('newsId','');
    formData.append('title',news.title);
    formData.append('detail',news.detail);
    formData.append('imagePath',news.imagePath);
    formData.append('mainNews',String(news.mainNews));
    formData.append('categoryId',String(news.categoryId));
    formData.append('menuId',String(news.menuId));
    return this.http.post(`${URL}`,formData)
  }
}
