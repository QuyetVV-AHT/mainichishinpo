import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Post, PostRequest } from '../entity/Post';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private PUBLIC_URL = environment.apiUrl +'/api/posts/';

  constructor(private httpClient: HttpClient) { }
  getListPosts(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(`${this.PUBLIC_URL  + 'list'}`);
  }
  getAllPostsWithPagination(term: string ): Observable<any> {

    let terms = new HttpParams().set('term', term);
    return this.httpClient.get<Post[]>(`${this.PUBLIC_URL + 'search'}`,{ params: terms } );
  }

  addPost(post: PostRequest): Observable<any>{
    return this.httpClient.post<Post>(`${this.PUBLIC_URL + 'create'}`, post);
  }

  getPostById(id: number): Observable<Post>{
    return this.httpClient.get<Post>(`${this.PUBLIC_URL}${id}`);
  }

  updatePost(id: number, post: PostRequest):Observable<object>{
    return this.httpClient.put(`${this.PUBLIC_URL + 'update'}/${id}`, post);
  }

  deletePostbyId(id: number): Observable<object> {
    return this.httpClient.delete(`${this.PUBLIC_URL + 'delete'}/${id}`);
  }

  activePost(id: number, isActive: any):Observable<any>{
    return this.httpClient.post<any>(`${this.PUBLIC_URL + 'active'}/${id}`, isActive);
  }
}
