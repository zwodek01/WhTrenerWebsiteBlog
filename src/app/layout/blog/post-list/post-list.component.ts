import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() titlePost: string;
  @Input() authorPost: string;
  @Input() datePost: string;
  @Input() contentPost: string;
  @Input() categoryPost: string;
  @Input() photoPost: string;
}
