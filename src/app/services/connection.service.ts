import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  urlAddNewPost: string = 'http://localhost:3000/addNewPost';
  urlGetPosts: string = 'http://localhost:3000/getPosts';
  urlGetCategory: string = 'http://localhost:3000/getCategory';

  constructor(private http: HttpClient) { }

  addNewPost(messageContent: any) {
    return this.http.post(this.urlAddNewPost,
      JSON.stringify(messageContent),
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), responseType: 'text' });
  }

  getPosts() {
    return this.http.get(this.urlGetPosts, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), responseType: 'json' });
  }

  getCategory(messageContent) {
    return this.http.post(this.urlGetCategory,
      JSON.stringify(messageContent),
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), responseType: 'json' });
  }
}
