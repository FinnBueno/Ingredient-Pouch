import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Flex, Text } from 'rebass';
import Autocomplete from '@mui/material/Autocomplete';
import { Checkbox, Input } from 'src/atoms';
import { Recipe } from 'src/services/database/types';
import { IngredientSelector } from 'src/molecules/ingredient-selector';

export type RecipeForm = Omit<Recipe, 'ingredients'> & {
    ingredientIds: number[];
}

export const CreateRecipeForm: React.FC<{ onCreate: (_: RecipeForm) => void }> = ({ onCreate }) => {
    const form = useForm<RecipeForm>();
    const { handleSubmit, reset } = form;
    return (
        <FormProvider {...form}>
            <form onSubmit={handleSubmit(v => {
                onCreate(v);
                reset();
            })}>
                <Input label='Name' name='name' required minLength={1} mb={1} />
                <Input label='Notes' name='Notes' type='textarea' mb={1} />
                <Flex>
                    <Input label='Tries to master' name='triesTillMastered' type='number' min={1} required defaultValue={3} mr={2} />
                    <Input label='DC' name='dc' type='number' min={1} required ml={2} />
                </Flex>
                <Flex mt={1} flexWrap='wrap'>
                    <Flex mt={1} flex={1} flexBasis='33%' justifyContent='center'>
                        <Checkbox label='Strength' name='strength' />
                    </Flex>
                    <Flex mt={1} flex={1} flexBasis='33%' justifyContent='center'>
                        <Checkbox label='Dexterity' name='dexterity' />
                    </Flex>
                    <Flex mt={1} flex={1} flexBasis='33%' justifyContent='center'>
                        <Checkbox label='Constitution' name='constitution' />
                    </Flex>
                    <Flex mt={1} flex={1} flexBasis='33%' justifyContent='center'>
                        <Checkbox label='Intelligence' name='intelligence' />
                    </Flex>
                    <Flex mt={1} flex={1} flexBasis='33%' justifyContent='center'>
                        <Checkbox label='Wisdom' name='wisdom' />
                    </Flex>
                    <Flex mt={1} flex={1} flexBasis='33%' justifyContent='center'>
                        <Checkbox label='Charisma' name='charisma' />
                    </Flex>
                </Flex>
                <Flex flexDirection='column'>
                    <Text variant='label'>Ingredients</Text>
                    <IngredientSelector onSelect={ingredient => {}} label='Ingredients' name='ingredients' />
                </Flex>
            </form>
        </FormProvider>
    )
}