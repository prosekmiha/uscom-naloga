import { Component, EventEmitter, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

import { Globals } from '../globals';

@Component({
  selector: 'app-new-post-dialog',
  templateUrl: './new-post-dialog.component.html',
  styleUrl: './new-post-dialog.component.css'
})
export class NewPostDialogComponent {
  //Empty string for new post.
  title: string = "";
  body: string = "";

  onSubmit = new EventEmitter();

  //Variable for username data
  g: Globals;

  constructor( @Inject(MAT_DIALOG_DATA)public data: any, private _snackBar: MatSnackBar, public globals: Globals ) {
    this.g = globals;
  }

  addNewPost() {
    //Submit object of new post data if entry is not empty. Else open SnackBar with error. 
    if( this.title.length > 0 && this.body.length > 0){
      const newPostData = { id: this.data.defaultValue.length + 1 , title: this.title, body: this.body, reactions: { likes: 0, dislikes: 0}, userId: this.g.usernameId };
      this.onSubmit.emit(newPostData);
    }
    else {
      this.openSnackBar()
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
