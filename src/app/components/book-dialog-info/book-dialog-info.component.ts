import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Item } from 'src/app/models/booksResults';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-book-dialog-info',
  templateUrl: './book-dialog-info.component.html',
  styleUrls: ['./book-dialog-info.component.scss']
})
export class BookDialogInfoComponent {

  constructor(
    private booksService: BooksService,
    public dialogRef: MatDialogRef<BookDialogInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Item
  ) { }

  addToCart(): void {
    this.booksService.addToCart(this.data);
  }

  deleteFromCart(): void {
    this.booksService.deleteFromCart(this.data);
  }

  existOnCart(): boolean {
    return this.booksService.existOnCart(this.data);
  }
}
