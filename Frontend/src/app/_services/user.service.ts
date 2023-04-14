import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User, UserRequest } from '../user/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_URL = environment.apiUrl +'/api/';
  private USER_URL = environment.apiUrl +'/api/user/';
  constructor(private httpClient: HttpClient) { }


  getUserBoard(): Observable<any> {
    return this.httpClient.get(`${this.API_URL   + 'test/user'}`, { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.httpClient.get(`${this.API_URL  + 'test/question'}`, { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.httpClient.get(`${this.API_URL  + 'test/admin'}`, { responseType: 'text' });
  }

  getAllUser(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.USER_URL + 'list'}`);
  }
  addUser(user: User): Observable<Object> {
    return this.httpClient.post<User>(`${this.USER_URL + 'create'}`, user);
  }
  getUserById(id: number): Observable<User> {
    return this.httpClient.get<User>(`${this.USER_URL }${id}`);
  }
  updateUser(id: number, user: User): Observable<object> {
    return this.httpClient.put(`${this.USER_URL + 'update'}/${id}`, user);
  }
  deleteUser(id: number): Observable<object> {
    return this.httpClient.delete(`${this.USER_URL + 'delete'}/${id}`);
  }

  getAllUserWithPagination(term: string ): Observable<any> {

    let terms = new HttpParams().set('term', term);
    return this.httpClient.get<User[]>(`${this.USER_URL + 'search'}`,{ params: terms } );
  }

}
