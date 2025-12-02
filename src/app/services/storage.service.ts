import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {

  async set(key: string, value: any): Promise<void> {
    localStorage.setItem(key, JSON.stringify(value));
  }

  async get(key: string): Promise<any> {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : null;
  }

  async remove(key: string): Promise<void> {
    localStorage.removeItem(key);
  }
}
