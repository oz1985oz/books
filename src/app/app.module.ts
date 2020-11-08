import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// matrial
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';

// components
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { UserNameComponent } from './components/user-name/user-name.component';
import { BookSearchComponent } from './components/book-search/book-search.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { BooksComponent } from './components/books/books.component';
import { BookComponent } from './components/book/book.component';
import { BookDialogInfoComponent } from './components/book-dialog-info/book-dialog-info.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UserNameComponent,
    BookSearchComponent,
    NotFoundComponent,
    BooksComponent,
    BookComponent,
    BookDialogInfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatDialogModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
