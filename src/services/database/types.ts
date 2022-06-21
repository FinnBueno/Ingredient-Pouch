export interface Ingredient {
    id: string;
    name: string;
    url?: string;
    image?: any; // raw image data
    type: 'base' | 'tastemaker';
    infinite: boolean;
    notes?: string;
    lasts?: number;
}

export interface PouchItem {
    id: string;
    amount: number;
    ingredient: Ingredient;
    receivedOn: number;
}

type RollType = 'Strength' | 'Dexterity' | 'Constitution' | 'Intelligence' | 'Wisdom' | 'Charisma';

type IngredientRef = Pick<Ingredient, 'id' | 'name'>;

export interface Recipe {
    id: string;
    name: string;
    url?: string;
    image?: any; // not sure how I'm going to handle banners for recipes yet
    triesTillMastered: number;
    timesSucceeded: number;
    dc: number;
    rolls: RollType[];
    ingredients: IngredientRef[];
    notes?: string;
    // TODO: Add an ingredients[] field, should probably be references so that the app automatically subtracts required ingredients
}