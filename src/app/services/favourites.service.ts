import { Injectable } from '@angular/core';
import { StorageInitService } from './storage-init.service';

export interface FavouriteRecipe {
  id: number;
  title: string;
  image: string;
}

@Injectable({ providedIn: 'root' })
export class FavouritesService {
  private key = 'favourites';

  constructor(private storageInit: StorageInitService) {}

  private async getList(): Promise<FavouriteRecipe[]> {
    const store = this.storageInit.store;
    return (await store.get(this.key)) ?? [];
  }

  private async saveList(list: FavouriteRecipe[]): Promise<void> {
    const store = this.storageInit.store;
    await store.set(this.key, list);
  }

  async getAll(): Promise<FavouriteRecipe[]> {
    return await this.getList();
  }

  async isFavourite(id: number): Promise<boolean> {
    const list = await this.getList();
    return list.some(r => r.id === id);
  }

  async add(recipe: FavouriteRecipe): Promise<void> {
    const list = await this.getList();
    if (!list.some(r => r.id === recipe.id)) {
      list.push(recipe);
      await this.saveList(list);
    }
  }

  async remove(id: number): Promise<void> {
    const list = await this.getList();
    await this.saveList(list.filter(r => r.id !== id));
  }
}
