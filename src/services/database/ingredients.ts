import { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";
import _ from "lodash";
import { useAuth } from "../auth";
import { Ingredient } from "./types";

interface IngredientsManager {
    items: Ingredient[];
    createNewIngredients: (_: Ingredient[]) => Promise<Ingredient[]>; // Returns the updated ingredients
}

export const useIngredients = (): IngredientsManager => {
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const auth = useAuth();
    const userId = auth!.user!.uid;
    
    const ingredientsRef = firebase.database().ref(`users/${userId}/ingredients/`);
    const ingredientsImageRef = firebase.storage().ref(`${userId}/ingredientIcons/`);

    useEffect(() => {
        const listener = ingredientsRef.on('value', value => {
            setIngredients(Object.values(value.val() || {}));
        });
        return () => ingredientsRef.off('value', listener);
    }, []);

    const createNewIngredients = (ingredients: Ingredient[]): Promise<Ingredient[]> => {
        return new Promise(async (resolve, reject) => {
            // save all ingredients to db to generate IDs
            try {
                for (let i = 0; i < ingredients.length; i++) {
                    const ingredient = ingredients[i];
                    const pushedRow = await ingredientsRef.push(_.omit(ingredient, 'image'));
                    await ingredientsRef.child(`${pushedRow.key}/id`).set(pushedRow.key);
                    ingredients[i].id = pushedRow.key!;
                    // upload images
                    if (ingredient.image) {
                        const ref = ingredientsImageRef.child(pushedRow.key || '');
                        await ref.put(ingredient.image);
                        const downloadUrl = await ref.getDownloadURL();
                        await ingredientsRef.child(`${pushedRow.key}/url`).set(downloadUrl);
                        ingredients[i].url = downloadUrl;
                        ingredients[i].image = null;
                    }
                }
                resolve(ingredients);
            } catch (e) {
                reject(e);
            }
        });
    }

    return {
        createNewIngredients,
        items: ingredients,
    };
}
