import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BooksResults } from '../models/booksResults';

@Injectable({
  providedIn: 'root'
})
export class GoogleApiService {

  constructor(private http: HttpClient) { }

  searchBooks(word: string, wishlist = false, startIndex: number = 0, maxResults: number = 20): Observable<BooksResults> {
    if (wishlist) {
      return of();
    } else {
      return this.http.get<BooksResults>(`${environment.searchUrl}${word}&startIndex=${startIndex}&maxResults=${maxResults}`);
    }
  }
}
