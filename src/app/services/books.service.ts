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

  private renderWishlist = new BehaviorSubject<boolean>(null);
  renderWishlistStatus = this.renderWishlist.asObservable();

  wishlistKey = 'wishList';
  wishlist: BooksResults;
  wishlistMap = new Map();

  constructor(
    private http: HttpClient,
    private cacheService: CacheService,
  ) {
    this.setWishlistMap();
  }

  stopRender(): void {
    this.renderWishlist.next(null);
  }

  setWishlistMap(): void {
    this.wishlist = this.getBooksFromCache();
    if (this.wishlist) {
      this.wishlist.items?.map(itm => this.wishlistMap.set(itm.id, itm));
    }
  }

  wishlistCount(): number {
    return this.wishlistMap.size;
  }

  existOnWishlist(item: Item): boolean {
    return this.wishlistMap.has(item.id);
  }

  addWishList(item: Item): void {
    this.wishlistMap.set(item.id, item);
    this.wishlist = {} as BooksResults;
    this.wishlist.totalItems = this.wishlistMap.size;
    this.wishlist.items = [...this.wishlistMap.values()];
    this.cacheService.setEntry(this.wishlistKey, this.wishlist);
  }

  removeFromWishList(item: Item): void {
    this.wishlistMap.delete(item.id);
    this.wishlist = {} as BooksResults;
    this.wishlist.totalItems = this.wishlistMap.size;
    this.wishlist.items = [...this.wishlistMap.values()];
    this.cacheService.setEntry(this.wishlistKey, this.wishlist);
  }

  addToWishList(item: Item): void {
    if (!this.wishlistMap.size) {
      this.setWishlistMap();
    }
    this.addWishList(item);
    this.renderWishlist.next(true);
  }

  deleteFromWishlist(item: Item): void {
    if (!this.wishlistMap.size) {
      this.setWishlistMap();
    }
    this.removeFromWishList(item);
    this.renderWishlist.next(true);
  }

  getBooksFromCache(): BooksResults {
    if (this.wishlist) {
      return this.wishlist;
    } else if (this.cacheService.isExist(this.wishlistKey)) {
      this.wishlist = JSON.parse(this.cacheService.getOnEntry(this.wishlistKey));
      return this.wishlist;
    } else {
      return null;
    }
  }

  searchFromCache(word: string): Observable<BooksResults> {
    const copyBooks: BooksResults = JSON.parse(this.cacheService.getOnEntry(this.wishlistKey));
    if (copyBooks) {
      const filtered = copyBooks.items.filter(i => i.volumeInfo.title.toLowerCase().includes(word));
      copyBooks.items = filtered;
      return of(copyBooks);
    } else {
      return of({} as BooksResults);
    }
  }

  searchBooks(word: string, wishlist = false, startIndex: number = 0, maxResults: number = 20): Observable<BooksResults> {
    if (wishlist) {
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
