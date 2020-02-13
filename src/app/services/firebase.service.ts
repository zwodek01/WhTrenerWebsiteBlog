import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  user: Observable<firebase.User>;
  items: Observable<any[]>;

  constructor(public afAuth: AngularFireAuth, private db: AngularFirestore) {
    // this.afAuth.auth.signInAnonymously();
    // this.user = this.afAuth.authState;
    // this.items = db.collection('blog').valueChanges();
  }

  getPosts() {
    return this.db.collection('blog').valueChanges();
  }

  deletePost(link) {
    return this.db.collection('blog').doc(link).delete()
  }

  addNewPost(link, data) {
    return this.db.collection('blog').doc(link).set(data)
  }

  getOnePost(link) {
    return this.db.collection('blog').doc(link).valueChanges()
  }
}
