import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  checkOnceSignIn = true;
  userName: string;
  userKey = 'user';

  constructor(
    private cacheService: CacheService,
    private router: Router
  ) { }

  getUserName(): string {
    if (this.userName) {
      return this.userName;
    }
    if (this.cacheService.isExist(this.userKey)) {
      this.userName = this.cacheService.getOnEntry(this.userKey);
      return this.userName;
    }
  }

  isSignIn(): boolean {
    if (this.userName || this.cacheService.isExist(this.userKey)) {
      this.checkOnceSignIn = true;
      return true;
    }
    if (this.checkOnceSignIn) {
      this.checkOnceSignIn = false;
      this.signout();
    }
  }

  signout(): void {
    this.userName = null;
    this.cacheService.clearAll();
    this.router.navigate(['sign-in']);
  }

  signIn(userName: string): void {
    this.userName = userName;
    this.cacheService.setEntry(this.userKey, userName);
    this.router.navigate(['books-search']);
  }
}
