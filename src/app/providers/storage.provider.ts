import { makeEnvironmentProviders } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

export function provideStorage() {
  return makeEnvironmentProviders([
    {
      provide: Storage,
      useFactory: () => {
        const storage = new Storage();
        storage.create();        // ← inicializar Storage
        return storage;
      }
    }
  ]);
}
