import { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/database";
import { useAuth } from "../auth";
import { Recipe } from "./types";

interface RecipeBook {
    recipes: Recipe[];
    registerNewRecipe: (_recipe: Recipe) => Promise<void>;
    increaseSuccesfullTries: (_recipe: Recipe) => Promise<void>;
    updateRecipe: (_recipe: Recipe) => Promise<void>;
}

export const useRecipeBook = (): RecipeBook => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const auth = useAuth();
    const userId = auth!.user!.uid;

    const recipesRef = firebase.database().ref(`users/${userId}/recipes`);

    useEffect(() => {
        const listener = recipesRef.on('value', value => {
            setRecipes(Object.values(value.val() || {}));
        });
        return () => recipesRef.off('value', listener);
    }, []);

    const registerNewRecipe = (recipe: Recipe): Promise<void> => {
        return new Promise(async (resolve, _reject) => {
            const { key } = await recipesRef.push(recipe);
            await recipesRef.child(`${key}/id`).set(key);
            resolve();
        });
    }

    // const setAmount = (item: PouchItem, amount: number): Promise<any> => {
    //     if (amount < 1) {
    //         return recipesRef.child(`${item.id}`).remove();
    //     }
    //     return recipesRef.child(`${item.id}/amount`).set(amount);
    // }

    // const saveCurrentDay = (day: number) => {
    //     firebase.database().ref(`users/${userId}/pouch/currentDay`).set(day);
    // }

    return {
        recipes,
        registerNewRecipe,
        increaseSuccesfullTries: () => new Promise((resolve) => resolve()),
        updateRecipe: () => new Promise((resolve) => resolve()),
    };
}
