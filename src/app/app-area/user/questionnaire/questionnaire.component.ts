import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss'],
})
export class QuestionnaireComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit(): void {
    this.getQuestions(this.uid);
  }

  questionaireForm = this.fb.group({
    answer: [''],
  });
  uid = JSON.parse(sessionStorage.getItem('userDetails')).uid;
  questionsList;
  getQuestionsDestroy;
  currentQuestion = null;

  addAnswer() {
    this.firebaseService
      .updateAnswer(
        this.uid,
        this.currentQuestion?.id,
        this.questionaireForm.value.answer,
        true
      )
      .then(() => {
        this.questionaireForm.reset();
        this.currentQuestion = null;
      });
  }

  deleteAnswer(question) {
    this.firebaseService
      .updateAnswer(this.uid, question?.id, '', false)
      .then(() => {
        this.questionaireForm.reset();
        this.currentQuestion = null;
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

  getQuestion(question) {
    this.currentQuestion = question;
    this.questionaireForm.setValue({ answer: question.answer });
  }

  ngOnDestroy(): any {
    this.getQuestionsDestroy.unsubscribe();
  }
}
