import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule } from '@angular/common/http';

import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { CommentsDialogComponent } from './comments-dialog/comments-dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NewPostDialogComponent } from './new-post-dialog/new-post-dialog.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { EditPostDialogComponent } from './edit-post-dialog/edit-post-dialog.component';
import { NewCommentDialogComponent } from './new-comment-dialog/new-comment-dialog.component';
import { EditCommentDialogComponent } from './edit-comment-dialog/edit-comment-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { Globals } from './globals';

@NgModule({
  declarations: [
    AppComponent,
    CommentsDialogComponent,
    NewPostDialogComponent,
    EditPostDialogComponent,
    NewCommentDialogComponent,
    EditCommentDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatInputModule,
    FormsModule,
    MatSnackBarModule
  ],
  providers: [
    provideAnimationsAsync(),
    Globals
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
