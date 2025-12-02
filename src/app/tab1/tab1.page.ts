import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { IonicModule, IonList, createAnimation } from '@ionic/angular';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';

import { ApiService } from '../services/api.service';
import { DataStoreService } from '../services/data-store.service';
import { Incidente } from '../services/incidentes';
import { IncidentesService } from '../services/incidentes';
import { Post } from '../models/post';

@Component({
  standalone: true,
  selector: 'app-tab1',
  imports: [IonicModule, CommonModule, DatePipe],
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss']
})
export class Tab1Page implements AfterViewInit {

  incidentes: Incidente[] = [];
  posts: Post[] = [];

  @ViewChild(IonList, { read: ElementRef }) listEl?: ElementRef;

  constructor(
    private srv: IncidentesService,
    private api: ApiService,
    private store: DataStoreService,
    private router: Router
  ) {
    this.srv.seedDemoIfEmpty();
    this.refresh();
    this.cargarPosts();
    console.log('>>> Tab1 constructor OK');
  }

  refresh() {
    this.incidentes = this.srv.all();
  }

  async cargarPosts() {
    this.api.getPosts().subscribe({
      next: async data => {
        this.posts = data;
        await this.store.savePosts(data);
      },
      error: async () => {
        const backup = await this.store.getPosts();
        this.posts = backup;
      }
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      const el = this.listEl?.nativeElement;
      if (!el) return;
      createAnimation()
        .addElement(el)
        .duration(300)
        .fromTo('opacity', '0', '1')
        .play();
    });
    console.log('>>> Tab1 ngAfterViewInit OK');
  }

  ver(id: string) {
    this.router.navigate(['/detalle', id]);
  }
}
