import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Exam } from '../exam/exam';
import { AddQuestionIntoExam, Question } from '../question/question';

@Injectable({
  providedIn: 'root'
})
export class ExamService {


  private Exam_URL = 'http://localhost:8080/api/exam/';
  constructor(private httpClient: HttpClient) { }


  getAllExam(): Observable<Exam[]> {
    return this.httpClient.get<Exam[]>(`${this.Exam_URL + 'list'}`);
  }
  addExam(Exam: Exam): Observable<Object> {
    return this.httpClient.post<Exam>(`${this.Exam_URL + 'create'}`, Exam);
  }
  getExamById(id: number): Observable<Exam> {
    return this.httpClient.get<Exam>(`${this.Exam_URL }${id}`);
  }
  updateExam(id: number, Exam: Exam): Observable<object> {
    return this.httpClient.put(`${this.Exam_URL + 'update'}/${id}`, Exam);
  }
  deleteExam(id: number): Observable<object> {
    return this.httpClient.delete(`${this.Exam_URL + 'delete'}/${id}`);
  }

  getAllExamrWithPagination(term: string ): Observable<any> {

    let terms = new HttpParams().set('term', term);
    return this.httpClient.get<Exam[]>(`${this.Exam_URL + 'search'}`,{ params: terms } );
  }

  sendQuestionIntoExam(examId: number, value: any): Observable<any> {
    return this.httpClient.post<any>(`${this.Exam_URL + 'send_question_into_exam'}/${examId}`, value);
  }

  sendResutl(examId: number, mark: string): Observable<any>{
    return this.httpClient.post<any>(`${this.Exam_URL + 'send_result'}/${examId}`, mark);
  }
}
