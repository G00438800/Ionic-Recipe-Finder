import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({ providedIn: 'root' })//for storage in the app
export class StorageInitService {
  private _storage!: Storage;

  constructor(private storage: Storage) {}//allowing access to the storage

  async init(): Promise<void> {//initialise the storage
    this._storage = await this.storage.create();
  }

  get store(): Storage {//letting services use the storage
    return this._storage;
  }
}

/** 
 * References:
 * 1. https://github.com/ionic-team/ionic-storage
 * 
 */