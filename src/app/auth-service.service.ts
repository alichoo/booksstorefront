import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';


const apiUrl = 'http://localhost/PHP-Slim-Restful/api/';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor (public http: HttpClient) {
    console.log('Hello AuthService Provider');
  }
  postDate(credentials, type) {
    return new Promise ((resolve, reject) => {
      const headers = new HttpHeaders();
      this.http.put(apiUrl + type, JSON.stringify(credentials)).
      subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }
}
