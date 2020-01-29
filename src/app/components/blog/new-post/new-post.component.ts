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
    link: new FormControl('', Validators.required),
    date: new FormControl(new Date().toLocaleDateString()),
  });

  constructor(private connectionService: ConnectionService, private router: Router) { }

  database;

  ngOnInit() {
    this.getPosts()
  }

  getPosts() {
    this.connectionService.getPosts().subscribe((data) => {
      this.database = data
    })
  }

  addNewPost() {
    this.connectionService.addNewPost(this.addNewPostForm.value).subscribe((response) => {
      if (response === "OK") {
        this.addNewPostForm.reset();
        UIkit.notification({ message: '<span uk-icon=\'icon: check\'></span> Post został dodany!', status: 'success' })
        setTimeout(() => {
          window.location.reload()
        }, 500)
      }
    }, error => {
      UIkit.notification({ message: '<span uk-icon=\'icon: close\'></span> Wystąpił błąd. Spróbuj jeszcze raz.', status: 'danger' });
    });
  }

  deletePost(idPost) {
    this.connectionService.deletePost({ link: idPost }).subscribe((response) => {
      console.log(response)
      if (response === "OK") {
        UIkit.notification({ message: '<span uk-icon=\'icon: check\'></span> Post został usunięty!', status: 'success' })
        setTimeout(() => {
          window.location.reload()
        }, 1500)
      }
    }, error => {
      UIkit.notification({ message: '<span uk-icon=\'icon: close\'></span> Wystąpił błąd. Spróbuj jeszcze raz.', status: 'danger' });
    })
  }

  setValuesToForm(titleForm, subTitleForm, categoryForm, htmlPostForm) {
    this.addNewPostForm.patchValue({
      title: titleForm,
      subTitle: subTitleForm,
      category: categoryForm,
      htmlPost: htmlPostForm
    });
    window.scrollTo(0, 0);
  }


}
