import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Observable, of } from 'rxjs';
import { debounceTime, map, switchMap, tap } from 'rxjs/operators';
import { BooksResults } from 'src/app/models/booksResults';
import { GoogleApiService } from 'src/app/services/google-api.service';

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit {

  searchControl = new FormControl();
  booksResults: Observable<BooksResults>;
  dataLength: number;

  constructor(private googleApiService: GoogleApiService) { }

  calcStartIndex(pageEvent: PageEvent): number {
    if (pageEvent?.pageSize) {
      return pageEvent?.pageIndex * pageEvent?.pageSize;
    } else {
      return 0;
    }
  }

  pageChange(pageEvent: PageEvent): void {
    const val = this.searchControl.value;
    this.booksResults = this.googleApiService.serachBooks(val, this.calcStartIndex(pageEvent), pageEvent.pageSize)
      .pipe(tap(x => this.dataLength = x.totalItems));
  }

  typingEvent(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(300), switchMap(val => this.googleApiService.serachBooks(val)))
      .pipe(tap(x => this.dataLength = x.totalItems));
  }

  ngOnInit(): void {
    this.typingEvent();
  }

}
