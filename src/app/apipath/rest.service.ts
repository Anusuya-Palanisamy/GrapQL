import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RestService {
  headers: HttpHeaders;
  //private apiUrl = '/api/';

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'content-type': 'application/json',
      Authorization: 'my-auth-Token',
    });
  }
 
  addImage(imageFile: any, id: number): Promise<any> {
    console.log('Service Entered' + imageFile);
    return this.http
      .post(`/api/image/add/${id}`, imageFile)
      .toPromise()
      .catch(this.handleError);
  }
  addLaptop(imageFile: any,Laptop: any): Promise<any> {
    console.log('Service Entered' + imageFile);
    return this.http
      .post('/api/laptop/upload', imageFile,Laptop)
      .toPromise()
      .catch(this.handleError);
  }

  getImage(id: number): Promise<any> {
    return this.http.get(`/api/get/${id}`).toPromise().catch(this.handleError);
  }

  handleError(handleError: any): Promise<object> {
    throw new Error('Method not implemented.');
  }
}
