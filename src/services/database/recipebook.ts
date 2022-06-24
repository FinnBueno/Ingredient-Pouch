import { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/database";
import { useAuth } from "../auth";
import { Recipe } from "./types";

interface RecipeBook {
    recipes: Recipe[];
    registerNewRecipe: (_recipe: Recipe) => Promise<Recipe>;
    increaseSuccesfullTries: (_recipe: Recipe) => Promise<void>;
    updateRecipe: (_recipe: Recipe) => Promise<void>;
}

export const useRecipeBook = (): RecipeBook => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const auth = useAuth();
    const userId = auth!.user!.uid;

    const recipesRef = firebase.database().ref(`users/${userId}/recipes`);
    const recipesImageRef = firebase.storage().ref(`${userId}/ingredientIcons/`);

    useEffect(() => {
        const listener = recipesRef.on('value', value => {
            setRecipes(Object.values(value.val() || {}));
        });
        return () => recipesRef.off('value', listener);
    }, []);

    const registerNewRecipe = (recipe: Recipe): Promise<Recipe> => {
        return new Promise<Recipe>(async (resolve, _reject) => {
            const { key } = await recipesRef.push(recipe);
            if (!key) return;
            await recipesRef.child(`${key}/id`).set(key);
            if (recipe.image) {
                const ref = recipesImageRef.child(key || '');
                await ref.put(recipe.image);
                const downloadUrl = await ref.getDownloadURL();
                await recipesRef.child(`${key}/url`).set(downloadUrl);
            }
            resolve((await recipesRef.child(key).get()).val());
        });
    }

    const increaseSuccesfullTries = (recipe: Recipe): Promise<void> => {
        return new Promise(async (resolve, _reject) => {
            await recipesRef.child(`${recipe.id}/timesSucceeded`).set(recipe.timesSucceeded + 1);
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
        increaseSuccesfullTries,
        updateRecipe: () => new Promise((resolve) => resolve()),
    };
}
