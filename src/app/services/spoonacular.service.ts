import { Injectable } from '@angular/core';
import { CapacitorHttp } from '@capacitor/core';//for web requests

@Injectable({ providedIn: 'root' })
export class SpoonacularService {
  private apiKey = '70759a4f7911402abcc53d3c51d3b759';//API key
  private baseUrl = 'https://api.spoonacular.com';

  constructor() {}

  //method to search recipes by ingredient
  async searchRecipes(ingredients: string): Promise<any[]> {
    const url = //using the API search
      `${this.baseUrl}/recipes/complexSearch` +
      `?apiKey=${this.apiKey}` +
      `&query=${encodeURIComponent(ingredients)}`;

    const response = await CapacitorHttp.get({ url });//GETrequest to Spoonacular

   
    return response.data?.results ?? [];//returns an array of recipes
  }

  async getRecipeDetails(id: number): Promise<any> {//gets the recipe details 
    const url =
      `${this.baseUrl}/recipes/${id}/information` + //request for detailed info on a recipe
      `?apiKey=${this.apiKey}`;

    const response = await CapacitorHttp.get({ url }); //returns the recipe 

      return response.data;  //response.data is a JSON OBJECT 
  }
}

/**
 * References: 
 * 1. https://capacitorjs.com/docs/apis/http
 * 2. https://publicapi.dev/spoonacular-api
 */