import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  user: Observable<firebase.User>;
  items: Observable<any[]>;

  constructor(public afAuth: AngularFireAuth, private db: AngularFirestore) { }

  getPosts() {
    return this.db.collection('blog').valueChanges();
  }

  deletePost(link: string) {
    return this.db.collection('blog').doc(link).delete()
  }

  addNewPost(link: string, data: object) {
    return this.db.collection('blog').doc(link).set(data)
  }

  getOnePost(link: string) {
    return this.db.collection('blog').doc(link).valueChanges()
  }
}
