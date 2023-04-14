import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Question } from '../question/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private Question_URL = environment.apiUrl +'/api/question/';
  constructor(private httpClient: HttpClient) { }


  getAllQuestion(): Observable<Question[]> {
    return this.httpClient.get<Question[]>(`${this.Question_URL + 'list'}`);
  }
  addQuestion(Question: Question): Observable<Object> {
    return this.httpClient.post<Question>(`${this.Question_URL + 'create'}`, Question);
  }
  getQuestionById(id: number): Observable<Question> {
    return this.httpClient.get<Question>(`${this.Question_URL }${id}`);
  }
  updateQuestion(id: number, Question: Question): Observable<object> {
    return this.httpClient.put(`${this.Question_URL + 'update'}/${id}`, Question);
  }
  deleteQuestion(id: number): Observable<object> {
    return this.httpClient.delete(`${this.Question_URL + 'delete'}/${id}`);
  }

  getAllQuestionrWithPagination(term: string ): Observable<any> {

    let terms = new HttpParams().set('term', term);
    return this.httpClient.get<Question[]>(`${this.Question_URL + 'search'}`,{ params: terms } );
  }

  upLoadFile(formData: FormData):Observable<any>{
    return this.httpClient.post<any>(this.Question_URL + 'upload', formData);
  }
}
