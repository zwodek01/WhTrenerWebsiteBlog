import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  constructor(
    private router: Router,
    private viewportScroller: ViewportScroller
  ) {}

  ngOnInit(): void {}

  public scrollToTarget(target: string) {
    this.router.navigate(['/']).then(() => {
      setTimeout(() => {
        this.viewportScroller.scrollToAnchor(target);
      }, 100);
    });
  }
}
