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
  _cartMode: boolean;
  @Input() set cartMode(val: boolean) {
    if (val) {
      this.booksResults$ = this.booksService.searchBooks('', val);
      this._cartMode = val;
    }
  }

  private destroyed$ = new Subject<void>();

  pageEvent: PageEvent;
  searchControl = new FormControl();
  booksResults$: Observable<BooksResults>;
  dataLength: number;

  constructor(private booksService: BooksService) {
  }

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
    this.booksResults$ = this.booksService.searchBooks(val, this._cartMode, this.calcStartIndex(pageEvent), pageEvent.pageSize)
      .pipe(tap(x => this.dataLength = x.totalItems));
  }

  typingEvent(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(400),
      takeUntil(this.destroyed$)
    ).subscribe(text => {
      if (text || this._cartMode) {
        this.booksResults$ = this.booksService.searchBooks(text, this._cartMode, 0, this.pageEvent?.pageSize)
          .pipe(tap(x => {
            this.dataLength = x?.totalItems;
          }));
      }
    });
  }

  ngOnInit(): void {
    this.typingEvent();
    if (!this._cartMode) {
      this.searchControl.setValue('gay');
    }
    this.booksService.renderCartViewStatus.pipe(takeUntil(this.destroyed$)).subscribe(render => {
      if (render && this._cartMode) {
        this.booksResults$ = this.booksService.searchBooks('', this._cartMode);
        this.booksService.stopRender();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
