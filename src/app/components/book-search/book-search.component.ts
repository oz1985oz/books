import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Observable, of } from 'rxjs';
import { debounceTime, map, switchMap } from 'rxjs/operators';
import { BooksResults } from 'src/app/models/booksResults';
import { GoogleApiService } from 'src/app/services/google-api.service';

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit {

  searchControl = new FormControl();
  booksResults: BooksResults;

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
    this.googleApiService.serachBooks(val, this.calcStartIndex(pageEvent), pageEvent.pageSize).subscribe(res => this.booksResults = res);
  }

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(300), switchMap(val => this.googleApiService.serachBooks(val))).subscribe(res => this.booksResults = res);
  }

}
