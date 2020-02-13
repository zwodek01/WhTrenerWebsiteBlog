import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  urlAddNewPost: string = 'https://evening-basin-89157.herokuapp.com/addNewPost';
  urlGetPosts: string = 'https://evening-basin-89157.herokuapp.com/getPosts';
  urlGetCategory: string = 'https://evening-basin-89157.herokuapp.com/getCategory';
  urlDeletePost: string = 'https://evening-basin-89157.herokuapp.com/deletePost';
  urlGetOnePost: string = 'https://evening-basin-89157.herokuapp.com/getOnePost';

  constructor(private http: HttpClient) { }

  addNewPost(messageContent: any) {
    return this.http.post(this.urlAddNewPost,
      JSON.stringify(messageContent),
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), responseType: 'text' });
  }

  deletePost(messageContent: any) {
    return this.http.post(this.urlDeletePost,
      JSON.stringify(messageContent),
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), responseType: 'text' });
  }

  getPosts() {
    return this.http.get(this.urlGetPosts,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), responseType: 'json' });
  }

  getCategory(messageContent) {
    return this.http.post(this.urlGetCategory,
      JSON.stringify(messageContent),
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), responseType: 'json' });
  }

  getOnePost(messageContent) {
    return this.http.post(this.urlGetOnePost,
      JSON.stringify(messageContent),
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), responseType: 'json' });
  }
}
