import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Post } from '../entity/Post';
import { Exam } from '../exam/exam';

@Injectable({
  providedIn: 'root'
})
export class PublicService {

  private PUBLIC_URL = environment.apiUrl +'/api/public';

  constructor(private httpClient: HttpClient) { }
  getAllPostIsActive(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(`${this.PUBLIC_URL  + '/all'}`);
  }

  getExamPublic(): Observable<Exam[]> {
    return this.httpClient.get<Exam[]>(`${this.PUBLIC_URL  + '/all-exam'}`);
  }

  getAllExamPublicWithPagination(term: string ): Observable<any> {
    let terms = new HttpParams().set('term', term);
    return this.httpClient.get<Exam[]>(`${this.PUBLIC_URL + '/search'}`,{ params: terms } );
  }
}
