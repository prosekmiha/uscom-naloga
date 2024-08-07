import { Component, Inject, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Globals } from '../globals';

@Component({
  selector: 'app-new-comment-dialog',
  templateUrl: './new-comment-dialog.component.html',
  styleUrl: './new-comment-dialog.component.css'
})
export class NewCommentDialogComponent {
  //Empty string for new comment.
  comment: string = "";
  //All comments of selected post.
  comments: any;
  //Clicked post Id.
  postId: number;

  onSubmit = new EventEmitter();

  //Variable for username data
  g: Globals;

  constructor( @Inject(MAT_DIALOG_DATA)public data: { postId: number, comments: any }, private _snackBar: MatSnackBar, public globals: Globals ) {
    this.g = globals;
    this.postId = this.data.postId;
  }

  addNewComment() {
    //Submit object of new comment data if entry is not empty. Else open SnackBar with error.
    if (this.comment.length > 0) {
      const newCommentData = { id: 999, body: this.comment, likes: 0, postId: this.postId, user: { id: this.g.usernameId, username: this.g.username, fullName: this.g.fullname } };
      this.onSubmit.emit(newCommentData);
    } else {
      this.openSnackBar();
    }
    
  }

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  openSnackBar() {
    this._snackBar.open('Empty entry.', '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000,
    });
  }

}
