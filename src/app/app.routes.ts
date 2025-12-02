import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'tabs',
    canActivate: [authGuard],
    loadComponent: () => import('./tabs/tabs.page').then(m => m.TabsPage),
    children: [
      {
        path: 'incidentes',
        canActivate: [authGuard],
        loadComponent: () => import('./tab1/tab1.page').then(m => m.Tab1Page)
      },
      {
        path: 'nuevo',
        canActivate: [authGuard],
        loadComponent: () => import('./tab2/tab2.page').then(m => m.Tab2Page)
      },
      {
        path: 'ajustes',
        canActivate: [authGuard],
        loadComponent: () => import('./tab3/tab3.page').then(m => m.Tab3Page)
      },
      { path: '', redirectTo: 'incidentes', pathMatch: 'full' }
    ]
  },

  { path: 'login', loadComponent: () => import('./login/login.page').then(m => m.LoginPage) },

  { path: 'detalle/:id', canActivate: [authGuard], loadComponent: () => import('./detalle/detalle.page').then(m => m.DetallePage) },

  { path: '**', redirectTo: 'login' }
];
