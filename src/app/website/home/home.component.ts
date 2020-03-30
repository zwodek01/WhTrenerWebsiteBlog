import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MenuComponent } from '../../components/menu/menu.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private menuComponent: MenuComponent) {}

  ngOnInit(): void {}

  bmiForm = new FormGroup({
    weight: new FormControl('', [Validators.required]),
    height: new FormControl('', [Validators.required])
  });

  resultBmi: number;
  textBmi: string;

  scrollToTarget(target: string) {
    this.menuComponent.scrollToTarget(target);
  }

  calculateBmi() {
    const height = this.bmiForm.value.height;
    const weight = this.bmiForm.value.weight;
    this.resultBmi = weight / (((height / 100) * height) / 100);

    if (this.resultBmi < 16) {
      this.textBmi = 'Wygłodzenie';
    } else if (this.resultBmi > 16 && this.resultBmi < 16.99) {
      this.textBmi = 'Wychudzenie';
    } else if (this.resultBmi > 17 && this.resultBmi < 18.49) {
      this.textBmi = 'Niedowaga';
    } else if (this.resultBmi > 18.5 && this.resultBmi < 24.99) {
      this.textBmi = 'Wartość prawidłowa';
    } else if (this.resultBmi > 25 && this.resultBmi < 29.99) {
      this.textBmi = 'Nadwaga';
    } else if (this.resultBmi > 30 && this.resultBmi < 34.99) {
      this.textBmi = 'I stopień otyłości';
    } else if (this.resultBmi > 35 && this.resultBmi < 39.99) {
      this.textBmi = 'II stopień otyłości';
    } else {
      this.textBmi = 'Otyłość skrajna';
    }
    this.bmiForm.reset();
  }
}
