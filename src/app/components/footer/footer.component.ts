import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  constructor(private menuComponent: MenuComponent) {}

  ngOnInit(): void {}

  scrollToTarget(target: string) {
    this.menuComponent.scrollToTarget(target);
  }
}
