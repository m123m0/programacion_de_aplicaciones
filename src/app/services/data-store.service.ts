import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Post } from '../models/post';

@Injectable({ providedIn: 'root' })
export class DataStoreService {

  private KEY = 'posts';

  constructor(private storage: StorageService) {}

  async savePosts(posts: Post[]): Promise<void> {
    await this.storage.set(this.KEY, posts);
  }

  async getPosts(): Promise<Post[]> {
    return await this.storage.get(this.KEY) ?? [];
  }
}
