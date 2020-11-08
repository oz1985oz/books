import { Component, Input, OnInit } from '@angular/core';
import { BooksResults, Item } from 'src/app/models/booksResults';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  @Input() books: BooksResults;

  constructor() { }

  ngOnInit(): void {
  }

}
