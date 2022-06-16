import React, { useEffect, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FaSlidersH } from 'react-icons/fa';
import { Flex } from 'rebass';
import { Input, MButton } from 'src/atoms';
import { useRecipeBook } from 'src/services/database/recipebook';
import { Recipe } from 'src/services/database/types';
import { useDebouncedState } from 'src/services/debounced-state';
import { RecipeCard } from './card';

const testRecipe: Recipe = {
    id: '1',
    name: 'Midnight Noodles',
    url: '',
    image: undefined,
    triesTillMastered: 3,
    timesSucceeded: 1,
    dc: 16,
    rolls: [
        'Intelligence',
        'Dexterity',
    ],
    notes: 'I created this recipe all by myself, inspired by the great time I had with Atara.'
}

export const RecipesPage: React.FC<{}> = () => {
    const [searchHeight, setSearchHeight] = useState(0);
    const searchRef = useRef<any>(null);
    useEffect(() => {
        setSearchHeight(searchRef?.current?.clientHeight || 0);
    });
    const methods = useForm<{ search: string }>({
        defaultValues: {
            search: ''
        }
    });
    const recipeBook = useRecipeBook();

    const [_searchTerm, setSearchTerm] = useDebouncedState(methods.getValues().search);

    return (
        <Flex flexDirection='column' width='100%' variant='pageContent'>
            <Flex justifyContent='center' mx={2} my={3} ref={searchRef} flex={1} alignItems='center'>
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
                <Flex>
                    <MButton variant='icon' ml={2}>
                        <FaSlidersH size={30} />
                    </MButton>
                </Flex>
            </Flex>
            <Flex
                mx={2}
                py={0}
                flexDirection='column'
                variant='scrollList'
                maxHeight={`calc(100% - ${searchHeight})px`}
                height='100%'
                flexGrow={1}
                justifyContent='flex-start'
            >
                {recipeBook.recipes.map(recipe => (
                    <RecipeCard recipe={recipe} />
                ))}
            </Flex>
        </Flex>
    );
}