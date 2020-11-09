import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Observable, Subject } from 'rxjs';
import { debounceTime, takeUntil, tap } from 'rxjs/operators';
import { BooksResults } from 'src/app/models/booksResults';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit, OnDestroy {

  // tslint:disable-next-line: variable-name
  _wishlist: boolean;
  @Input() set wishlist(val: boolean) {
    this.booksResults = this.booksService.searchBooks('', val);
    this._wishlist = val;
  }
  private destroyed$ = new Subject<void>();

  pageEvent: PageEvent;
  searchControl = new FormControl();
  booksResults: Observable<BooksResults>;
  dataLength: number;

  constructor(private booksService: BooksService) { }

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
    this.booksResults = this.booksService.searchBooks(val, this._wishlist, this.calcStartIndex(pageEvent), pageEvent.pageSize)
      .pipe(tap(x => this.dataLength = x.totalItems));
  }

  typingEvent(): void {
    this.searchControl.valueChanges.pipe(debounceTime(400), takeUntil(this.destroyed$)).subscribe(text => {
      if (text || this._wishlist) {
        this.booksResults = this.booksService.searchBooks(text, this._wishlist, 0, this.pageEvent?.pageSize)
          .pipe(tap(x => this.dataLength = x.totalItems));
      }
    });
  }

  ngOnInit(): void {
    this.typingEvent();
    this.booksService.renderWishlistStatus.pipe(takeUntil(this.destroyed$)).subscribe(render => {
      if (render && this._wishlist) {
        this.booksResults = this.booksService.searchBooks('', this._wishlist);
        this.booksService.stopRender();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
