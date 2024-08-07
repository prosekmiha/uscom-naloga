import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { MatDialog } from '@angular/material/dialog';
import { CommentsDialogComponent } from './comments-dialog/comments-dialog.component';
import { PageEvent } from '@angular/material/paginator';
import { NewPostDialogComponent } from './new-post-dialog/new-post-dialog.component';
import { EditPostDialogComponent } from './edit-post-dialog/edit-post-dialog.component';

import { Globals } from './globals';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  //All posts
  posts: any;
  
  //Displayed posts
  pageSlice: any;

  //Current oage variable for pagination
  currentPage: number = 0;


  constructor(private http: HttpClient, private dialogRef : MatDialog, public g: Globals) { 
    this.g;
  } 
    ngOnInit() {      
      //Data fetch
      this.dataFetch();           
    } 

    dataFetch() {
      this.http.get('https://dummyjson.com/posts').subscribe( 
        (result) => { 
          this.posts = result
          console.log(this.posts) 
          this.pageSlice = this.posts.posts.slice(0, 10)
        } 
      )
    }

    openCommentsDialog(postId: number) {
      //Open comments dialog and send id of clicked post.
      this.dialogRef.open(CommentsDialogComponent, {
        width: '600px',
        data: { postId: postId }
      });
    }

    openNewPostDialog(posts: any) {
      //Open new post dialog and send all posts data.
      const currentDialog = this.dialogRef.open(NewPostDialogComponent, {
        width: '600px',
        data: { defaultValue: posts.posts }
      });
      //Add new post to posts array.
      const subscribeDialog = currentDialog.componentInstance.onSubmit.subscribe((data) => {
        //this.posts.posts = [...this.posts.posts, data];
        this.posts.posts.unshift(data)
        this.pageSlice = this.posts.posts.slice(0, 10)
        currentDialog.close()
      });
      currentDialog.afterClosed().subscribe(result => {
        subscribeDialog.unsubscribe();
        });
      
    }

    openEditPostDialog(postId: number) {
      //Open post edit dialog and send all posts data and id of clicked post.
      const currentDialog = this.dialogRef.open(EditPostDialogComponent, {
        width: '600px',
        data: {
          posts: this.posts.posts,
          postId: postId
        }
      });
      //Close dialog after submit.
      const subscribeDialog = currentDialog.componentInstance.onSubmit.subscribe((data) => {
        currentDialog.close()
      });
      currentDialog.afterClosed().subscribe(result => {
        subscribeDialog.unsubscribe();
        });
    }

    //Function for pagination data.
    handlePageEvent(pageEvent: PageEvent) {
      const startIndex = pageEvent.pageIndex * pageEvent.pageSize;
      let endIndex = startIndex + pageEvent.pageSize;
      if (endIndex > this.posts.posts.length) {
        endIndex = this.posts.posts.length
      }
      this.pageSlice = this.posts.posts.slice(startIndex, endIndex)
      
    }
}
