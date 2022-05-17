import { useEffect, useState } from "react";
import firebase from "firebase";
import { useAuth } from "../auth";

interface UserContent {
    ingredients: {
        list: Ingredient[];
        create: (_ingredient: Ingredient) => Promise<firebase.database.Reference>;
        remove: (_id: string) => Promise<Error | null>;
        increase: (_ingredient: Ingredient, _amount: number) => Promise<Error | null>;
        decrease: (_ingredient: Ingredient, _amount: number) => Promise<Error | null>;
    }
}

export interface Ingredient {
    id: string;
    name: string;
    url?: string;
    amount: number;
    type: 'food' | 'spice';
    notes?: string;
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

export const useContentManager = (): UserContent => {
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const auth = useAuth();
    const userId = auth!.user!.uid;
    
    const ingredientsRef = firebase.database().ref(`users/${userId}/ingredients/`);

    const createIngredient = (ingredient: Ingredient) => {
        return ingredientsRef
            .push(ingredient)
            .then(({ key }) => ingredientsRef.child(`${key}/id`).set(key));
    }

    const removeIngredient = (id: string) => {
        return ingredientsRef
            .child(id)
            .remove();
    }

    const changeIngredientAmount = (ingredient: Ingredient, amount: number) => {
        return ingredientsRef
            .child(`${ingredient.id}/amount`)
            .set(ingredient.amount + amount);
    }

    useEffect(() => {
        const handle = (snapshot: firebase.database.DataSnapshot) => {
            if (!snapshot.exists()) return;
            console.log(Object.values(snapshot.val().ingredients));
            setIngredients(Object.values(snapshot.val().ingredients || {}));
            setRecipes(Object.values(snapshot.val().recipes || {}));
            // setSettings(snapshot.val().settings || []);
        };
        const ref = firebase.database().ref(`users/${userId}`);
        ref.on('value', handle);
        return () => ref.off('value', handle);
    }, []);

    return {
        ingredients: {
            list: ingredients,
            create: createIngredient,
            remove: removeIngredient,
            increase: (ingredient: Ingredient, amount: number) => changeIngredientAmount(ingredient, amount),
            decrease: (ingredient: Ingredient, amount: number) => changeIngredientAmount(ingredient, -amount),
        }
    };
}
