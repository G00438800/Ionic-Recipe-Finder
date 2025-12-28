import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { SpoonacularService } from '../../services/spoonacular.service';
import { SettingsService, Measurement } from '../../services/settings.service';

import { FavouritesService } from '../../services/favourites.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.page.html',
  styleUrls: ['./recipe-details.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class RecipeDetailsPage {
  recipeId!: number;

  loading = true;
  recipe: any = null;

  measurement: Measurement = 'metric'; // default until loaded
  steps: { number: number; step: string }[] = [];

  isFav = false;
  favButtonText = 'Add to Favourites';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: SpoonacularService,
    private settings: SettingsService,
    private favs: FavouritesService
  ) {}

  async ionViewWillEnter() {
    this.loading = true;

    // 1) get the id from URL
    this.recipeId = Number(this.route.snapshot.paramMap.get('id'));

    // 2) load measurement setting
    this.measurement = await this.settings.getMeasurement();

    // 3) load recipe details from API
    try {
      this.recipe = await this.api.getRecipeDetails(this.recipeId);
      this.isFav = await this.favs.isFavourite(this.recipe.id);
      this.favButtonText = this.isFav ? 'Remove From Favourites' : 'Add to Favourites';


      // flatten instructions safely (JSON arrays inside arrays)
      const blocks = this.recipe?.analyzedInstructions ?? [];
      this.steps = blocks.flatMap((b: any) => b?.steps ?? []);
    } catch (err) {
      console.error('Failed to load recipe details', err);
      this.recipe = null;
      this.steps = [];
    } finally {
      this.loading = false;
    }
  }

  back() {
    this.router.navigateByUrl('/home');
  }

  // Helper to display amount + unit based on measurement selected
  getAmountUnit(ing: any): string {
    if (!ing?.measures) return '';
    const m = this.measurement === 'us' ? ing.measures.us : ing.measures.metric;
    const amount = m?.amount ?? '';
    const unit = m?.unitLong ?? '';
    return `${amount} ${unit}`.trim();
  }

  // This button will be fully wired in Step 8
  async toggleFavourite() {
  if (!this.recipe) return;

  if (this.isFav) {
    await this.favs.remove(this.recipe.id);
    this.isFav = false;
    this.favButtonText = 'Add to Favourites';
  } else {
    await this.favs.add({
      id: this.recipe.id,
      title: this.recipe.title,
      image: this.recipe.image,
    });
    this.isFav = true;
    this.favButtonText = 'Remove From Favourites';
  }
}

}
