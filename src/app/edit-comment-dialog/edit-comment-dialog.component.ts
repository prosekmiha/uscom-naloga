import { Component, EventEmitter, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

import { Globals } from '../globals'

@Component({
  selector: 'app-edit-comment-dialog',
  templateUrl: './edit-comment-dialog.component.html',
  styleUrl: './edit-comment-dialog.component.css'
})
export class EditCommentDialogComponent {
  //Variable for the comments of the selected post.
  comments: any;
  //Selected comment Id.
  commentId: number;

  //Variable for changed comment data.
  commentEdit: any = { body: "" };
  //Comment Id in comment array
  commentEditId: number; 

  onSubmit = new EventEmitter();

  constructor( @Inject(MAT_DIALOG_DATA)public data: { commentId: number, comments: any }, private _snackBar: MatSnackBar, public g: Globals ) {
    this.g;
    this.comments = this.data.comments;
    this.commentId = this.data.commentId;
  }

  ngOnInit() {
    //Find selected comment to edit and assign to comment edit variable.
    for (let i = 0; i < this.comments.comments.length; i++) {
      if(this.comments.comments[i].id == this.commentId) {
        this.commentEdit.body = this.comments.comments[i].body;
        this.commentEditId = i;
        console.log(this.comments.comments[this.commentEditId])
      }
    }
    
    
  }

  editComment() {
    //Submit new comment data to comments array.
    if(this.commentEdit.body.length > 0 && this.comments.comments[this.commentEditId].user.id == this.g.usernameId) {
      this.comments.comments[this.commentEditId].body = this.commentEdit.body
      this.onSubmit.emit();
    }
    //SnackBar if entry is empty.
    if(this.commentEdit.body.length == 0) {
      this.openSnackBar('Empty entry.');
    }
    //SnackBar if user is not author.
    if(this.comments.comments[this.commentEditId].user.id != this.g.usernameId) {
      this.openSnackBar('You are not the author.');
    }
    
  }

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  openSnackBar(error: string) {
    this._snackBar.open(error, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000,
    });
  }
}
