import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConnectionService } from '../../../services/connection.service';
import * as uuid from 'uuid';
import { Router } from '@angular/router';
declare var UIkit: any;

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  addNewPostForm = new FormGroup({
    title: new FormControl('', Validators.required),
    subTitle: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    htmlPost: new FormControl('', Validators.required),
    date: new FormControl(new Date().toLocaleDateString()),
    id: new FormControl(uuid.v4())
  });

  constructor(private connectionService: ConnectionService, private router: Router) { }

  ngOnInit() {
  }



  addNewPost() {
    this.connectionService.addNewPost(this.addNewPostForm.value).subscribe((response) => {
      this.addNewPostForm.reset();
      if (response === "OK") {
        UIkit.notification({ message: '<span uk-icon=\'icon: check\'></span> Post został dodany!', status: 'success' })
        // this.router.navigate(['/blog'])
      }
    }, error => {
      UIkit.notification({ message: '<span uk-icon=\'icon: close\'></span> Wystąpił błąd. Spróbuj jeszcze raz.', status: 'danger' });
    });
  }

}
