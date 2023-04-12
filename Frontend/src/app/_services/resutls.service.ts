import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Result } from '../entity/Result';

@Injectable({
  providedIn: 'root'
})
export class ResutlsService {
  private RESULT_URL = 'http://localhost:8080/api/result/';
  constructor(private httpClient: HttpClient) { }

  getAllResult(): Observable<Result[]> {
    return this.httpClient.get<Result[]>(`${this.RESULT_URL + 'list'}`);
  }
}
