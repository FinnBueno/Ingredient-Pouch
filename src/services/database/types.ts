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

export interface Recipe {
    id: string;
    name: string;
    url?: string;
    triesTillMastered: number;
    timesSucceeded: number;
    timesFailed: number;
    dc: number;
    notes?: string;
}