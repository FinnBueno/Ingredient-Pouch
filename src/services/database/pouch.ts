import { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/database";
import { useAuth } from "../auth";
import { Ingredient, PouchItem } from "./types";

interface PouchManager {
    currentDay: number;
    items: PouchItem[];
    addIngredientToPouch: (..._ingredients: Ingredient[]) => Promise<void>;
    setAmount: (_item: PouchItem, _amount: number) => Promise<any>;
    saveCurrentDay: (_day: number) => void;
}

export const usePouch = (onFinishLoadingCurrentDay?: (_i: number) => void): PouchManager => {
    const [pouchItems, setPouchItems] = useState<PouchItem[]>([]);
    const [currentDay, setCurrentDay] = useState<number>(0);
    const auth = useAuth();
    const userId = auth!.user!.uid;
    
    const pouchRef = firebase.database().ref(`users/${userId}/pouch/items`);

    useEffect(() => {
        const dayCounterRef = firebase.database().ref(`users/${userId}/pouch/currentDay`);
        const listener = dayCounterRef.on('value', value => {
            setCurrentDay(value.val() || 0);
            onFinishLoadingCurrentDay && onFinishLoadingCurrentDay(value.val() || 0);
        });
        return () => dayCounterRef.off('value', listener);
    }, []);

    useEffect(() => {
        const listener = pouchRef.on('value', value => {
            setPouchItems(Object.values(value.val() || {}));
        });
        return () => pouchRef.off('value', listener);
    }, []);

    const addIngredientToPouch = (...ingredients: Ingredient[]): Promise<void> => {
        return new Promise(async (resolve, _reject) => {
            for await (const ingredient of ingredients) {
                const { key } = await pouchRef.push({
                    ingredient,
                    receivedOn: currentDay,
                    amount: 1,
                });
                await pouchRef.child(`${key}/id`).set(key);
            }
            resolve();
        });
    }

    const setAmount = (item: PouchItem, amount: number): Promise<any> => {
        if (amount < 1) {
            return pouchRef.child(`${item.id}`).remove();
        }
        return pouchRef.child(`${item.id}/amount`).set(amount);
    }

    const saveCurrentDay = (day: number) => {
        firebase.database().ref(`users/${userId}/pouch/currentDay`).set(day);
    }

    return {
        addIngredientToPouch,
        setAmount,
        items: pouchItems,
        currentDay,
        saveCurrentDay
    };
}
