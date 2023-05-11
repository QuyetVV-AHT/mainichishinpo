import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Result } from '../entity/Result';

@Injectable({
  providedIn: 'root'
})
export class ResutlsService {
  private RESULT_URL = environment.apiUrl +'/api/result/';
  constructor(private httpClient: HttpClient) { }

  getAllResult(): Observable<Result[]> {
    return this.httpClient.get<Result[]>(`${this.RESULT_URL + 'list'}`);
  }

}
