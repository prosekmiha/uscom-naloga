import { Component, Inject, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { NewCommentDialogComponent } from '../new-comment-dialog/new-comment-dialog.component';
import { EditCommentDialogComponent } from '../edit-comment-dialog/edit-comment-dialog.component';
import { Globals } from '../globals';



@Component({
  selector: 'app-comments-dialog',
  templateUrl: './comments-dialog.component.html',
  styleUrl: './comments-dialog.component.css'
})
export class CommentsDialogComponent {
  //Clicked post Id.
  postId: number;
  //Variable for the comments of the selected post.
  comments: any;

  constructor(
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA)
    public data: { postId: number }, 
    private dialogRef : MatDialog,
    public g: Globals
  ) {
    this.postId = this.data.postId;
    this.g;
  }

  ngOnInit() {
    //Comments fetch.
      this.http.get(`https://dummyjson.com/comments/post/${this.postId}`).subscribe( 
        (result) => { 
            this.comments = result 
            console.log(this.comments)
        } 
    )
    
  }

  openNewCommentDialog(postId: number) {
    //Open new comment dialog and send all comment data and Id of selected post to dialog.
    const currentDialog = this.dialogRef.open(NewCommentDialogComponent, {
      width: '500px',
      data: { postId: postId, comments: this.comments }
     
    });
    //Add new comment to comments array.
    const subscribeDialog = currentDialog.componentInstance.onSubmit.subscribe((data) => {
      this.comments.comments = [...this.comments.comments, data];
      currentDialog.close()
    });
    currentDialog.afterClosed().subscribe(result => {
      subscribeDialog.unsubscribe();

      });
  }

  openEditComment(commentId: number) {
    //Open comment edit dialog and send all comments data and id of selected comment..
    const currentDialog = this.dialogRef.open(EditCommentDialogComponent, {
      width: '500px',
      data: { commentId: commentId, comments: this.comments }
    });
    const subscribeDialog = currentDialog.componentInstance.onSubmit.subscribe((data) => {
      currentDialog.close()
    });



  }
}
