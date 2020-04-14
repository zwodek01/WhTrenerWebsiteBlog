import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { FormBuilder, Validators } from '@angular/forms';
import { UUID } from 'angular2-uuid';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private firebaseService: FirebaseService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.routeParam = this.route.snapshot.paramMap.get('id');
    this.getDetails(this.routeParam);
    this.getQuestions(this.routeParam);
  }

  routeParam = '';
  user;
  activeTab = 'Wykresy';
  questionsList;
  getDetailsDestroy;
  getQuestionsDestroy;
  questionaireForm = this.fb.group({
    question: [''],
  });

  getDetails(uid) {
    this.getDetailsDestroy = this.firebaseService.afs
      .collection('users')
      .doc(uid)
      .valueChanges()
      .subscribe((details) => {
        this.user = details;
      });
  }

  getQuestions(uid) {
    this.getQuestionsDestroy = this.firebaseService.afs
      .collection('users')
      .doc(uid)
      .collection('questions')
      .valueChanges()
      .subscribe((questions) => {
        this.questionsList = questions;
      });
  }

  changeTab($event) {
    this.activeTab = $event.target.id;
  }

  changeAccountStatus(status) {
    this.firebaseService.afs
      .collection('users')
      .doc(this.routeParam)
      .update({ premium: status });
  }

  statusAccount(): boolean {
    return this.user?.premium;
  }

  ngOnDestroy(): any {
    this.getDetailsDestroy.unsubscribe();
    this.getQuestionsDestroy.unsubscribe();
  }

  addQuestion() {
    const uuid = UUID.UUID();
    this.firebaseService
      .addQuestion(this.routeParam, uuid, {
        question: this.questionaireForm.value.question,
        answer: '',
        id: uuid,
      })
      .then(() => {
        this.questionaireForm.reset();
      });
  }

  deleteQuestion(id) {
    this.firebaseService.deleteQuestion(this.routeParam, id);
  }
}
