import { Injectable } from '@angular/core';
import { StorageInitService } from './storage-init.service';

export type Measurement = 'metric' | 'us';

@Injectable({ providedIn: 'root' })
export class SettingsService {
  private key = 'measurement';

  constructor(private storageInit: StorageInitService) {}

  //method to take the user's choice for measurement
  async getMeasurement(): Promise<Measurement> {
    const store = this.storageInit.store;
    const value = await store.get(this.key);
    return value === 'us' ? 'us' : 'metric'; // default metric
  }

  //method to remember the user's choice
  async setMeasurement(value: Measurement): Promise<void> {
    const store = this.storageInit.store;
    await store.set(this.key, value);
  }
}
