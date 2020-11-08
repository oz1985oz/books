import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Observable, Subject } from 'rxjs';
import { debounceTime, takeUntil, tap } from 'rxjs/operators';
import { BooksResults } from 'src/app/models/booksResults';
import { GoogleApiService } from 'src/app/services/google-api.service';

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit, OnDestroy {

  @Input() fromCache: boolean;
  private destroyed$ = new Subject<void>();

  pageEvent: PageEvent;
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
    this.pageEvent = pageEvent;
    const val = this.searchControl.value;
    this.booksResults = this.googleApiService.searchBooks(val, this.fromCache, this.calcStartIndex(pageEvent), pageEvent.pageSize)
      .pipe(tap(x => this.dataLength = x.totalItems));
  }

  typingEvent(): void {
    this.searchControl.valueChanges.pipe(debounceTime(400), takeUntil(this.destroyed$)).subscribe(text => {
      if (text) {
        this.booksResults = this.googleApiService.searchBooks(text, this.fromCache, 0, this.pageEvent?.pageSize)
          .pipe(tap(x => this.dataLength = x.totalItems));
      }
    });
  }

  ngOnInit(): void {
    this.typingEvent();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
