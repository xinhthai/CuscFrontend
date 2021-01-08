import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from 'src/app/app.constants';
import { NewsDTO} from './news.model';

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
    formData.append('username',news.username);
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
    return this.http.get(SERVER_API_URL + '/news/view',httpOptions);
  }

  deleteNewsById(id): Observable<any>{
    return this.http.delete(`${SERVER_API_URL}+'/news/'${id}`,httpOptions);
  }
  getDetailNews(id):Observable<any>{
    return this.http.get(`${SERVER_API_URL}+'/news/'${id}`,httpOptions);
  }
  changeStatusNews(id,status):Observable<any>{
    return this.http.put(`${SERVER_API_URL}+'/news/'${id}`,'',{
      params: new HttpParams().set('status',status)
    });
  }
  getListNewByCategoryId(id):Observable<any>{
    return this.http.get(SERVER_API_URL + '/news/type',{
      params: new HttpParams().set('categoryId',id)
    });
  }
  getListNewsByMenuId(id):Observable<any>{
    return this.http.get(SERVER_API_URL + '/news/type',{
      params: new HttpParams().set('menuId',id)
    });
  }

}
