import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Exam } from '../exam/exam';

@Injectable({
  providedIn: 'root'
})
export class PublicService {

  private PUBLIC_URL = environment.apiUrl +'/api/public';

  constructor(private httpClient: HttpClient) { }
  getPublicContent(): Observable<any> {
    return this.httpClient.get(`${this.PUBLIC_URL  + '/all'}`, { responseType: 'text' });
  }

  getExamPublic(): Observable<Exam[]> {
    return this.httpClient.get<Exam[]>(`${this.PUBLIC_URL  + '/all-exam'}`);
  }

  getAllExamPublicWithPagination(term: string ): Observable<any> {
    let terms = new HttpParams().set('term', term);
    return this.httpClient.get<Exam[]>(`${this.PUBLIC_URL + '/search'}`,{ params: terms } );
  }
}
