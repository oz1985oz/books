import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BooksResults, Item } from '../models/booksResults';
import { CacheService } from './cache.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private renderCartView = new BehaviorSubject<boolean>(null);
  renderCartViewStatus = this.renderCartView.asObservable();

  cartKey = 'cartList';
  booksResultsCart: BooksResults;
  cartMap = new Map();

  constructor(
    private http: HttpClient,
    private cacheService: CacheService,
  ) {
    this.setCartMap();
  }

  stopRender(): void {
    this.renderCartView.next(null);
  }

  setCartMap(): void {
    this.booksResultsCart = this.getBooksFromCache();
    if (this.booksResultsCart) {
      this.booksResultsCart.items?.map(itm => this.cartMap.set(itm.id, itm));
    }
  }

  cartCount(): number {
    return this.cartMap.size;
  }

  existOnCart(item: Item): boolean {
    return this.cartMap.has(item.id);
  }

  addCart(item: Item): void {
    this.cartMap.set(item.id, item);
    this.booksResultsCart = {} as BooksResults;
    this.booksResultsCart.totalItems = this.cartMap.size;
    this.booksResultsCart.items = [...this.cartMap.values()];
    this.cacheService.setEntry(this.cartKey, this.booksResultsCart);
  }

  removeFromCart(item: Item): void {
    this.cartMap.delete(item.id);
    this.booksResultsCart = {} as BooksResults;
    this.booksResultsCart.totalItems = this.cartMap.size;
    this.booksResultsCart.items = [...this.cartMap.values()];
    this.cacheService.setEntry(this.cartKey, this.booksResultsCart);
  }

  addToCart(item: Item): void {
    if (!this.cartMap.size) {
      this.setCartMap();
    }
    this.addCart(item);
    this.renderCartView.next(true);
  }

  deleteFromCart(item: Item): void {
    if (!this.cartMap.size) {
      this.setCartMap();
    }
    this.removeFromCart(item);
    this.renderCartView.next(true);
  }

  getBooksFromCache(): BooksResults {
    if (this.booksResultsCart) {
      return this.booksResultsCart;
    } else if (this.cacheService.isExist(this.cartKey)) {
      this.booksResultsCart = JSON.parse(this.cacheService.getOnEntry(this.cartKey));
      return this.booksResultsCart;
    } else {
      return null;
    }
  }

  searchFromCache(word: string): Observable<BooksResults> {
    const copyBooks: BooksResults = JSON.parse(this.cacheService.getOnEntry(this.cartKey));
    if (copyBooks) {
      const filtered = copyBooks.items.filter(i => i.volumeInfo.title.toLowerCase().includes(word));
      copyBooks.items = filtered;
      return of(copyBooks);
    } else {
      return of({} as BooksResults);
    }
  }

  searchBooks(word: string, cartMode = false, startIndex: number = 0, maxResults: number = 25): Observable<BooksResults> {
    if (cartMode) {
      if (word) {
        return this.searchFromCache(word);
      } else {
        return of(this.getBooksFromCache());
      }
    } else {
      return this.http.get<BooksResults>(`${environment.searchUrl}${word}&startIndex=${startIndex}&maxResults=${maxResults}`)
        .pipe(map(x => new BooksResults(x)));
    }
  }
}
