import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private File_URL =  environment.apiUrl + '/api/file/';
  constructor(private httpClient: HttpClient) { }

  upLoadFile(formData: FormData):Observable<any>{
    return this.httpClient.post<any>(this.File_URL + 'upload', formData);
  }
}
