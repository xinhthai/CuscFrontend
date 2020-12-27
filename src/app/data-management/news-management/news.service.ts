import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewsDTO} from './news.model';

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
    const formData = new FormData();
    formData.append('newsId','');
    formData.append('shortContent',news.shortContent);
    formData.append('title',news.title);
    formData.append('detail',news.detail);
    formData.append('imagePath',news.imagePath);
    formData.append('mainNews',String(news.mainNews));
    formData.append('categoryId',String(news.categoryId));
    formData.append('menuId',String(news.menuId));
    return this.http.post(`${URL}`,formData)
  }
  updateNews(news: NewsDTO): Observable<any>{
    const formData = new FormData();
    formData.append('newsId',String(news.newsId));
    formData.append('shortContent',news.shortContent);
    formData.append('title',news.title);
    formData.append('detail',news.detail);
    formData.append('imagePath',news.imagePath);
    formData.append('mainNews',String(news.mainNews));
    formData.append('categoryId',String(news.categoryId));
    formData.append('menuId',String(news.menuId));
    formData.append('createdDate',String(news.createdDate));
    return this.http.put(`${URL}`,formData)
  }
  getAllNewsByTitle(): Observable<any>{
    return this.http.get("http://localhost:3000/api/news/view",httpOptions);
  }

  deleteNewsById(id): Observable<any>{
    console.log(id);
    return this.http.delete(`${URL}/${id}`,httpOptions);
  }
  getDetailNews(id):Observable<any>{
    return this.http.get(`${URL}/${id}`,httpOptions);
  }
  changeStatusNews(id,status):Observable<any>{
    return this.http.put(`${URL}/${id}`,'',{
      params: new HttpParams().set('status',status)
    });
  }
  getListNewByCategoryId(id):Observable<any>{
    return this.http.get("http://localhost:3000/api/news/type",{
      params: new HttpParams().set('categoryId',id)
    });
  }
  getListNewsByMenuId(id):Observable<any>{
    return this.http.get('http://localhost:3000/api/news/type',{
      params: new HttpParams().set('menuId',id)
    });
  }

}
