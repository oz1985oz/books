import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  versionKey = 'ver';
  today = new Date().toLocaleDateString();

  constructor() {
    this.initCache();
  }

  initCache(): void {
    if (this.isExist(this.versionKey)) {
      if (this.getOnEntry(this.versionKey) !== this.today) {
        this.clearAll();
        this.setEntry(this.versionKey, this.today);
      }
    } else {
      this.setEntry(this.versionKey, this.today);
    }
  }

  setEntry(key: string, value: any): void {
    localStorage.setItem(key, value);
  }

  getOnEntry(key: string): any {
    return localStorage.getItem(key);
  }

  isExist(key: string): boolean {
    return localStorage.hasOwnProperty(key);
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clearAll(): void {
    localStorage.clear();
  }
}
