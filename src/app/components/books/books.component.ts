import { Component, Input } from '@angular/core';
import { BooksResults } from 'src/app/models/booksResults';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent {

  @Input() books: BooksResults;

}
