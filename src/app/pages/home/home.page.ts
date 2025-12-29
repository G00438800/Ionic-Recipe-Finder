import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { heart, settings } from 'ionicons/icons';

import { SpoonacularService } from '../../services/spoonacular.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class HomePage {
  studentNumber = 'G00438800'; 
  ingredients = '';
  results: any[] = [];
  loading = false;
  errorMessage = '';
  heartIcon = heart;
  settingsIcon = settings;

  constructor(private spoonacular: SpoonacularService, private router: Router) {}

  goToHome() {
  this.router.navigateByUrl('/home');
}

  goToSettings() {
    this.router.navigateByUrl('/settings');
  }

  goToFavourites() {
    this.router.navigateByUrl('/favourites');
  }

  openDetails(recipeId: number) {
    this.router.navigate(['/recipe-details', recipeId]);
  }

  async search() {
    this.errorMessage = '';
    const query = this.ingredients.trim();

    if (!query) {
      this.results = [];
      this.errorMessage = 'Please enter at least one ingredient.';
      return;
    }

    this.loading = true;
    this.results = [];

    try {
      // returns JSON ARRAY of recipes
      this.results = await this.spoonacular.searchRecipes(query);
    } catch (err) {
      console.error(err);
      this.errorMessage = 'Could not load recipes. Please try again.';
    } finally {
      this.loading = false;
    }
  }
}
