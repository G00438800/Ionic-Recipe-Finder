import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { SpoonacularService } from '../services/spoonacular.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage {
  constructor(private spoonacular: SpoonacularService) {}

  ionViewWillEnter() {
    console.log('Home page loaded');
    this.testApi();
  }

  async testApi() {
    const results = await this.spoonacular.searchRecipes('chicken');
    console.log('API results:', results);
  }
}
