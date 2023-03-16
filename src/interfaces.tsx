export interface Ingredient {
  id: string;
  percent: number;
  percent_estimate: number;
  rank: number;
  text: string;
}

export interface ProductIngredients {
  productIngredients: Ingredient[]
}
