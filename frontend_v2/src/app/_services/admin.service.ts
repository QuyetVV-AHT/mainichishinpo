import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {Totaldto} from "../entity/Totaldto";
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private ADMIN_URL = environment.apiUrl +'/api/admin/';

  constructor(private httpClient: HttpClient) { }

  getAllTotal(): Observable<Totaldto> {
    return this.httpClient.get<Totaldto>(`${this.ADMIN_URL + 'total'}`);
  }
}
