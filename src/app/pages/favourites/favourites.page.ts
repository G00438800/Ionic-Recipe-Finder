import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { FavouritesService, FavouriteRecipe } from '../../services/favourites.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class FavouritesPage {
  favourites: FavouriteRecipe[] = [];
  loading = true;

  constructor(private favs: FavouritesService, private router: Router) {}

  async ionViewWillEnter() {
    this.loading = true;
    this.favourites = await this.favs.getAll();
    this.loading = false;
  }

  back() {
    this.router.navigateByUrl('/home');
  }

  openDetails(id: number) {
    this.router.navigate(['/recipe-details', id]);
  }
}
