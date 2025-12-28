import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({ providedIn: 'root' })
export class StorageInitService {
  private _storage!: Storage;

  constructor(private storage: Storage) {}

  async init(): Promise<void> {
    this._storage = await this.storage.create();
  }

  get store(): Storage {
    return this._storage;
  }
}
