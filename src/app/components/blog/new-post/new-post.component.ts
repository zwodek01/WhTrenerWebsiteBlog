import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FirebaseService } from '../../../services/firebase.service';
import { Router } from '@angular/router';
import { ToolbarService, LinkService, ImageService, HtmlEditorService, TableService, QuickToolbarService } from '@syncfusion/ej2-angular-richtexteditor';

declare var UIkit: any;

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss'],
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService, TableService, QuickToolbarService]
})
export class NewPostComponent implements OnInit {

  addNewPostForm = new FormGroup({
    title: new FormControl('', Validators.required),
    subTitle: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    htmlPost: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
    link: new FormControl('', Validators.required),
    date: new FormControl(new Date().toLocaleDateString()),
  });

  constructor(private firebaseService: FirebaseService, private router: Router) { }

  database: object;

  public tools: object = {
    items: ['Undo', 'Redo', '|',
      'Bold', 'Italic', 'Underline', 'StrikeThrough', '|',
      'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
      'SubScript', 'SuperScript', '|',
      'LowerCase', 'UpperCase', '|',
      'Formats', 'Alignments', '|', 'OrderedList', 'UnorderedList', '|',
      'Indent', 'Outdent', '|', 'CreateLink', 'CreateTable',
      'Image', '|', 'ClearFormat', 'Print', 'SourceCode', '|', 'FullScreen']
  };
  public quickTools: object = {
    image: [
      'Replace', 'Align', 'Caption', 'Remove', 'InsertLink', '-', 'Display', 'AltText', 'Dimension']
  };


  ngOnInit() {
    this.getPosts()
  }

  getPosts() {
    this.firebaseService.getPosts().subscribe((data) => {
      this.database = data
    })
  }

  addNewPost() {
    this.firebaseService.addNewPost(this.addNewPostForm.value.link, this.addNewPostForm.value).then(() => {
      UIkit.notification({ message: 'Post został dodany!', status: 'success' })
      setTimeout(() => {
        window.location.reload()
      }, 500)
    })
      .catch(() => {
        UIkit.notification({ message: 'Wystąpił błąd. Spróbuj jeszcze raz.', status: 'danger' });
      })
  }

  deletePost(idPost) {
    this.firebaseService.deletePost(idPost).then(() => {
      UIkit.notification({ message: 'Post został usunięty!', status: 'success' })
      setTimeout(() => {
        window.location.reload()
      }, 1500)
    })
      .catch(() => {
        UIkit.notification({ message: 'Wystąpił błąd. Spróbuj jeszcze raz.', status: 'danger' });
      })
  }

  setValuesToForm(titleForm, subTitleForm, categoryForm, htmlPostForm, linkForm, imageForm) {
    this.addNewPostForm.patchValue({
      title: titleForm,
      subTitle: subTitleForm,
      category: categoryForm,
      link: linkForm,
      htmlPost: htmlPostForm,
      image: imageForm
    });
    window.scrollTo(0, 0);
  }
}
