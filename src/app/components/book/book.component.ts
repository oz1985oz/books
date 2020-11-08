import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Item } from 'src/app/models/booksResults';
import { BookDialogInfoComponent } from '../book-dialog-info/book-dialog-info.component';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent {

  @Input() book: Item;

  constructor(public dialog: MatDialog) {}

  moreInfo(): void {
    this.dialog.open(BookDialogInfoComponent, {
      maxWidth: '95%',
      minWidth: '60%',
      maxHeight: '88vh',
      data: this.book?.volumeInfo
    });
  }
}
