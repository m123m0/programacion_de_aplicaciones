import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { provideHttpClient } from '@angular/common/http';
import { addIcons } from 'ionicons';
import { listOutline, addCircleOutline, settingsOutline } from 'ionicons/icons';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { provideStorage } from './app/providers/storage.provider';

// Registrar iconos
addIcons({
  'list-outline': listOutline,
  'add-circle-outline': addCircleOutline,
  'settings-outline': settingsOutline
});

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),

    provideHttpClient(),   // ← SOLUCIÓN AL ERROR NG0201
    provideStorage(),

    provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
});
