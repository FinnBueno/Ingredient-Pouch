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

export type RollType = 'strength' | 'dexterity' | 'constitution' | 'intelligence' | 'wisdom' | 'charisma';

export interface Recipe {
    id: string;
    name: string;
    url?: string;
    image?: any; // not sure how I'm going to handle banners for recipes yet
    triesTillMastered: number;
    timesSucceeded: number;
    dc: number;
    check: {
        strength: boolean;
        dexterity: boolean;
        constitution: boolean;
        intelligence: boolean;
        wisdom: boolean;
        charisma: boolean;
    };
    ingredients: Ingredient[];
    notes?: string;
}