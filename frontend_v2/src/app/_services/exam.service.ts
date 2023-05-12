import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Exam, ExamFillWord } from '../entity/Exam';

@Injectable({
  providedIn: 'root'
})
export class ExamService {


  private Exam_URL =  environment.apiUrl + '/api/exam/';
  private ExamFillWord_URL =  environment.apiUrl + '/api/examfillword/';
  constructor(private httpClient: HttpClient) { }


  getAllExam(): Observable<Exam[]> {
    return this.httpClient.get<Exam[]>(`${this.Exam_URL + 'listAll'}`);
  }
  addExam(Exam: Exam): Observable<Object> {
    return this.httpClient.post<Exam>(`${this.Exam_URL + 'create'}`, Exam );
  }
  getExamByIdAndExamName(id: number, examname:string,type: string): Observable<any> {
    return this.httpClient.get<any>(`${this.Exam_URL }${id}/${examname}/${type}`);
  }
  updateExam(id: number, Exam: Exam): Observable<object> {
    return this.httpClient.put(`${this.Exam_URL + 'update'}/${id}`, Exam);
  }

  updateExamFillWord(id: number, examFillWord: ExamFillWord): Observable<object> {
    return this.httpClient.put(`${this.ExamFillWord_URL + 'update'}/${id}`, examFillWord);
  }

  deleteExam(id: number, examname: string): Observable<object> {
    return this.httpClient.delete(`${this.Exam_URL + 'delete'}/${id}/${examname}`);
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

  activeExam(examId: number, isActive: any):Observable<any>{
    return this.httpClient.post<any>(`${this.Exam_URL + 'active'}/${examId}`, isActive);
  }

  activeExamFillWord(examId: number, isActive: any):Observable<any>{
    return this.httpClient.post<any>(`${this.ExamFillWord_URL + 'active'}/${examId}`, isActive);
  }
  createExamByExcel(formData: FormData):Observable<any>{
    return this.httpClient.post<any>(this.Exam_URL + 'create-exam-by-excel', formData);
  }
  createExamFillWordByExcel(formData: FormData):Observable<any>{
    return this.httpClient.post<any>(this.ExamFillWord_URL + 'create-exam-by-excel', formData);
  }
}
