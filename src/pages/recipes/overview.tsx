import { Divider } from '@mui/material';
import _ from 'lodash';
import React, { useState } from 'react';
import { FaMedal, FaMinus, FaPlus } from 'react-icons/fa';
import { trackPromise } from 'react-promise-tracker';
import { Flex, Heading, Text } from 'rebass';
import { MButton, ProgressButton } from 'src/atoms';
import { Tag } from 'src/atoms/tag';
import { usePouch } from 'src/services/database/pouch';
import { useRecipeBook } from 'src/services/database/recipebook';
import { Ingredient, Recipe, RollType } from 'src/services/database/types';

export const RecipeOverview: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
    const hasMastered = recipe.timesSucceeded >= recipe.triesTillMastered;
    const recipeBook = useRecipeBook();
    const [prepareCount, setPrepareCount] = useState(1);

    const pouch = usePouch();

    const calculateMaxPortions = () => {
        const requiredIngredientsByID: { [key: string]: Ingredient } = {};
        recipe.ingredients.forEach(i => requiredIngredientsByID[i.id] = i);
        console.log(requiredIngredientsByID);
        let maxPortionAmount = Number.MAX_SAFE_INTEGER;
        let amountRequiredIngredientsFoundInPouch = 0;
        pouch.items.forEach(item => {
            const id = item.ingredient.id;
            const ingredientRequiredForRecipe = !!requiredIngredientsByID[id];
            if (!ingredientRequiredForRecipe) return;
            if (maxPortionAmount > item.amount) {
                maxPortionAmount = item.amount;
                amountRequiredIngredientsFoundInPouch++;
            }
        });
        if (amountRequiredIngredientsFoundInPouch < recipe.ingredients.length) {
            maxPortionAmount = 0;
        }
        return maxPortionAmount;
    }

    const maxPortions = calculateMaxPortions();

    return (
        <Flex flexDirection='column' width='100%' variant='scrollList' backgroundColor='background'>
            {recipe.url ? (
                <Flex
                    width='100%'
                    minHeight='150px'
                    style={{
                        background: `url(${recipe.url})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        boxShadow: 'inset 0px -24px 50px 0px rgba(0,0,0,0.8)',
                    }}
                >
                </Flex>
            ) : <></>}
            <Flex justifyContent='space-between'>
                <Heading m={2} variant='heading2'>
                    {recipe.name}
                </Heading>
                {hasMastered ? (
                    <Flex mr={3} mt='-1px'>
                        <FaMedal color='#E4B828' size={40} />
                    </Flex>
                ) : <></>}
            </Flex>
            <Flex m={2} flexDirection='column'>
                <Text mb={2} variant='body'>
                    {recipe.notes}
                </Text>
                <Divider />
                {hasMastered ? (
                    <Text my={2} variant='body'>
                        You have mastered this recipe, which means you don't need to pass any skill checks to make it.
                    </Text>
                ) : (
                    <Flex my={2} flexDirection='column'>
                        <Text variant='body'>
                            You are {+recipe.triesTillMastered - recipe.timesSucceeded} successful tries away from mastering this recipe.
                        </Text>
                        <Flex justifyContent='space-around' my={4}>
                            {Array.from(Array(+recipe.triesTillMastered).keys()).map(i => {
                                const passedTry = i < recipe.timesSucceeded;
                                return (
                                    <Flex key={i} style={{
                                        boxShadow: passedTry ? 'inset -5px -5px 10px 3px #004F00' : 'inset -5px -5px 10px 3px #202020',
                                        borderRadius: '999px',
                                        width: '40px',
                                        height: '40px',
                                        backgroundColor: passedTry ? '#007F00' : '#353535',
                                    }}>
                                    </Flex>
                                );
                            })}
                        </Flex>
                        <ProgressButton
                            scope='add-successful-try'
                            onClick={() => trackPromise(recipeBook.increaseSuccesfullTries(recipe), 'add-successful-try')}
                        >
                            Add successful try
                        </ProgressButton>
                    </Flex>
                )}
                <Divider />
                <Text my={2} variant='body'>
                    This recipe requires the following ingredients:
                </Text>
                {recipe.ingredients.sort((a, b) => a.type < b.type ? -1 : 1).map(i => {
                    const infoLine = `${i.name} - ${i.type === 'base' ? 'Base' : 'Spice/Herb'}`;
                    return (
                        <Tag key={infoLine} content={infoLine} />
                    );
                })}
                <Text mt={3} mb={2} variant='body'>
                    In order to successfully prepare this recipe, you must roll a <b>{recipe.dc}</b> or higher on the following skills:
                </Text>
                {Object.keys(recipe.check).filter(i => recipe.check[i as RollType]).map(i => (
                    <Tag key={i} content={_.capitalize(i)} />
                ))}
                <Text mt={3} mb={2} variant='body'>
                    You can currently make <b>{maxPortions}</b> portions of this recipe. How many do you want to make?
                </Text>
                <Flex justifyContent='center' alignItems='center'>
                    <MButton variant='icon' onClick={() => setPrepareCount(i => i <= 1 ? 1 : i - 1)}>
                        <FaMinus size={25} />
                    </MButton>
                    <Text variant='heading2' mx={3}>{prepareCount}</Text>
                    <MButton variant='icon' onClick={() => setPrepareCount(i => i >= maxPortions ? i : i + 1)}>
                        <FaPlus size={25} />
                    </MButton>
                </Flex>
                <ProgressButton scope='prepare-recipe' onClick={() => { }}>
                    Prepare {prepareCount} portion{prepareCount === 1 ? '' : 's'}
                </ProgressButton>
            </Flex>
        </Flex>
    )
}