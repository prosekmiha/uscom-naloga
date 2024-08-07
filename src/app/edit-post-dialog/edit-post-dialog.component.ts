import { Component, EventEmitter, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Globals } from '../globals';

@Component({
  selector: 'app-edit-post-dialog',
  templateUrl: './edit-post-dialog.component.html',
  styleUrl: './edit-post-dialog.component.css'
})
export class EditPostDialogComponent {
  //Clicked post Id.
  postId: number;
  //All posts.
  posts: any;
  //Variable for changed post data.
  postEdit: any = {title: "", body: ""};
  //Post Id in posts array
  postEditId: number;

  onSubmit = new EventEmitter();

  //Variable for username data
  g:Globals;

  constructor( @Inject(MAT_DIALOG_DATA)public data: { postId: number, posts: any }, private _snackBar: MatSnackBar, public globals: Globals ) {
    this.postId = this.data.postId;
    this.posts = this.data.posts;
    this.g = globals;
  }

  ngOnInit() {
    //Find selected post to edit and assign to post edit variable.
    for (let i = 0; i < this.posts.length; i++) {
      if(this.posts[i].id == this.postId){
        this.postEdit.title = this.posts[i].title;
        this.postEdit.body = this.posts[i].body;
        this.postEditId = i;
      }
    }
    
  }

  editPost() {
    //Submit new post data to posts array.
    if(this.postEdit.title.length > 0 && this.postEdit.body.length > 0 && this.posts[this.postEditId].userId == this.g.usernameId)  {
      this.posts[this.postEditId].title = this.postEdit.title
      this.posts[this.postEditId].body = this.postEdit.body
      this.onSubmit.emit();
    } 
    //SnackBar if entry is empty.
    if(this.postEdit.title.length == 0 && this.postEdit.body.length == 0) {
      this.openSnackBar('Empty entry.');
    }
    //SnackBar if user is not author.
    if(this.posts[this.postEditId].userId != this.g.usernameId) {
      this.openSnackBar('You are not author.');
    }  
    
  }

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  openSnackBar(error: string) {
    this._snackBar.open(error, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000,
    });
  }
}
