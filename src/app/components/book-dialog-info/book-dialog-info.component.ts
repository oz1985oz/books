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

  addToWishlist(): void {
    this.booksService.addToWishList(this.data);
  }

  deleteFromWishlist(): void {
    this.booksService.deleteFromWishlist(this.data);
  }

  existOnWishlist(): boolean {
    return this.booksService.existOnWishlist(this.data);
  }
}
