import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { trackPromise } from 'react-promise-tracker';
import { Flex, Heading, Text } from 'rebass';
import { Input, MButton } from 'src/atoms';
import { Modal } from 'src/atoms/modal';
import { useIngredients } from 'src/services/database/ingredients';
import { useRecipeBook } from 'src/services/database/recipebook';
import { Ingredient, Recipe } from 'src/services/database/types';
import { useDebouncedState } from 'src/services/debounced-state';
import { RecipeCard } from './card';
import { CreateRecipeForm } from './forms/create';
import { RecipeOverview } from './overview';

export const RecipesPage: React.FC<{}> = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const methods = useForm<{ search: string }>({
        defaultValues: {
            search: ''
        }
    });
    const recipeBook = useRecipeBook();
    const ingredientManager = useIngredients();

    const [selected, setSelected] = useState<Recipe | undefined>(undefined);
    const [searchTerm, setSearchTerm] = useDebouncedState(methods.getValues().search, 200);

    useEffect(() => {
        if (!selected) return;
        setSelected(recipeBook.recipes.find(i => i.id === selected.id));
    }, [recipeBook.recipes]);

    const saveRecipe = async (recipe: Recipe) => {
        const ingredients = recipe.ingredients;
        const [newIngredients, existingIngredients] = _.partition(ingredients, i => !Number.isNaN(Number(i.id)));
        const savedNewIngredients = await ingredientManager.createNewIngredients(newIngredients as Ingredient[]);
        recipe.ingredients = [...existingIngredients, ...savedNewIngredients];
        recipe.timesSucceeded = 0;
        await recipeBook.registerNewRecipe(recipe);
    }

    return (
        <Flex flexDirection='column' width='100%' variant='pageContent'>
            <Modal isOpen={modalOpen} onBgClick={() => setModalOpen(false)}>
                {/* TODO: Move this shit to Modal */}
                <Flex
                    flexDirection='column'
                    variant='scrollList'
                    height='100%'
                    width='100%'
                    p={3}
                    maxHeight='calc(100vh - 180px)'
                    overflowY='scroll'
                    overflowX='hidden'
                    backgroundColor='background'
                >
                    <Heading variant='heading2' mb={2}>Add recipe</Heading>
                    <CreateRecipeForm onCreate={recipe => {
                        trackPromise(saveRecipe(recipe), 'save-recipe').then(() => setModalOpen(false));
                    }} />
                </Flex>
            </Modal>
            <Flex justifyContent='center' mx={2} my={3} flex={1} alignItems='center'>
                <Flex flex={1} >
                    <FormProvider {...methods}>
                        <form style={{ width: '100%' }} onSubmit={() => { }}>
                            <Input
                                width='100%'
                                name='search'
                                onChange={e => setSearchTerm(e.target.value || '')}
                            />
                        </form>
                    </FormProvider>
                </Flex>
                {/* <Flex>
                    <MButton variant='icon' ml={2}>
                        <FaSlidersH size={30} />
                    </MButton>
                </Flex> */}
            </Flex>
            <Modal isOpen={!!selected} onBgClick={() => setSelected(undefined)}>
                {selected ? <RecipeOverview recipe={selected} /> : <></>}
            </Modal>
            <Flex
                mx={2}
                py={0}
                flexDirection='column'
                variant='scrollList'
                height='100%'
                flexGrow={1}
                justifyContent='flex-start'
            >
                {recipeBook.recipes.filter(r => r.name.includes(searchTerm)).map(recipe => (
                    <RecipeCard key={recipe.id} recipe={recipe} onClick={() => setSelected(recipe)} />
                ))}
                {recipeBook.recipes.length === 0 ? (
                    <Flex justifyContent='center' alignItems='center' height='100%'>
                        <Heading variant='heading3'>
                            No recipes yet
                        </Heading>
                    </Flex>
                ) : <></>}
            </Flex>
            <Flex width='100%' alignSelf='flex-end' mt={2} mb={3}>
                <MButton mx={3} variant='primaryLarge' width='100%' onClick={() => setModalOpen(true)}>
                    <Text variant='body'>
                        Add Recipe
                    </Text>
                </MButton>
            </Flex>
        </Flex>
    );
}