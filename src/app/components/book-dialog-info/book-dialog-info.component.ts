import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VolumeInfo } from 'src/app/models/booksResults';

@Component({
  selector: 'app-book-dialog-info',
  templateUrl: './book-dialog-info.component.html',
  styleUrls: ['./book-dialog-info.component.scss']
})
export class BookDialogInfoComponent {

  constructor(
    public dialogRef: MatDialogRef<BookDialogInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: VolumeInfo
  ) {
  }
}
