import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from 'src/app/app.constants';
import { Calendar } from './calendar.model';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(private http: HttpClient) {}
  addCalendar(calendar : Calendar): Observable<any>{
    return this.http.post(SERVER_API_URL + '/lits', calendar);
  };
  listCalendar(): Observable<any>{
    return this.http.get(SERVER_API_URL + '/lits');
  }
  deleteCalendar(id): Observable<any>{
    return this.http.delete(SERVER_API_URL+'/lits/'+id);
  }
  getCalendarById(id): Observable<any>{
    return this.http.get(SERVER_API_URL+'/lits/'+id);
  }
  updateCalendarById(calendar: Calendar): Observable<any>{
    return this.http.put(SERVER_API_URL+'/lits',calendar);
  }
}
