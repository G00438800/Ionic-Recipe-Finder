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

  //method to load the favourites list from storage
  private async getList(): Promise<FavouriteRecipe[]> {
    const store = this.storageInit.store;
    return (await store.get(this.key)) ?? [];
  }

  //method to save udated list
  private async saveList(list: FavouriteRecipe[]): Promise<void> {
    const store = this.storageInit.store;
    await store.set(this.key, list);
  }

  //method to return full list of favourites
  async getAll(): Promise<FavouriteRecipe[]> {
    return await this.getList();
  }

  //method to check if recipe already exists in favourite list
  async isFavourite(id: number): Promise<boolean> {
    const list = await this.getList();
    return list.some(r => r.id === id);
  }

  //method to add recipe to favourites, avcoiding duplicates
  async add(recipe: FavouriteRecipe): Promise<void> {
    const list = await this.getList();
    if (!list.some(r => r.id === recipe.id)) {
      list.push(recipe);
      await this.saveList(list);
    }
  }

  //method to remove favourites by ID
  async remove(id: number): Promise<void> {
    const list = await this.getList();
    await this.saveList(list.filter(r => r.id !== id));
  }
}


/**
 * References:
 * 1. https://github.com/ionic-team/ionic-storage
 * 2. https://angular.dev/api/core/Injectable
 */