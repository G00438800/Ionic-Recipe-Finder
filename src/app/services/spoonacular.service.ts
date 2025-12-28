import { Injectable } from '@angular/core';
import { CapacitorHttp } from '@capacitor/core';

@Injectable({ providedIn: 'root' })
export class SpoonacularService {
  private apiKey = '70759a4f7911402abcc53d3c51d3b759';
  private baseUrl = 'https://api.spoonacular.com';

  constructor() {}

  //Search recipes by ingredients (Home Page)
  async searchRecipes(ingredients: string): Promise<any[]> {
    const url =
      `${this.baseUrl}/recipes/complexSearch` +
      `?apiKey=${this.apiKey}` +
      `&query=${encodeURIComponent(ingredients)}`;

    const response = await CapacitorHttp.get({ url });

    //response.data is a JSON OBJECT
    //response.data.results is a JSON ARRAY
    return response.data?.results ?? [];
  }

  //Get full recipe details (Recipe Details Page)
  async getRecipeDetails(id: number): Promise<any> {
    const url =
      `${this.baseUrl}/recipes/${id}/information` +
      `?apiKey=${this.apiKey}`;

    const response = await CapacitorHttp.get({ url });

    //response.data is a JSON OBJECT (recipe)
    return response.data;
  }
}
